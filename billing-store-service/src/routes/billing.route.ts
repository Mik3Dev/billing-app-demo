import { Router } from 'express'
import { getBillings, getBilling } from '../controllers/billing.controller'

const router = Router()

router.get('/', getBillings)
router.get('/:id', getBilling)

export { router }
