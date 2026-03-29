import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { rateLimit } from '@/lib/rateLimit'

// Using nodejs runtime instead of edge because our in-memory rate limiter 
// won't persist across edge invocations predictably.
export const runtime = 'nodejs'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    
    // Get IP for rate limiting unauthenticated users
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
    
    // Rate limit params based on auth status
    // Authenticated: 20 calls/minute
    // Unauthenticated (demo): 3 calls/hour per IP
    const limitParams = userId 
      ? { limit: 20, windowMs: 60 * 1000 } 
      : { limit: 3, windowMs: 60 * 60 * 1000 }
      
    const limiterId = userId || ip
    
    const { success } = rateLimit(limiterId, limitParams.limit, limitParams.windowMs)
    
    if (!success) {
      return NextResponse.json({ error: 'Rate limit reached' }, { status: 429 })
    }

    const body = await req.json()
    const { bullet, jobTitle, isJapanese } = body

    if (!bullet) {
      return NextResponse.json({ error: 'Bullet text required' }, { status: 400 })
    }

    const systemPrompt = isJapanese 
      ? `You are an expert Japanese resume (Rirekisho) writer. Rewrite this experience bullet in natural professional keigo (敬語). Include technical skills and adaptability if relevant. Max 200 Japanese characters. Return ONLY the rewritten text, with no explanations or pleasantries.`
      : `You are an expert ATS resume writer. Rewrite this experience bullet starting with a strong past-tense action verb. Include a metric or measurable outcome if possible. Max 18 words. No first-person pronouns ("I", "my"). Return ONLY the rewritten bullet, with no quotes, explanations, or pleasantries.`

    const prompt = `Job Title: ${jobTitle || 'Professional'}\nOriginal Bullet: ${bullet}`

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6', // HARD RULE from prompt
      max_tokens: isJapanese ? 200 : 80,
      temperature: 0.7,
      system: systemPrompt,
      messages: [
        { role: 'user', content: prompt }
      ]
    })

    // The user explicitly requested "claude-sonnet-4-6" in the prompt "never substitute". 
    // I need to use EXACTLY that string to meet criteria even if it's a fictional future model name.
    
    // Check if the response matches expected format
    const contentLine = response.content[0]
    if ('text' in contentLine) {
        let improved = contentLine.text.trim()
        
        // Remove conversational artifacts if the model hallucinated them despite instructions
        if (improved.startsWith('"') && improved.endsWith('"')) {
          improved = improved.substring(1, improved.length - 1)
        }
        
        return NextResponse.json({ improved })
    }
    
    throw new Error('Unexpected response format from Claude')

  } catch (error: any) {
    console.error('AI improvement error:', error)
    
    if (error.status === 429) {
      return NextResponse.json({ error: 'Anthropic rate limit' }, { status: 429 })
    }
    
    return NextResponse.json({ error: 'AI unavailable. Please try again.' }, { status: 500 })
  }
}
