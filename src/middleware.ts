import { NextResponse, NextRequest } from 'next/server'
import { INFOJOBS_AUTH } from '@/utils/constants'

export async function middleware(request: NextRequest) {
  const access_token = request.cookies.has('jobsia.access-token')
  //console.log(request.cookies.get('jobsia.access-token')?.value)
  // This means I already have access_token and I just need to continue
  if (access_token) return NextResponse.next()

  // This means I'm gonna generate access_token for the first time
  const url = new URL(request.url)
  const code = url.searchParams.get('code') as string

  if (!code) {
    // Redirect to onboarding page to let user get access_token
    return NextResponse.redirect(new URL('/onboarding', request.url), {
      status: 401
    })
  }

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

  const response = NextResponse.next()
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
  matcher: '/settings'
}
