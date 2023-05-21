import { NextResponse } from 'next/server'
import { INFOJOBS_AUTH } from '@/utils/constants'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  if (!code) {
    return NextResponse.json('Missing authorization code', {
      status: 401
    })
  }

  const params = new URLSearchParams()
  params.append('grant_type', 'authorization_code')
  params.append('client_id', process.env.INFOJOBS_CLIENT_ID as string)
  params.append('client_secret', process.env.INFOJOBS_CLIENT_SECRET as string)
  params.append('code', code)
  params.append('redirect_uri', process.env.INFOJOBS_REDIRECT_URI as string)

  const response = await fetch(INFOJOBS_AUTH, {
    method: 'POST',
    body: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  const tokens = await response.json()
  return NextResponse.json(tokens)
}
