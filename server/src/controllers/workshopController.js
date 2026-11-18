import mongoose from 'mongoose'
import Workshop from '../models/Workshop.js'
import {
  addSeatsLeftToWorkshops,
  getWorkshopSeatsLeft,
} from '../services/workshopAvailability.js'

export async function listWorkshops(request, response, next) {
  try {
    const workshops = await Workshop.find({ date: { $gt: new Date() } })
      .sort({ date: 1 })
      .lean()
    const workshopsWithAvailability = await addSeatsLeftToWorkshops(workshops)

    response.json({
      success: true,
      message: 'Upcoming workshops retrieved.',
      data: workshopsWithAvailability,
    })
  } catch (error) {
    next(error)
  }
}

export async function getWorkshop(request, response, next) {
  try {
    const { id } = request.params
    const workshop = mongoose.isValidObjectId(id)
      ? await Workshop.findById(id).lean()
      : null

    if (!workshop) {
      return response.status(404).json({
        success: false,
        message: 'Workshop not found.',
        data: null,
      })
    }

    const seatsLeft = await getWorkshopSeatsLeft(workshop)

    return response.json({
      success: true,
      message: 'Workshop retrieved.',
      data: { ...workshop, seatsLeft },
    })
  } catch (error) {
    return next(error)
  }
}
