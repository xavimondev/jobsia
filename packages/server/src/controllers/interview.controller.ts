import { Request, Response } from 'express'
import { supabase } from '../lib/supabase'
import { openai } from '../lib/openai'
import { initialInterviewPrompt } from '../utils/prompt'

export const getInterviewDetailsById = async (req: Request, res: Response) => {
  const id = req.query.id as string

  const { data, error } = await supabase
    .from('interviews')
    .select(
      `id,
      interview_details(id,question, answer, score, feedback)
    `
    )
    .eq('id', id)

  if (error) {
    console.log(error)
    return res.status(500).json({ error: error.message })
  }

  return res.json({
    data: data[0]
  })
}

export const generateNextQuestion = async (req: Request, res: Response) => {
  const body = req.body
  try {
    const { candidate, position, company, currentQuestion, userAnswer, questions, resumeOffer } =
      body

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
    const json = JSON.parse(data)
    return res.json(json)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'Something went wrong with the OpenAI API'
    })
  }
}

export const endInterview = async (req: Request, res: Response) => {
  try {
    const body = req.body
    const { candidate, interviewDetails } = body
    const { id, photo, name, surname1, surname2, city } = candidate

    //Saving candidate data
    let candidateId = id
    // Checking if candidate exists
    const { count } = await supabase
      .from('candidates')
      .select('*', { count: 'exact', head: true })
      .eq('id', id)

    if (count === 0) {
      const { data } = await supabase
        .from('candidates')
        .insert({
          id,
          name,
          surname: `${surname1} ${surname2}`.trim(),
          photo,
          city
        })
        .select('id')

      candidateId = data![0].id
    }
    // Saving interview
    // Getting offerId from cookies
    const cookieStore = req.cookies
    const offerId = cookieStore['jobsia.offer-id']
    // jobsia.offer - id
    const { data } = await supabase
      .from('interviews')
      .insert({
        offerId,
        candidateId
      })
      .select('id')
    // Saving interview details
    // Getting interviewId from interviews table
    const interviewId = data![0].id
    const interviewDetailsData = interviewDetails.map((interviewMessage: any) => ({
      ...interviewMessage,
      interviewId
    }))

    await supabase.from('interview_details').insert(interviewDetailsData)

    return res.json({
      ok: true
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      ok: false
    })
  }
}
