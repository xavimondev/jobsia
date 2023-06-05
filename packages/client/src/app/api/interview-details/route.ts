import { supabase } from '../../../utils/supabase'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const interviewId = url.searchParams.get('id')

  const { data, error } = await supabase
    .from('interviews')
    .select(
      `id,
      interview_details(id,question, answer, score, feedback)
    `
    )
    .eq('id', interviewId)

  if (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    data: data[0]
  })
}
