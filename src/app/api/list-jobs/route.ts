import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'
import { createClient } from '@supabase/supabase-js'
import { JobOffer } from '@/types'

const openIAKey = process.env.OPEN_IA_KEY as string
const supabaseUrl = process.env.SUPABASE_URL as string
const supabaseKey = process.env.SUPABASE_KEY as string

const configuration = new Configuration({
  apiKey: openIAKey
})
const openai = new OpenAIApi(configuration)
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request: Request) {
  const url = new URL(request.url)
  const query = url.searchParams.get('q') as string
  // Generate a one-time embedding for the query itself
  const embeddingResponse = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input: query
  })

  const [{ embedding }] = embeddingResponse.data.data
  const { data, error } = await supabase.rpc('match_offers', {
    match_count: 10,
    match_threshold: 0.88,
    query_embedding: embedding
  })

  if (error) {
    console.error(error)
    return NextResponse.json({
      error: 'Error while fetching data'
    })
    // throw new Error('Error while fetching data')
  }
  console.log(data)

  const offers: JobOffer[] = data.map((offer: any) => {
    const {
      infojobsid,
      companyname,
      content,
      title,
      country,
      province,
      minpay,
      maxpay,
      experiencemin
    } = offer
    const salaryDesc =
      minpay === '' || maxpay === '' ? 'Salario no especificado' : `${minpay} a ${maxpay}`
    return {
      id: infojobsid,
      company: {
        name: companyname
      },
      title: title,
      location: {
        country,
        province
      },
      teleworking: 'Hibrido',
      minRequirements: content,
      salaryDesc,
      experienceMin: experiencemin
    }
  })
  return NextResponse.json({
    data: offers
  })
}
