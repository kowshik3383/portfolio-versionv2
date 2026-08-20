import { db } from '../lib/db'
import Parser from 'rss-parser'
import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'
import crypto from 'crypto'

const parser = new Parser()

interface NewsSource {
  name: string
  url: string
  rssUrl: string
}

const NEWS_SOURCES: NewsSource[] = [
  {
    name: 'TechCrunch',
    url: 'https://techcrunch.com',
    rssUrl: 'https://techcrunch.com/feed/'
  },
  {
    name: 'Hacker News',
    url: 'https://news.ycombinator.com',
    rssUrl: 'https://hnrss.org/frontpage'
  },
  {
    name: 'Product Hunt',
    url: 'https://www.producthunt.com',
    rssUrl: 'https://www.producthunt.com/feed/rss'
  }
]

async function extractArticleContent(url: string): Promise<string> {
  try {
    const response = await fetch(url)
    const html = await response.text()
    const dom = new JSDOM(html)
    const document = dom.window.document
    
    // Remove unwanted elements
    const unwantedSelectors = [
      'script', 'style', 'nav', 'header', 'footer', 
      '.sidebar', '.ad', '.comment', '.share'
    ]
    
    unwantedSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach((el: Element) => el.remove())
    })
    
    // Extract main content
    const contentSelectors = [
      'article', '.post-content', '.entry-content', 
      '.content', '.main-content', 'main'
    ]
    
    let content = ''
    
    for (const selector of contentSelectors) {
      const element = document.querySelector(selector)
      if (element) {
        content = element.textContent || ''
        break
      }
    }
    
    // Fallback to body content
    if (!content) {
      content = document.body.textContent || ''
    }
    
    // Clean up content
    return content
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 5000) // Limit content length
  } catch (error) {
    console.error(`Error extracting content from ${url}:`, error)
    return ''
  }
}

async function scrapeNewsSource(source: NewsSource) {
  console.log(`Scraping ${source.name}...`)
  
  try {
    const feed = await parser.parseURL(source.rssUrl)
    
    for (const item of feed.items) {
      if (!item.link || !item.title) continue
      
      // Generate content hash for deduplication
      const hash = crypto
        .createHash('md5')
        .update(item.link)
        .digest('hex')
      
      // Check if article already exists
      const existingArticle = await db.article.findUnique({
        where: { hash }
      })
      
      if (existingArticle) {
        console.log(`Skipping duplicate article: ${item.title}`)
        continue
      }
      
      // Extract full content
      const fullContent = await extractArticleContent(item.link)
      
      // Create article
      await db.article.create({
        data: {
          title: item.title,
          url: item.link,
          content: fullContent || item.content || item.summary || '',
          source: source.name,
          publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
          hash,
          status: 'SCRAPED'
        }
      })
      
      console.log(`Saved article: ${item.title}`)
    }
  } catch (error) {
    console.error(`Error scraping ${source.name}:`, error)
  }
}

export async function scrapeNews() {
  console.log('Starting news scraping pipeline...')
  
  for (const source of NEWS_SOURCES) {
    await scrapeNewsSource(source)
  }
  
  console.log('News scraping completed!')
}

if (require.main === module) {
  scrapeNews().catch(console.error)
}