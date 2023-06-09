'use client'
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useStore } from '@/store'
import { MicrophoneBlocked, MicrophoneIc, StopVoiceIc } from '@/components/icons'
import { Tooltip } from '@/components/ui/tooltip'

type SpeechProps = {
  sendAnswer: (userAnswer: string) => void
}

export function Speech({ sendAnswer }: SpeechProps) {
  const { transcript, listening, resetTranscript } = useSpeechRecognition()
  const isAssistantSpeaking = useStore((state) => state.isAssistantSpeaking)
  const setIsAssistantSpeaking = useStore((state) => state.setIsAssistantSpeaking)

  const handleListing = () => {
    resetTranscript()
    // Lenguages: https://www.techonthenet.com/js/language_tags.php
    SpeechRecognition.startListening({
      continuous: true,
      language: 'es-US'
    })
  }

  const stopHandle = () => {
    if (!transcript && transcript.length === 0) {
      return
    }
    SpeechRecognition.stopListening()
    setIsAssistantSpeaking(true)
    sendAnswer(transcript)
  }

  return (
    <>
      <div className='w-1/2 relative grid place-items-center'>
        <p className='text-white text-xl xl:text-2xl'>{transcript}</p>
        <div className='absolute bottom-5 left-1/2 transition duration-200 ease-in-out hover:scale-125'>
          {isAssistantSpeaking ? (
            <MicrophoneBlocked className='text-gray-400 h-16 w-16' />
          ) : (
            <Tooltip
              side='top'
              color='#0d0d15'
              text={`${!listening ? 'Click para hablar' : 'Click para enviar tu respuesta'}`}
            >
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
          )}
        </div>
      </div>
    </>
  )
}
