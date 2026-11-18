import mongoose from 'mongoose'

const workshopSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
    min: 0,
  },
  seats: {
    type: Number,
    required: true,
    min: 1,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  time: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
})

const Workshop = mongoose.model('Workshop', workshopSchema)

export default Workshop
