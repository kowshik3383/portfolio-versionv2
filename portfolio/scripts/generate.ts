import { db } from '../lib/db'
import { OpenAI } from 'openai'
import slugify from 'slugify'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

interface KeywordExtraction {
  primary: string
  secondary: string[]
  longtail: string[]
}

async function extractKeywords(content: string, title: string): Promise<KeywordExtraction> {
  try {
    const prompt = `
Extract SEO keywords from this article:

Title: "${title}"
Content: "${content.slice(0, 3000)}"

Please identify:
1. One primary keyword (most important)
2. 3-5 secondary keywords
3. 5-8 longtail keywords

Format as JSON:
{
  "primary": "primary keyword",
  "secondary": ["keyword1", "keyword2", ...],
  "longtail": ["longtail keyword 1", "longtail keyword 2", ...]
}
`

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an SEO expert. Extract relevant keywords for blog content.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 300,
      temperature: 0.3
    })

    const keywordsText = response.choices[0].message.content
    return JSON.parse(keywordsText || '{}')
  } catch (error) {
    console.error('Error extracting keywords:', error)
    return {
      primary: 'technology',
      secondary: ['news', 'updates', 'trends'],
      longtail: ['latest technology news', 'tech industry updates']
    }
  }
}

async function generateBlogContent(article: any): Promise<{
  title: string
  content: string
  metaDesc: string
  excerpt: string
  tags: string[]
}> {
  try {
    const prompt = `
Convert this news article into an SEO-optimized blog post:

Article Title: "${article.title}"
Article Content: "${article.content.slice(0, 4000)}"

Please create:
1. An engaging blog post title (50-60 characters)
2. A comprehensive blog post (800-1500 words) with proper H2/H3 structure
3. A meta description (150-160 characters)
4. A 2-3 sentence excerpt
5. 3-5 relevant tags

The blog post should be:
- Informative and engaging
- SEO-optimized with natural keyword integration
- Well-structured with headings
- Include an introduction, body, and conclusion
- Add value beyond the original article

Format as JSON:
{
  "title": "blog title",
  "content": "blog content with HTML formatting",
  "metaDesc": "meta description",
  "excerpt": "excerpt text",
  "tags": ["tag1", "tag2", ...]
}
`

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a professional content writer and SEO expert. Create high-quality blog content.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7
    })

    const contentText = response.choices[0].message.content
    return JSON.parse(contentText || '{}')
  } catch (error) {
    console.error('Error generating content:', error)
    return {
      title: article.title,
      content: article.content,
      metaDesc: 'Generated content',
      excerpt: 'Generated excerpt',
      tags: ['news', 'technology']
    }
  }
}

async function saveKeywords(keywords: KeywordExtraction): Promise<string[]> {
  const keywordIds: string[] = []
  
  // Save primary keyword
  const primaryKeyword = await db.keyword.upsert({
    where: { text: keywords.primary },
    update: {},
    create: {
      text: keywords.primary,
      type: 'PRIMARY'
    }
  })
  keywordIds.push(primaryKeyword.id)
  
  // Save secondary keywords
  for (const keyword of keywords.secondary) {
    const kw = await db.keyword.upsert({
      where: { text: keyword },
      update: {},
      create: {
        text: keyword,
        type: 'SECONDARY'
      }
    })
    keywordIds.push(kw.id)
  }
  
  // Save longtail keywords
  for (const keyword of keywords.longtail) {
    const kw = await db.keyword.upsert({
      where: { text: keyword },
      update: {},
      create: {
        text: keyword,
        type: 'LONGTAIL'
      }
    })
    keywordIds.push(kw.id)
  }
  
  return keywordIds
}

async function saveTags(tags: string[]): Promise<string[]> {
  const tagIds: string[] = []
  
  for (const tagName of tags) {
    const tag = await db.blogTag.upsert({
      where: { name: tagName },
      update: {},
      create: {
        name: tagName,
        slug: slugify(tagName, { lower: true })
      }
    })
    tagIds.push(tag.id)
  }
  
  return tagIds
}

export async function generateBlogPosts() {
  console.log('Starting content generation pipeline...')
  
  // Find analyzed articles that haven't been processed
  const articles = await db.article.findMany({
    where: {
      status: 'ANALYZED',
      blogGenerated: false,
      intentScore: {
        gte: 60 // Only process articles with good intent scores
      }
    },
    take: 5 // Process 5 at a time
  })
  
  console.log(`Found ${articles.length} articles to generate content for`)
  
  for (const article of articles) {
    console.log(`Generating content for: ${article.title}`)
    
    try {
      // Extract keywords
      const keywords = await extractKeywords(article.content || '', article.title)
      
      // Generate blog content
      const blogContent = await generateBlogContent(article)
      
      // Create slug
      const slug = slugify(blogContent.title, { lower: true })
      
      // Save keywords and get IDs
      const keywordIds = await saveKeywords(keywords)
      
      // Save tags and get IDs
      const tagIds = await saveTags(blogContent.tags)
      
      // Create blog post
      const blogPost = await db.blogPost.create({
        data: {
          title: blogContent.title,
          slug: slug,
          content: blogContent.content,
          metaDesc: blogContent.metaDesc,
          excerpt: blogContent.excerpt,
          articleId: article.id,
          status: 'DRAFT'
        }
      })
      
      // Link keywords to blog post
      await Promise.all(
        keywordIds.map(keywordId =>
          db.blogPostKeyword.create({
            data: {
              blogPostId: blogPost.id,
              keywordId: keywordId
            }
          })
        )
      )
      
      // Link tags to blog post
      await Promise.all(
        tagIds.map(tagId =>
          db.blogPostTag.create({
            data: {
              blogPostId: blogPost.id,
              tagId: tagId
            }
          })
        )
      )
      
      // Update article status
      await db.article.update({
        where: { id: article.id },
        data: {
          blogGenerated: true
        }
      })
      
      console.log(`Generated blog post: ${blogContent.title}`)
    } catch (error) {
      console.error(`Error generating content for ${article.title}:`, error)
    }
  }
  
  console.log('Content generation completed!')
}

if (require.main === module) {
  generateBlogPosts().catch(console.error)
}