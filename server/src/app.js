import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import adminRoutes from './routes/adminRoutes.js'
import registrationRoutes from './routes/registrationRoutes.js'
import workshopRoutes from './routes/workshopRoutes.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'
import { apiRateLimiter } from './middleware/rateLimits.js'

function isPrivateLanDevOrigin(origin) {
  let parsedOrigin
  try {
    parsedOrigin = new URL(origin)
  } catch (error) {
    if (error instanceof TypeError) {
      return false
    }
    throw error
  }

  if (
    parsedOrigin.protocol !== 'http:' ||
    !['5173', '5174'].includes(parsedOrigin.port)
  ) {
    return false
  }

  const octets = parsedOrigin.hostname.split('.').map(Number)
  if (
    octets.length !== 4 ||
    octets.some((octet) => !Number.isInteger(octet) || octet < 0 || octet > 255)
  ) {
    return false
  }

  const [first, second] = octets
  return (
    first === 10 ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && second === 168)
  )
}

const app = express()
const allowedOrigins = new Set([process.env.CLIENT_URL])

if (process.env.NODE_ENV !== 'production') {
  for (const host of ['localhost', '127.0.0.1']) {
    allowedOrigins.add(`http://${host}:5173`)
    allowedOrigins.add(`http://${host}:5174`)
  }
}

app.use(helmet())
app.use(
  cors({
    origin(origin, callback) {
      const isAllowed =
        !origin ||
        allowedOrigins.has(origin) ||
        (process.env.NODE_ENV !== 'production' && isPrivateLanDevOrigin(origin))
      callback(null, isAllowed)
    },
  }),
)
app.use('/api', apiRateLimiter)
app.use(express.json({ limit: '10kb' }))

app.get('/api/health', (request, response) => {
  response.json({ status: 'ok' })
})

app.use('/api/workshops', workshopRoutes)
app.use('/api/registrations', registrationRoutes)
app.use('/api/admin', adminRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
