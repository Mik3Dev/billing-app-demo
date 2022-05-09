import { Router } from 'express'
import { check } from 'express-validator'
import {
  createBilling,
  getBillings,
  getBilling,
} from '../controllers/billing.controller'
import { validateFields } from '../middlewares/validate-fields.middleware'

const router = Router()

router.post(
  '/',
  [
    check('name', 'El campo nombre es obligatorio').notEmpty(),
    check('documentNumber', 'El campo rut es obligatorio').notEmpty(),
    check('address', 'El campo direccion es obligatorio').notEmpty(),
    check('commune', 'El campo comuna es obligatorio').notEmpty(),
    check('city', 'El campo ciudad es obligatorio').notEmpty(),
    check('activity', 'El campo giro es obligatorio').notEmpty(),
    check('email', 'El campo correo electronico es obligatorio').notEmpty(),
    check(
      'products',
      'Es obligatorio ingresar al menos un producto'
    ).notEmpty(),
    validateFields,
  ],
  createBilling
)
router.get('/', getBillings)
router.get('/:id', getBilling)

export { router }
