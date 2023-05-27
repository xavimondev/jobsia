import { NextResponse } from 'next/server'
import { supabase } from '@/utils/supabase'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const offerid = url.searchParams.get('offerid')

  const { data, error } = await supabase.rpc('get_total_score_interview', {
    offerid
  })

  if (error) {
    console.error(error)
    return NextResponse.json({
      error: error.message
    })
  }
  //console.log(data)
  return NextResponse.json({
    indicators: [],
    interviews: data
  })
}
