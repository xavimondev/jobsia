export const INFOJOBS_AUTH = 'https://www.infojobs.net/oauth/authorize'
export const INTERVIEW_TOTAL_QUESTIONS = 10
export const QUESTION_MAX_SCORE = 5
export const INTERVIEW_MAX_SCORE = INTERVIEW_TOTAL_QUESTIONS * QUESTION_MAX_SCORE
const INTERVIEW_PERCENTAGE = 0.6
export const SCORE_TO_ACCOMPLISH = INTERVIEW_MAX_SCORE * INTERVIEW_PERCENTAGE
export const AUTH_REDIRECT =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://jobsia.vercel.app'
export const SERVER_ENDPOINT =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://jobsia.up.railway.app'
