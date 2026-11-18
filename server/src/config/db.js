import mongoose from 'mongoose'

// Connect to MongoDB using the connection string from the environment.
async function connectDB() {
  const { MONGO_URI } = process.env

  if (!MONGO_URI) {
    throw new Error('MONGO_URI is required to connect to MongoDB.')
  }

  await mongoose.connect(MONGO_URI)
  console.log('Connected to MongoDB.')
}

export default connectDB
