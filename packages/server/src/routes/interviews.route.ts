import { Router } from 'express'
import {
  endInterview,
  getInterviewDetailsById,
  generateNextQuestion
} from '../controllers/interview.controller'

const router = Router()

router.get('/interview-details', getInterviewDetailsById)
router.post('/interview', generateNextQuestion)
router.post('/end-interview', endInterview)

export default router
