'use client'
import 'regenerator-runtime/runtime'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSpeechRecognition } from 'react-speech-recognition'
import { InitialPermissions } from '../../types'
import { CheckCircleIc, ErrorCircleIc } from '../icons'
import { AlertMedia } from './alert-media'

const initialConfig = {
  isMicrophoneEnabled: false
}

type CheckMediaProps = {
  offerId: string
}

export function CheckMedia({ offerId }: CheckMediaProps) {
  const [configChecking, setConfigChecking] = useState<InitialPermissions>(initialConfig)
  const [isMicrophoneLoading, setIsMicrophoneLoading] = useState<boolean>(true)
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState<boolean | null>(null)
  const { browserSupportsSpeechRecognition } = useSpeechRecognition()
  const showAlertMedia =
    (!configChecking.isMicrophoneEnabled && !isMicrophoneLoading) ||
    (speechRecognitionSupported !== null && !speechRecognitionSupported)

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
      })
  }, [])

  useEffect(() => {
    setSpeechRecognitionSupported(browserSupportsSpeechRecognition)
  }, [browserSupportsSpeechRecognition])

  return (
    <>
      <ul className='mb-16'>
        <li className={`flex items-center gap-3 mb-4 text-green-400`}>
          <CheckCircleIc className='w-6 h-6 ' />
          <h3 className='text-lg'>Autenticación</h3>
        </li>
        <li
          className={`flex items-center gap-3 mb-4 ${
            speechRecognitionSupported === null
              ? 'text-gray-500 animate-twPulse animate-infinite'
              : `${!speechRecognitionSupported ? 'text-red-400' : 'text-green-400'}`
          }
          }`}
        >
          {speechRecognitionSupported !== null && speechRecognitionSupported ? (
            <CheckCircleIc className='w-6 h-6' />
          ) : (
            <ErrorCircleIc className='w-6 h-6' />
          )}
          <h3 className='text-lg'>Soporte Reconocimiento de Voz</h3>
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
      </ul>
      {showAlertMedia && (
        <AlertMedia message='Tu navegador no es compatible con algunas características o no has habilitado el acceso al micrófono.' />
      )}
      {configChecking.isMicrophoneEnabled &&
        speechRecognitionSupported !== null &&
        speechRecognitionSupported && (
          <Link
            href={`/interview/${offerId}`}
            className='bg-primary border hover:border-opacity-30 border-white border-opacity-10 text-[#bac8de] hover:text-white py-3 px-4 rounded-md'
          >
            Empezar Entrevista
          </Link>
        )}
    </>
  )
}
