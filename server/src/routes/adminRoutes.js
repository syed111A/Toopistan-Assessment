import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import {
  listRegistrations,
  loginAdmin,
} from '../controllers/adminController.js'
import requireAdmin from '../middleware/auth.js'
import { adminLoginRateLimiter } from '../middleware/rateLimits.js'
import sanitizeInput from '../middleware/sanitizeInput.js'

const router = Router()

router.post(
  '/login',
  [
    adminLoginRateLimiter,
    sanitizeInput,
    body('email')
      .isString()
      .withMessage('A valid email address is required.')
      .bail()
      .trim()
      .isEmail()
      .withMessage('A valid email address is required.'),
    body('password')
      .isString()
      .withMessage('Password is required.')
      .bail()
      .notEmpty()
      .withMessage('Password is required.'),
  ],
  (request, response, next) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(400).json({
        success: false,
        message: 'Login details are invalid.',
        data: errors.array().map(({ path, msg }) => ({ field: path, message: msg })),
      })
    }

    return loginAdmin(request, response, next)
  },
)

router.get('/registrations', requireAdmin, listRegistrations)

export default router
