import { NextResponse, NextRequest } from 'next/server'
import { INFOJOBS_AUTH } from '@/utils/constants'

export async function middleware(request: NextRequest) {
  const access_token = request.cookies.has('jobsia.access-token')
  // console.log('This is token', request.cookies.get('jobsia.access-token')?.value)
  if (access_token) return NextResponse.next()

  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  if (!code) return NextResponse.redirect(new URL('/onboarding', request.url))

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
  //console.log(tokens)
  const response = NextResponse.next()
  response.cookies.set('jobsia.access-token', tokens.access_token, {
    expires: new Date(Date.now() + tokens.expires_in * 1000),
    httpOnly: true
  })
  response.cookies.set('jobsia.refresh-token', tokens.refresh_token, {
    expires: new Date(Date.now() + tokens.expires_in * 1000),
    httpOnly: true
  })
  //console.log('This is the code', code)
  return response
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/settings'
}
