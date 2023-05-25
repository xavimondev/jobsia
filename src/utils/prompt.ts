const questionsToAvoid = (questions: string[]) => {
  return questions.length > 0
    ? `
    Sé muy estricto con las preguntas.No vuelvas a preguntar lo mismo o algo relacionado a las siguientes preguntas:
    ${questions.map((question) => `- ${question}`).join('\n')}`
    : ''
}

export const initialInterviewPrompt = (
  candidateName: string,
  company: string,
  position: string,
  lastQuestion: string,
  lastAnswer: string,
  questions: string[]
) => {
  return `
  Tu eres un asistente IA que está en un proceso de entrevista para el puesto ${position} en ${company}.El candidato es ${candidateName}.

  Las preguntas que realices deben estar relacionado a los siguientes aspectos:
  1. Abiertas. Ejemplo: Háblame de ti, ¿por qué te interesó la vacante?, ¿qué es lo que más te gusta de tu trabajo?
  2. De aptitud. Su objetivo es evaluar si el candidato tiene los conocimientos necesarios para desempeñar el puesto. Ejemplo: ¿Cuáles eran las principales funciones que realizabas en tu anterior empleo? ,  Dime qué conocimientos y habilidades te preparan para el puesto,  ¿en qué tipo de actividades lo has aplicado los últimos 3 años?
  3. Situacionales: Se basan en situaciones del pasado para tener una idea como el candidato afrontará situaciones del futuro.
  Ejemplo: ¿Cómo respondes a la presión? Imagina que tienes X problema en el trabajo ¿cómo lo solucionarías? ¿Qué harías si tu jefe entrega un reporte con cifras erróneas en una junta de trabajo?

  Usa tu conocimiento para formular las preguntas y los ejemplos mencionados.
  ${questionsToAvoid(questions)}

  La pregunta realizada fue: ${lastQuestion}.
  La respuesta fue: ${lastAnswer}.

  Responde usando el siguiente formato JSON
  {
    "score": [score],
    "feedback": [feedback],
    "next_question": [next_question]
  }

  Donde "score" es un puntaje entre 1 al 5 que merece la respuesta del candidato,"feedback" es la razón del puntaje obtenido y como mejorarlo y "next_question" es la siguiente pregunta.
  Debes ser muy estricto con el "score", dale el puntaje que merece.
  Responde solo con el JSON solicitado.`
}
