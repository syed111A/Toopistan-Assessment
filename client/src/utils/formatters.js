export function formatDate(date) {
  const parsedDate = new Date(date)
  if (Number.isNaN(parsedDate.getTime())) {
    return 'Date to be announced'
  }

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
  }).format(parsedDate)
}

export function formatFee(fee) {
  const amount = Number(fee)
  if (!Number.isFinite(amount)) {
    return 'Fee unavailable'
  }
  if (amount === 0) {
    return 'Free'
  }

  const formattedAmount = new Intl.NumberFormat('en-PK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)

  return `Rs. ${formattedAmount}`
}

export function formatSeatsLeft(seatsLeft) {
  if (seatsLeft === null || seatsLeft === undefined) {
    return 'Availability unavailable'
  }

  const count = Number(seatsLeft)
  if (!Number.isFinite(count) || count <= 0) {
    return 'Sold out'
  }

  const urgency = count <= 5 ? 'Only ' : ''
  const seatLabel = count === 1 ? 'seat' : 'seats'
  return `${urgency}${count} ${seatLabel} left`
}
