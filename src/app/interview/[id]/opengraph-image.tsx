import { ImageResponse } from 'next/server'

export const contentType = 'image/png'

type Context = {
  params: { id: string }
}

export default async function og({ params }: Context) {
  const offerId = params.id

  try {
    const response = await fetch(`https://api.infojobs.net/api/7/offer/${offerId}`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${process.env.INFOJOBS_TOKEN}`
      }
    })

    const data = await response.json()

    if (!data) {
      return new ImageResponse(
        (
          <div
            style={{
              display: 'flex',
              backgroundColor: '#15131d',
              height: '100%'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'auto',
                maxWidth: '70rem',
                width: '100%'
              }}
            >
              <span
                style={{
                  fontSize: 130
                }}
              >
                🫤
              </span>
              <p
                style={{
                  fontSize: 28,
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center'
                }}
              >
                El usuario que estas intentando buscar no está registrado.
              </p>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
          emoji: 'fluentFlat'
        }
      )
    }
    const {
      title,
      profile: { name: companyName, logoUrl }
    } = data
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            backgroundColor: '#15131d',
            width: '100%',
            height: '100%',
            position: 'relative'
          }}
        >
          <div
            style={{
              display: 'flex',
              backgroundImage: 'linear-gradient(135deg, #ffffff14 -1px, #15131d 7%)',
              backgroundSize: '13px 13px',
              width: '100%',
              height: '100%',
              position: 'absolute'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'auto',
                maxWidth: '60rem',
                width: '100%'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize: '75px',
                  color: 'white'
                }}
              >
                {' '}
                <span>Entrevista de trabajo para el puesto </span>
                <span
                  style={{
                    fontWeight: 'bold',
                    backgroundImage: 'linear-gradient(to right, #ff8b42, #8b36bb)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  {title}
                </span>
                <div
                  style={{ display: 'flex', marginTop: '20px', gap: '10px', alignItems: 'center' }}
                >
                  <span
                    style={{
                      fontSize: '40px',
                      fontWeight: 'bold',
                      color: 'white'
                    }}
                  >
                    en {companyName}
                  </span>
                  <img
                    alt={companyName}
                    width='60'
                    height='60'
                    src={logoUrl}
                    style={{
                      borderRadius: '9999999px'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630
      }
    )
  } catch (error) {
    console.error(error)
    return new Response(`Failed to generate the image`, {
      status: 500
    })
  }
}
