import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import mongoose from 'mongoose'
import { createRegistration } from '../controllers/registrationController.js'
import Workshop from '../models/Workshop.js'
import sanitizeInput from '../middleware/sanitizeInput.js'

const router = Router()

const registrationRules = [
  body('name')
    .isString()
    .withMessage('Name must be at least 2 characters long.')
    .bail()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long.'),
  body('email')
    .isString()
    .withMessage('A valid email address is required.')
    .bail()
    .trim()
    .isEmail()
    .withMessage('A valid email address is required.')
    .normalizeEmail(),
  body('phone')
    .isString()
    .withMessage('Phone must contain 10 to 15 digits, with an optional leading +.')
    .bail()
    .trim()
    .matches(/^\+?\d{10,15}$/)
    .withMessage('Phone must contain 10 to 15 digits, with an optional leading +.'),
  body('workshop')
    .isString()
    .withMessage('A valid workshop ID is required.')
    .bail()
    .custom((id) => mongoose.isValidObjectId(id))
    .withMessage('A valid workshop ID is required.')
    .bail()
    .custom(async (id) => {
      const workshopExists = await Workshop.exists({ _id: id })
      if (!workshopExists) {
        throw new Error('Workshop not found.')
      }
    }),
]

router.post('/', sanitizeInput, registrationRules, (request, response, next) => {
  const errors = validationResult(request)

  if (!errors.isEmpty()) {
    return response.status(400).json({
      success: false,
      message: 'Registration details are invalid.',
      data: errors.array().map(({ path, msg }) => ({ field: path, message: msg })),
    })
  }

  return createRegistration(request, response, next)
})

export default router
