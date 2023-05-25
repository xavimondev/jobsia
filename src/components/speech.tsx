'use client'
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { MicrophoneIc, StopVoiceIc } from './icons'
import { Tooltip } from './ui/tooltip'

type SpeechProps = {
  sendAnswer: (userAnswer: string) => void
}

export function Speech({ sendAnswer }: SpeechProps) {
  const commands = [
    {
      command: 'reset',
      callback: ({ resetTranscript }: any) => resetTranscript()
    }
  ]
  const { transcript, listening, resetTranscript } = useSpeechRecognition({ commands })

  const handleListing = () => {
    resetTranscript()
    // Lenguages: https://www.techonthenet.com/js/language_tags.php
    SpeechRecognition.startListening({
      continuous: true,
      language: 'es-US'
    })
  }

  const stopHandle = () => {
    SpeechRecognition.stopListening()
    // Sending answer to api once user stops listening
    sendAnswer(transcript)
  }
  /* {!browserSupportsSpeechRecognition && (
    // TODO: Validate this in settings page
    <span>El navegador no soporta reconocimiento de voz 😢.</span>
  )} */
  return (
    <>
      <div className='w-1/2 relative grid place-items-center'>
        <p className='text-white text-xl xl:text-2xl'>{transcript}</p>
        <div className='absolute bottom-5 left-1/2 transition duration-200 ease-in-out hover:scale-125'>
          <Tooltip text={`${!listening ? 'Click para hablar' : 'Click para enviar tu respuesta'}`}>
            {!listening ? (
              <button onClick={handleListing}>
                <MicrophoneIc className='text-red-400 h-16 w-16' />
              </button>
            ) : (
              <button onClick={stopHandle}>
                <StopVoiceIc className='text-red-400 h-16 w-16' />
              </button>
            )}
          </Tooltip>
        </div>
      </div>
    </>
  )
}
