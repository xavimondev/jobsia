import { Request, Response } from 'express'
import { supabase } from '../lib/supabase'
import { getIndicators } from '../utils/getIndicators'

export const getTotalScoreInterview = async (req: Request, res: Response) => {
  const offerid = req.query.offerid

  try {
    const { data, error } = await supabase.rpc('get_total_score_interview', {
      offerid
    })

    if (error) {
      console.error(error)
      return res.json({
        error: error.message
      })
    }
    const indicators = getIndicators(data)

    return res.json({
      indicators,
      interviews: data
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: 'An error has occurred'
    })
  }
}
