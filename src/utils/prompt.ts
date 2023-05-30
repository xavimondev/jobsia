export const questionsToAvoid = (questions: string[]) => {
  return questions.length > 0
    ? `
    Eres un asistente muy inteligente y no repetirás estas preguntas, ni preguntarás algo similar:
    ${questions.map((question) => `- ${question}`).join('\n')}
    
    El candidato ya las ha respondido y no tiene sentido preguntarlas nuevamente.`
    : ''
}

export const initialInterviewPrompt = (
  candidateName: string,
  company: string,
  position: string,
  lastQuestion: string,
  lastAnswer: string,
  questions: string[],
  requirements: string
) => {
  return `
  Tu eres un asistente IA que trabaja en el área de Recursos Humanos y estás participando en una entrevista para el puesto ${position} en ${company}.
  El candidato es ${candidateName}.
  Tú objetivo como asistente es conocer información relevante del candidato, habilidades técnicas y sus experiencias en trabajos pasados.

  Las preguntas deben basarse tambien en la información de la oferta que es la siguiente:
  ${requirements}

  ${questionsToAvoid(questions)}

  La pregunta realizada fue: ${lastQuestion}.
  La respuesta fue: ${lastAnswer}.

  Responde usando el siguiente formato JSON:
  {
    "score": [score],
    "feedback": [feedback],
    "next_question": [next_question]
  }

  Donde "score" es un puntaje entre 1 al 5 que merece la respuesta del candidato, "feedback" es la razón del puntaje obtenido y como mejorarlo y "next_question" es la siguiente pregunta.
  Debes ser muy estricto con el "score", cada respuesta debe ser detallada. Dale el puntaje que merece.
  Responde con el JSON solicitado.`
}
