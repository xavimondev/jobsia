'use client'
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

export function Speech() {
  const commands = [
    {
      command: 'reset',
      callback: ({ resetTranscript }: any) => resetTranscript()
    }
  ]
  const { transcript, listening } = useSpeechRecognition({ commands })
  const handleListing = () => {
    // Lenguages: https://www.techonthenet.com/js/language_tags.php
    SpeechRecognition.startListening({
      continuous: true,
      language: 'es-US'
    })
  }
  const stopHandle = () => {
    SpeechRecognition.stopListening()
  }
  /* {!browserSupportsSpeechRecognition && (
    // TODO: Validate this in settings page
    <span>El navegador no soporta reconocimiento de voz 😢.</span>
  )} */
  return (
    <>
      <div className='text-white text-xl xl:text-2xl w-1/2'>
        <p>{transcript}</p>
        <button className='p-2 bg-blue-400 text-white ml-2' onClick={handleListing}>
          Turn on
        </button>
        {listening && (
          <button className='p-2 bg-blue-400 text-white ml-2' onClick={stopHandle}>
            Stop
          </button>
        )}
      </div>
    </>
  )
}
