import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { Interview } from '../../../types'
import { supabase } from '../../../utils/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
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
    const cookieStore = cookies()
    const offerId = cookieStore.get('jobsia.offer-id')?.value
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
    const interviewDetailsData = interviewDetails.map((interviewMessage: Interview) => ({
      ...interviewMessage,
      interviewId
    }))

    await supabase.from('interview_details').insert(interviewDetailsData)

    return NextResponse.json({
      ok: true
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        ok: false
      },
      {
        status: 500
      }
    )
  }
}
