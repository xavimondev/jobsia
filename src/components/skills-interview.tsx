'use client'
import { useEffect } from 'react'
import { Speech } from './speech'
// Testing: 307777a5f54cd09d3b6440ddf7d98a
export function SkillsInterview() {
  useEffect(() => {
    console.log('Here it should show information from chatgpt')
    const utterance = new SpeechSynthesisUtterance(
      `Entendido. Para realizar una entrevista de 10 minutos, podemos establecer un límite de tiempo para cada pregunta y respuesta. Asegurémonos de mantener un ritmo constante para cubrir la mayor cantidad de preguntas posibles en ese tiempo. Durante la simulación. ¿Estás listo para comenzar la entrevista de trabajo de 10 minutos?`
    )
    utterance.lang = 'es-US'
    utterance.rate = 0.7
    speechSynthesis.speak(utterance)
    //const voices = speechSynthesis.getVoices()
    //console.log(voices)
    //utterance.voice = voices.at(125)!
  }, [])

  return (
    <div className='flex flex-row gap-4 mt-8'>
      <div className='text-yellow-300 text-xl xl:text-3xl w-1/2'>
        <p className='italic'>
          Como te identifica a ti mismo dentro de unos años y como crees que debo decir un texto
          largo que no debe exceder los 100 tokens
        </p>
      </div>
      <Speech />
    </div>
  )
}
