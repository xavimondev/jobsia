import { NextResponse, NextRequest } from 'next/server'
import { generateToken } from './services/auth'

export async function middleware(request: NextRequest) {
  const url = new URL(request.url)
  const response = NextResponse.next()

  const offerId = url.searchParams.get('offerId') as string
  // Checking if there is a offerId in url or not.This offerId will be necessary during interview
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

  const clientId = process.env.INFOJOBS_CLIENT_ID as string
  const clientSecret = process.env.INFOJOBS_CLIENT_SECRET as string
  const infojobsUri = process.env.INFOJOBS_REDIRECT_URI as string
  // Checking if there is a refresh_token in cookies
  const refreshTokenExists = request.cookies.has('jobsia.refresh-token')
  console.log(`Hay un refresh_token: ${refreshTokenExists}`)
  if (refreshTokenExists) {
    const refresTokenValue = request.cookies.get('jobsia.refresh-token')?.value as string
    console.log(`Printing refresh_token: ${refresTokenValue}`)
    const tokens = await generateToken(clientId, clientSecret, true, refresTokenValue, infojobsUri)
    console.log(`Printing tokens: ${JSON.stringify(tokens)}`)

    if (tokens) {
      const { access_token, refresh_token, expires_in } = tokens
      // Saving new tokens in cookies
      response.cookies.set('jobsia.access-token', access_token, {
        expires: new Date(Date.now() + expires_in * 1000),
        httpOnly: true
      })
      response.cookies.set('jobsia.refresh-token', refresh_token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true
      })
    }

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
    const response = NextResponse.redirect(new URL('/onboarding', request.url))
    if (offerId) {
      response.cookies.set('jobsia.offer-id', offerId, {
        expires: new Date(Date.now() * 3600 * 1000) //1 hour
      })
    }
    return response
  }

  // Generating new access token
  const tokens = await generateToken(clientId, clientSecret, false, code, infojobsUri)
  if (tokens) {
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
  }

  return response
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/settings', '/interview/:path*']
}
