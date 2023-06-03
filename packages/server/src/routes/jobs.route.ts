import { Router } from 'express'
import { getJobDetailsById, getListJobs } from '../controllers/jobs.controller'

const router = Router()

router.get('/list-jobs', getListJobs)
router.get('/job-details', getJobDetailsById)

export default router
