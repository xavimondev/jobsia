import { Request, Response } from 'express'
import { supabase } from '../lib/supabase'
import { openai } from '../lib/openai'
import { API_INFOJOBS } from '../constants'

export const getListJobs = async (req: Request, res: Response) => {
  const query = req.query.q as string

  try {
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
      return res.json({
        error: 'Error while fetching data'
      })
    }

    const offers = data.map((offer: any) => {
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
        minRequirements: content,
        salaryDesc,
        experienceMin: experiencemin
      }
    })
    return res.json({
      data: offers
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'An error has ocurred while fetching data'
    })
  }
}

export const getJobDetailsById = async (req: Request, res: Response) => {
  const query = req.query.id

  try {
    const data = await fetch(`${API_INFOJOBS}/${query}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${process.env.INFOJOBS_TOKEN}`
      }
    })
    const {
      applications,
      contractType,
      experienceMin,
      id: jobId,
      minRequirements,
      maxPay,
      minPay,
      skillsList,
      country,
      province,
      studiesMin,
      title,
      profile
    } = await data.json()

    const location = {
      country: country.value,
      province: province.value
    }

    const company = {
      id: profile.id,
      name: profile.name,
      logo: profile.logoUrl
    }

    const salaryDesc =
      minPay == null || maxPay == null
        ? 'No especificado'
        : `${minPay.amountValue} - ${maxPay.amountValue}`

    const response = {
      id: jobId,
      title,
      company,
      minRequirements,
      location,
      contractType: contractType.value,
      experienceMin: experienceMin.value,
      applications: applications,
      salaryDesc,
      skillsList,
      studiesMin: studiesMin.value
    }
    return res.json(response)
  } catch (error) {
    console.error(error)
    return res.json({
      error: 'Error while fetching data'
    })
  }
}
