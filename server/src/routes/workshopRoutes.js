import { Router } from 'express'
import { getWorkshop, listWorkshops } from '../controllers/workshopController.js'

const router = Router()

router.get('/', listWorkshops)
router.get('/:id', getWorkshop)

export default router
