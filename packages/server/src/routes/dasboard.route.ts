import { Router } from 'express'
import { getTotalScoreInterview } from '../controllers/dashboard.controller'

const router = Router()

router.get('/dashboard', getTotalScoreInterview)

export default router
