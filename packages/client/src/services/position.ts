import { supabase } from '../utils/supabase'

export const getOffersCompany = async () => {
  const { data, error } = await supabase.rpc('get_positions_company')
  if (error) {
    throw new Error('An error has ocurred while fetching data')
  }
  return data
}
