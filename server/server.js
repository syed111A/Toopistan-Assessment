import 'dotenv/config'
import bcrypt from 'bcryptjs'
import app from './src/app.js'
import connectDB from './src/config/db.js'

const PORT = process.env.PORT || 5000

async function startServer() {
  const requiredVariables = [
    'MONGO_URI',
    'ADMIN_EMAIL',
    'ADMIN_PASSWORD',
    'JWT_SECRET',
    'CLIENT_URL',
  ]
  const missingVariables = requiredVariables.filter(
    (name) => !process.env[name]?.trim(),
  )

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVariables.join(', ')}.`,
    )
  }

  await connectDB()

  // Keep only the hashed password in memory for admin login checks.
  app.locals.adminEmail = process.env.ADMIN_EMAIL.trim().toLowerCase()
  app.locals.adminPasswordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12)

  module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}
}

startServer().catch((error) => {
  const isMissingConfiguration =
    error instanceof Error &&
    error.message.startsWith('Missing required environment variables:')
  const message = isMissingConfiguration
    ? error.message
    : 'Server startup failed. Check MongoDB connectivity and environment configuration.'

  console.error(message)
  process.exit(1)
})
