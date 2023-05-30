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
  const { candidate, position, company, currentQuestion, userAnswer, questions, resumeOffer } = body

  const content = initialInterviewPrompt(
    candidate,
    company,
    position,
    currentQuestion,
    userAnswer,
    questions,
    resumeOffer
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
    const json = JSON.parse(data)
    return NextResponse.json(json)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        error: 'Something went wrong with the OpenAI API'
      },
      {
        status: 500
      }
    )
  }
}
