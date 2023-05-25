import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'
import { initialInterviewPrompt } from '@/utils/prompt'

const openIAKey = process.env.OPEN_IA_KEY as string

const configuration = new Configuration({
  apiKey: openIAKey
})
const openai = new OpenAIApi(configuration)

export async function POST(request: Request) {
  const body = await request.json()
  const { candidate, position, company, currentQuestion, userAnswer, questions } = body
  // if it gets to the end of the interview, just say bye
  // otherwise, continue with the interview
  const content = initialInterviewPrompt(
    candidate,
    company,
    position,
    currentQuestion,
    userAnswer,
    questions
  )

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content
      }
    ],
    temperature: 0
  })
  const data = response.data.choices[0].message?.content ?? ''
  try {
    // TODO: Change this to a better solution
    if (!data.includes('{')) return NextResponse.json({ message: data, isEndInterview: true })

    const json = JSON.parse(data)
    return NextResponse.json(json)
  } catch {
    return new Response('Something was wrong with the OpenIA API', { status: 500 })
  }
}
