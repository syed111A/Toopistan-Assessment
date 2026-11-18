import Registration from '../models/Registration.js'

export function calculateSeatsLeft(seats, registrationCount) {
  return Math.max(0, seats - registrationCount)
}

export async function getWorkshopSeatsLeft(workshop) {
  const registrationCount = await Registration.countDocuments({
    workshop: workshop._id,
  })

  return calculateSeatsLeft(workshop.seats, registrationCount)
}

export async function addSeatsLeftToWorkshops(workshops) {
  if (workshops.length === 0) {
    return workshops
  }

  // One grouped aggregation counts registrations for every listed workshop.
  const registrationCounts = await Registration.aggregate([
    { $match: { workshop: { $in: workshops.map((workshop) => workshop._id) } } },
    { $group: { _id: '$workshop', count: { $sum: 1 } } },
  ])
  const countsByWorkshop = new Map(
    registrationCounts.map(({ _id, count }) => [_id.toString(), count]),
  )

  return workshops.map((workshop) => ({
    ...workshop,
    seatsLeft: calculateSeatsLeft(
      workshop.seats,
      countsByWorkshop.get(workshop._id.toString()) || 0,
    ),
  }))
}
