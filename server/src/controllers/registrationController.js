import Registration from '../models/Registration.js'
import Workshop from '../models/Workshop.js'
import { getWorkshopSeatsLeft } from '../services/workshopAvailability.js'

export async function createRegistration(request, response, next) {
  try {
    const { name, email, phone, workshop: workshopId } = request.body
    const workshop = await Workshop.findById(workshopId)

    if (!workshop) {
      return response.status(404).json({
        success: false,
        message: 'Workshop not found.',
        data: null,
      })
    }

    const existingRegistration = await Registration.exists({
      email: email.toLowerCase(),
      workshop: workshopId,
    })

    if (existingRegistration) {
      return response.status(409).json({
        success: false,
        message: 'This email is already registered for this workshop.',
        data: null,
      })
    }

    const seatsLeft = await getWorkshopSeatsLeft(workshop)

    if (seatsLeft === 0) {
      return response.status(409).json({
        success: false,
        message: 'This workshop has no seats remaining.',
        data: null,
      })
    }

    const registration = await Registration.create({
      name,
      email,
      phone,
      workshop: workshopId,
    })

    return response.status(201).json({
      success: true,
      message: 'Registration successful.',
      data: { registrationId: registration.id },
    })
  } catch (error) {
    // The unique index also protects against duplicate requests arriving together.
    if (error.code === 11000) {
      return response.status(409).json({
        success: false,
        message: 'This email is already registered for this workshop.',
        data: null,
      })
    }

    return next(error)
  }
}
