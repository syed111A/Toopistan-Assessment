import { rateLimit } from 'express-rate-limit'

function createRateLimit(message, limit) {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler(request, response) {
      response.status(429).json({
        success: false,
        message,
        data: null,
      })
    },
  })
}

export const apiRateLimiter = createRateLimit(
  'Too many requests. Please try again later.',
  100,
)

export const adminLoginRateLimiter = createRateLimit(
  'Too many login attempts. Please try again in 15 minutes.',
  10,
)
