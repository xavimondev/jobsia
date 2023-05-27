import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL as string
const supabaseKey = process.env.SUPABASE_KEY as string

const supabase = createClient(supabaseUrl, supabaseKey)

export const getOffersCompany = async () => {
  const { data, error } = await supabase.rpc('get_positions_company')
  if (error) {
    throw new Error('An error has ocurred while fetching data')
  }
  return data
}
