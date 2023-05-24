'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { InitialPermissions } from '@/types'
import { CheckCircleIc, ErrorCircleIc } from '@/components/icons'
import { CheckingSettings } from '@/components/illustrations'

const initialConfig = {
  isMicrophoneEnabled: false,
  isAssistantEnabled: false
}
//{ searchParams: { code } }: any
export default function Settings() {
  const params = useSearchParams()
  const offerId = params.get('offer')
  const [configChecking, setConfigChecking] = useState<InitialPermissions>(initialConfig)
  const [isMicrophoneLoading, setIsMicrophoneLoading] = useState<boolean>(true)
  const [isAssistantLoading, setIsAssistantLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsMicrophoneLoading(true)
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(() => {
        setConfigChecking((prevConf) => ({
          ...prevConf,
          isMicrophoneEnabled: true
        }))
      })
      .catch(() => {
        setConfigChecking((prevConf) => ({
          ...prevConf,
          isMicrophoneEnabled: false
        }))
      })
      .finally(() => {
        setIsMicrophoneLoading(false)
        // running assistant indicator
        setIsAssistantLoading(true)

        setTimeout(() => {
          setIsAssistantLoading(false)
          setConfigChecking((prevConf) => ({
            ...prevConf,
            isAssistantEnabled: true
          }))
        }, 2000)
      })
  }, [])

  return (
    <div className='p-6 h-screen grid place-items-center'>
      <section className='block lg:hidden mr-6'>
        <h1>No puedes acceder a este modulo desde el móvil</h1>
      </section>
      <section className='hidden lg:flex flex-row items-center mx-auto max-w-7xl'>
        <div className='full p-2 mr-24 w-[700px]'>
          <h2 className='font-bold text-3xl text-blue-300 mb-10'>
            Configurando el espacio de trabajo...
          </h2>
          <ul className='mb-16'>
            <li className={`flex items-center gap-3 mb-4 text-green-400`}>
              <CheckCircleIc className='w-6 h-6 ' />
              <h3 className='text-lg'>Autenticación</h3>
            </li>
            <li
              className={`flex items-center gap-3 mb-4 ${
                isMicrophoneLoading
                  ? 'text-gray-500 animate-twPulse animate-infinite'
                  : `${
                      !isMicrophoneLoading && !configChecking.isMicrophoneEnabled
                        ? 'text-red-400'
                        : 'text-green-400'
                    }`
              }`}
            >
              {!isMicrophoneLoading && !configChecking.isMicrophoneEnabled ? (
                <ErrorCircleIc className='w-6 h-6' />
              ) : (
                <CheckCircleIc className='w-6 h-6' />
              )}

              <h3 className='text-lg'>Acceso al micrófono</h3>
            </li>
            <li
              className={`flex items-center gap-3 mb-4 ${
                isAssistantLoading
                  ? 'text-gray-500 animate-twPulse animate-infinite'
                  : `${
                      !isAssistantLoading && !configChecking.isAssistantEnabled
                        ? 'text-gray-500'
                        : 'text-green-400'
                    }`
              }`}
            >
              <CheckCircleIc className='w-6 h-6 ' />
              <h3 className='text-lg'>Iniciando el asistente</h3>
            </li>
          </ul>
          {!configChecking.isMicrophoneEnabled &&
            !isMicrophoneLoading &&
            configChecking.isAssistantEnabled && (
              <div className='p-3 border rounded-lg text-red-400 border-red-300 animate-fadeInUp animate-duration-500'>
                <div className='flex items-center justify-between'>
                  <h4>
                    No tienes el micrófono habilitado 😢. Actívalo para acceder a las entrevistas.
                  </h4>
                </div>
              </div>
            )}
          {configChecking.isAssistantEnabled && configChecking.isMicrophoneEnabled && (
            <Link
              href={`/interview/${offerId}`}
              className='text-green-400 hover:text-green-200 text-base bg-green-700/[0.5] hover:bg-green-700 py-2 px-4 rounded-md'
            >
              Empezar
            </Link>
          )}
        </div>
        <div className='full'>
          <CheckingSettings width={550} height={550} />
        </div>
      </section>
    </div>
  )
}
