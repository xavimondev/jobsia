'use client'
import { useEffect, useState } from 'react'
import { Interview } from '@/types'
import { useStore } from '@/store'
import { startInterview } from '@/services/interview'
import { Speech } from './speech'
// Testing: 307777a5f54cd09d3b6440ddf7d98a

type SkillsInterviewProps = {
  candidate: string
  position: string
  company: string
  category: string
  location: string
}

export function SkillsInterview({ candidate, position, company, location }: SkillsInterviewProps) {
  // const initialMessage = `¡Bienvenido, ${candidate}! En ${company} estamos buscando un ${position} para nuestro equipo. La oferta es para la ciudad de ${location}.
  // A lo largo de la entrevista, exploraremos diferentes aspectos para evaluar tu idoneidad para el puesto.`
  const [currentQuestion, setCurrentQuestion] = useState<string>(
    '¿Qué nos podrías contar sobre ti?'
  )
  const [userAnswer, setUserAnswer] = useState('')
  const updateInterview = useStore((state) => state.updateInterview)
  const interview = useStore((state) => state.interview)

  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
    // const utterance = new SpeechSynthesisUtterance(initialMessage)
    // utterance.lang = 'es-US'
    // utterance.rate = 0.8
    // speechSynthesis.speak(utterance)
  }, [])

  async function startChatting() {
    const questions = interview.map((intw) => intw.question)
    const payload = {
      candidate,
      position,
      company,
      currentQuestion,
      userAnswer,
      totalQuestions: interview.length,
      questions
    }
    //console.log(payload)
    const data = await startInterview(payload)
    console.log(data)
    if (data.isEndInterview) {
      setCurrentQuestion(data.message)
      return
    }
    /*
      Once I have score, feedback and answer, lets add the part of the conversation into the interview array.
      Then, update current question
    */
    const { feedback, score, next_question } = data
    // Update interview conversation
    const messageInterview: Interview = {
      question: currentQuestion,
      answer: userAnswer,
      score,
      feedback
    }
    updateInterview(messageInterview)
    // Update current question
    setCurrentQuestion(next_question)
  }

  return (
    <div className='flex flex-row gap-4 mt-8'>
      <div className='text-yellow-300 text-xl xl:text-3xl w-1/2'>
        <p className='italic text-center'>{currentQuestion}</p>
      </div>
      <Speech />
      <div>
        <textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          name='input'
          cols={20}
          rows={10}
        ></textarea>
        <button className='p-2 bg-teal-600 text-white' onClick={startChatting}>
          Enviar texto
        </button>
      </div>
    </div>
  )
}
