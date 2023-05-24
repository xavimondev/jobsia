'use client'
import { useEffect, useRef, useState } from 'react'
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
  const initialMessage = `¡Bienvenido, ${candidate}! La siguiente entrevista será para el puesto ${position}.
  Durante la entrevista, exploraremos diferentes aspectos para evaluar tu idoneidad en el puesto. !Mucha suerte!`
  // '¿Qué nos podrías contar sobre ti?'
  const [currentQuestion, setCurrentQuestion] = useState<string | undefined>(undefined)
  const updateInterview = useStore((state) => state.updateInterview)
  const interview = useStore((state) => state.interview)
  const speechRef = useRef<SpeechSynthesisUtterance | undefined>(undefined)

  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
    if (!speechRef.current) {
      const utterance = new SpeechSynthesisUtterance()
      utterance.lang = 'es-US'
      utterance.rate = 0.8
      speechRef.current = utterance
    }
  }, [])

  useEffect(() => {
    if (speechRef.current) {
      speechRef.current.text = !currentQuestion ? initialMessage : currentQuestion
      speechSynthesis.speak(speechRef.current)
      speechRef.current.onend = () => {
        if (!currentQuestion) {
          setCurrentQuestion('¿Qué nos podrías contar sobre ti?')
        }
      }
    }
  }, [speechRef.current, currentQuestion])

  const sendAnswer = async (userAnswer: string) => {
    if (!userAnswer) return

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
      question: currentQuestion!,
      answer: userAnswer,
      score,
      feedback
    }
    updateInterview(messageInterview)
    // Update current question
    setCurrentQuestion(next_question)
  }

  return (
    <div className='flex flex-row gap-4 mt-8 h-[calc(100vh-220px)]'>
      <div className='text-yellow-300 text-xl xl:text-3xl w-1/2 grid place-items-center animate-fadeIn animate-duration-700 animate-delay-300'>
        <p className='italic text-center'>{!currentQuestion ? initialMessage : currentQuestion}</p>
      </div>
      <Speech sendAnswer={sendAnswer} />
    </div>
  )
}
