import { INFOJOBS_AUTH } from '@/utils/constants'

export const generateToken = async (
  clientId: string,
  clientSecret: string,
  hasRefreshToken: boolean,
  auth: string,
  redirectUri: string
) => {
  try {
    const params = new URLSearchParams()
    if (hasRefreshToken) {
      params.append('grant_type', 'refresh_token')
      params.append('refresh_token', auth)
    } else {
      params.append('grant_type', 'authorization_code')
      params.append('code', auth)
    }
    params.append('client_id', clientId)
    params.append('client_secret', clientSecret)
    params.append('redirect_uri', redirectUri)

    const data = await fetch(INFOJOBS_AUTH, {
      method: 'POST',
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    const tokens = await data.json()
    return tokens
  } catch (error) {
    console.error(error)
    return null
  }
}
