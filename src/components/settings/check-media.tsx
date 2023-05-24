'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { InitialPermissions } from '@/types'
import { CheckCircleIc, ErrorCircleIc } from '@/components/icons'
import { AlertMedia } from './alert-media'

const initialConfig = {
  isMicrophoneEnabled: false,
  isAssistantEnabled: false
}

type CheckMediaProps = {
  offerId: string
}

export function CheckMedia({ offerId }: CheckMediaProps) {
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
    <>
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
          <AlertMedia message='No tienes el micrófono habilitado 😢. Actívalo para acceder a las entrevistas.' />
        )}
      {configChecking.isAssistantEnabled && configChecking.isMicrophoneEnabled && (
        <Link
          href={`/interview/${offerId}`}
          className='text-green-400 hover:text-green-200 text-base bg-green-700/[0.5] hover:bg-green-700 py-2 px-4 rounded-md'
        >
          Empezar
        </Link>
      )}
    </>
  )
}
