import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Registration from '../models/Registration.js'

export async function loginAdmin(request, response, next) {
  try {
    const email = request.body.email.trim().toLowerCase()
    const password = request.body.password
    const emailMatches = email === request.app.locals.adminEmail
    const passwordMatches = await bcrypt.compare(
      password,
      request.app.locals.adminPasswordHash,
    )

    if (!emailMatches || !passwordMatches) {
      return response.status(401).json({
        success: false,
        message: 'Invalid email or password.',
        data: null,
      })
    }

    const token = jwt.sign(
      { role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' },
    )

    return response.json({
      success: true,
      message: 'Admin login successful.',
      data: { token },
    })
  } catch (error) {
    return next(error)
  }
}

export async function listRegistrations(request, response, next) {
  try {
    const registrations = await Registration.find()
      .populate('workshop', 'title')
      .sort({ createdAt: -1 })
      .lean()

    response.json({
      success: true,
      message: 'Registrations retrieved.',
      data: registrations,
    })
  } catch (error) {
    next(error)
  }
}
