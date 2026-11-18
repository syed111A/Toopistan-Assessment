import { motion, useReducedMotion } from 'framer-motion'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button.jsx'
import Card from './Card.jsx'
import WorkshopImage from './WorkshopImage.jsx'
import {
  formatDate,
  formatFee,
  formatSeatsLeft,
} from '../utils/formatters.js'

function WorkshopCard({ workshop, index = 0, compact = false }) {
  const shouldReduceMotion = useReducedMotion()
  const workshopId = workshop._id || workshop.id
  const reportedSeats = Number(workshop.seatsLeft ?? workshop.seats ?? 0)
  const seatsLeft = Number.isFinite(reportedSeats) ? Math.max(0, reportedSeats) : 0
  const isSoldOut = seatsLeft === 0
  const registrationUrl = `/register?workshop=${encodeURIComponent(workshopId || '')}`
  const directionsUrl = workshop.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(workshop.address)}`
    : ''

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
      transition={{
        delay: shouldReduceMotion ? 0 : Math.min(index, 6) * 0.06,
        duration: shouldReduceMotion ? 0 : 0.24,
      }}
    >
      <Card className="group flex h-full flex-col overflow-hidden p-0">
        <div
          className={`relative overflow-hidden bg-blush-100 ${
            compact ? 'aspect-[16/9]' : 'aspect-[16/10]'
          }`}
        >
          <WorkshopImage
            alt={`Participants at the ${workshop.title} workshop`}
            className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105 motion-reduce:transition-none"
            workshop={workshop}
          />
          <span className="absolute left-4 top-4 max-w-[calc(100%-2rem)] truncate rounded-full bg-paper/95 px-3 py-1 text-xs font-bold text-brand-800 shadow-sm">
            {workshop.category || 'Workshop'}
          </span>
        </div>

        <div className={`flex flex-1 flex-col ${compact ? 'p-4' : 'p-5'}`}>
          <p className="text-sm font-medium text-ink-700">
            {formatDate(workshop.date)}
            {workshop.time && <span> · {workshop.time}</span>}
          </p>
          <h3 className="mt-2 font-heading text-2xl font-semibold leading-snug text-ink">
            {workshop.title}
          </h3>
          {!compact && (
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-700">
              {workshop.description}
            </p>
          )}

          <div
            className={`${compact ? 'mt-3' : 'mt-4'} flex items-start gap-2 text-sm text-ink-700`}
          >
            <svg
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-brand-700"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
              <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            <div className="min-w-0">
              <p className="font-semibold text-ink-900">
                {workshop.location || 'Venue to be announced'}
              </p>
              {!compact && workshop.address && (
                <>
                  <p className="mt-1 break-words leading-5">{workshop.address}</p>
                  <a
                    className="mt-1 inline-flex min-h-11 items-center font-semibold text-brand-800 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                    href={directionsUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Directions
                  </a>
                </>
              )}
            </div>
          </div>

          <div
            className={`${compact ? 'mt-3' : 'mt-4'} flex flex-wrap items-center justify-between gap-3 border-t border-blush-100 pt-4`}
          >
            <span className="font-semibold text-ink-900">{formatFee(workshop.fee)}</span>
            <span
              className={`text-sm font-medium ${
                isSoldOut ? 'text-brand-800' : 'text-ink-700'
              }`}
            >
              {workshop.seatsLeft === undefined || workshop.seatsLeft === null
                ? isSoldOut
                  ? 'Sold out'
                  : `${seatsLeft} ${seatsLeft === 1 ? 'seat' : 'seats'}`
                : formatSeatsLeft(seatsLeft)}
            </span>
          </div>

          {workshopId && !isSoldOut ? (
            <Button
              as={Link}
              className="mt-auto w-full"
              to={registrationUrl}
              variant="primary"
            >
              Register
            </Button>
          ) : (
            <Button className="mt-auto w-full" disabled variant="primary">
              {isSoldOut ? 'Sold out' : 'Registration unavailable'}
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  )
}

export default memo(WorkshopCard)
