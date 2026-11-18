import 'dotenv/config'
import mongoose from 'mongoose'
import connectDB from './config/db.js'
import Workshop from './models/Workshop.js'

function dateAfterDays(days) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  date.setHours(10, 0, 0, 0)
  return date
}

const workshops = [
  {
    title: 'Creative Writing',
    description: 'Build a daily writing practice and shape ideas into vivid stories.',
    image: '/images/creative-writing.jpg',
    date: dateAfterDays(30),
    fee: 1500,
    seats: 18,
    location: 'TOOP Creative Studio',
    address: 'NIC Peshawar, Pakistan',
    time: '5:00 PM - 8:00 PM',
    category: 'Creative',
  },
  {
    title: 'Web Dev Basics',
    description: 'Learn the foundations of HTML, CSS, and JavaScript by building a page.',
    image: '/images/web-dev-basics.jpg',
    date: dateAfterDays(45),
    fee: 2000,
    seats: 20,
    location: 'TOOP Learning Lab',
    address: 'Edex School,Hayatabad, Peshawar ',
    time: '10:00 AM - 1:00 PM',
    category: 'Technical',
  },
  {
    title: 'UI/UX Design',
    description: 'Practice user research, wireframing, and interface design fundamentals.',
    image: '/images/ui-ux-design.jpg',
    date: dateAfterDays(60),
    fee: 2500,
    seats: 16,
    location: 'TOOP Design Loft',
    address: 'BIC Peshawar, Pakistan',
    time: '2:00 PM - 5:00 PM',
    category: 'Technical',
  },
  {
    title: 'Poetry & Spoken Word',
    description: 'Explore poetry writing and bring your words to life through performance.',
    image: '/images/poetry-spoken-word.jpg',
    date: dateAfterDays(75),
    fee: 1900,
    seats: 22,
    location: 'TOOP Poetry Room',
    address: 'BIC Peshawar, Pakistan',
    time: '6:00 PM - 9:00 PM',
    category: 'Creative',
  },
]

async function seedWorkshops() {
  try {
    await connectDB()
    await Workshop.deleteMany({})
    const insertedWorkshops = await Workshop.insertMany(workshops)
    console.log(`Seeded ${insertedWorkshops.length} workshops.`)
  } catch (error) {
    console.error('Failed to seed workshops:', error.message)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

seedWorkshops()
