import { db } from '../lib/db'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

interface IntentAnalysis {
  intent: 'Informational' | 'Commercial' | 'Transactional'
  score: number
  reasoning: string
}

async function analyzeIntent(content: string): Promise<IntentAnalysis> {
  try {
    const prompt = `
Analyze the user intent of this news article content:

"${content.slice(0, 2000)}"

Please determine:
1. The primary user intent (Informational, Commercial, or Transactional)
2. A confidence score from 0-100
3. Brief reasoning for your assessment

Format your response as JSON:
{
  "intent": "Informational|Commercial|Transactional",
  "score": 0-100,
  "reasoning": "Your reasoning here"
}
`

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at analyzing user intent in content. Be concise and accurate.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 200,
      temperature: 0.3
    })

    const analysisText = response.choices[0].message.content
    const analysis = JSON.parse(analysisText || '{}')
    
    return {
      intent: analysis.intent || 'Informational',
      score: analysis.score || 50,
      reasoning: analysis.reasoning || 'Default analysis'
    }
  } catch (error) {
    console.error('Error analyzing intent:', error)
    return {
      intent: 'Informational',
      score: 50,
      reasoning: 'Error in analysis, defaulting to informational'
    }
  }
}

async function calculateScores(content: string): Promise<{
  viralityScore: number
  freshnessScore: number
}> {
  // Simple scoring algorithms
  const viralityScore = Math.min(100, content.length * 0.1 + Math.random() * 20)
  const freshnessScore = Math.floor(Math.random() * 100)
  
  return {
    viralityScore: Math.floor(viralityScore),
    freshnessScore
  }
}

export async function analyzeArticles() {
  console.log('Starting intent analysis pipeline...')
  
  // Find articles that need analysis
  const articles = await db.article.findMany({
    where: {
      status: 'SCRAPED',
      intentScore: null
    },
    take: 10 // Process 10 at a time to avoid rate limits
  })
  
  console.log(`Found ${articles.length} articles to analyze`)
  
  for (const article of articles) {
    console.log(`Analyzing intent for: ${article.title}`)
    
    // Analyze intent
    const intentAnalysis = await analyzeIntent(article.content || '')
    
    // Calculate additional scores
    const scores = await calculateScores(article.content || '')
    
    // Update article
    await db.article.update({
      where: { id: article.id },
      data: {
        status: 'ANALYZED',
        intentScore: intentAnalysis.score,
        viralityScore: scores.viralityScore,
        freshnessScore: scores.freshnessScore
      }
    })
    
    console.log(`Completed analysis for: ${article.title} (${intentAnalysis.intent} - ${intentAnalysis.score})`)
  }
  
  console.log('Intent analysis completed!')
}

if (require.main === module) {
  analyzeArticles().catch(console.error)
}