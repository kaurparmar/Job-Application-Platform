import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { User } from './models/user.model.js'

dotenv.config()

const uri = process.env.MONGODB_URI
if (!uri) {
  console.error('MONGODB_URI is not set in environment')
  process.exit(1)
}

const users = [
  {
    fullname: 'Test Applicant',
    email: 'applicant@example.com',
    phoneNumber: '9999999999',
    password: '$2a$10$E8B8Q7xOJ2kZaH1NlbbAqOG6i.8/sDmiUcx7iY3qdkvTyM0qnA4yG',
    role: 'applicant',
    profile: { profilePhoto: '' },
  },
  {
    fullname: 'Test Recruiter',
    email: 'recruiter@example.com',
    phoneNumber: '8888888888',
    password: '$2a$10$E8B8Q7xOJ2kZaH1NlbbAqOG6i.8/sDmiUcx7iY3qdkvTyM0qnA4yG',
    role: 'recruiter',
    profile: { profilePhoto: '' },
  },
]

const seed = async () => {
  try {
    await mongoose.connect(uri)
    console.log('Connected to MongoDB')
    await User.deleteMany({ email: { $in: users.map(u => u.email) } })
    await User.insertMany(users)
    console.log('Seed data inserted')
  } catch (err) {
    console.error('Seed error:', err)
  } finally {
    await mongoose.disconnect()
    process.exit(0)
  }
}

seed()
