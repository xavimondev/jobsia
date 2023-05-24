import { NextResponse, NextRequest } from 'next/server'
import { INFOJOBS_AUTH } from '@/utils/constants'

export async function middleware(request: NextRequest) {
  const url = new URL(request.url)
  const response = NextResponse.next()

  // TODO: Change this logic for something better
  // Checking if there is a offerId in url or not.This offerId will be necessary during interview
  const offerId = url.searchParams.get('offerId') as string
  console.log(`This is offerId: ${offerId}`)

  const access_token = request.cookies.has('jobsia.access-token')
  // This means I already have access_token and I just need to continue
  if (access_token) {
    if (offerId) {
      response.cookies.set('jobsia.offer-id', offerId, {
        expires: new Date(Date.now() * 3600 * 1000) //1 hour
      })
    }
    return response
  }

  // Checking if there is a refresh_token in cookies
  const refresh_token = request.cookies.has('jobsia.refresh-token')
  if (refresh_token) {
    // This means access_token is expired, so I need to generate new one
    const params = new URLSearchParams()
    params.append('grant_type', 'refresh_token')
    params.append('client_id', process.env.INFOJOBS_CLIENT_ID as string)
    params.append('client_secret', process.env.INFOJOBS_CLIENT_SECRET as string)
    params.append('refresh_token', request.cookies.get('jobsia.refresh-token')?.value as string)
    params.append('redirect_uri', process.env.INFOJOBS_REDIRECT_URI as string)

    const data = await fetch(INFOJOBS_AUTH, {
      method: 'POST',
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    const tokens = await data.json()
    // Saving new tokens in cookies
    response.cookies.set('jobsia.access-token', tokens.access_token, {
      expires: new Date(Date.now() + tokens.expires_in * 1000),
      httpOnly: true
    })

    response.cookies.set('jobsia.refresh-token', tokens.refresh_token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      httpOnly: true
    })

    if (offerId) {
      response.cookies.set('jobsia.offer-id', offerId, {
        expires: new Date(Date.now() * 3600 * 1000) //1 hour
      })
    }
    return response
  }

  // This means I'm gonna generate access_token for the first time
  const code = url.searchParams.get('code') as string
  if (!code) {
    // Redirect to onboarding page to let user get access_token
    //, {status: 401}
    const response = NextResponse.redirect(new URL('/onboarding', request.url))
    if (offerId) {
      response.cookies.set('jobsia.offer-id', offerId, {
        expires: new Date(Date.now() * 3600 * 1000) //1 hour
      })
    }
    return response
  }

  // Generating new access token
  const params = new URLSearchParams()
  params.append('grant_type', 'authorization_code')
  params.append('client_id', process.env.INFOJOBS_CLIENT_ID as string)
  params.append('client_secret', process.env.INFOJOBS_CLIENT_SECRET as string)
  params.append('code', code)
  params.append('redirect_uri', process.env.INFOJOBS_REDIRECT_URI as string)

  const data = await fetch(INFOJOBS_AUTH, {
    method: 'POST',
    body: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  const tokens = await data.json()

  //const response = NextResponse.next()
  // Saving tokens in cookies
  // TODO: Change this for something more reliable
  response.cookies.set('jobsia.access-token', tokens.access_token, {
    expires: new Date(Date.now() + tokens.expires_in * 1000),
    httpOnly: true
  })

  response.cookies.set('jobsia.refresh-token', tokens.refresh_token, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true
  })
  return response
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/settings', '/interview/:path']
}
