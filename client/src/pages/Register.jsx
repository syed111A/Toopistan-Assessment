import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import Container from '../components/Container.jsx'
import Input from '../components/Input.jsx'
import PenNib from '../components/PenNib.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Select from '../components/Select.jsx'
import WorkshopImage from '../components/WorkshopImage.jsx'
import usePageTitle from '../hooks/usePageTitle.js'
import useWorkshops from '../hooks/useWorkshops.js'
import { registerForWorkshop } from '../services/api.js'
import {
  formatDate,
  formatFee,
  formatSeatsLeft,
} from '../utils/formatters.js'
import useToast from '../components/useToast.js'

const emptyValues = {
  name: '',
  email: '',
  phone: '',
  workshop: '',
}

const registrationSchema = z.object({
  name: z.string().trim().min(2, 'Please enter at least 2 characters.'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please enter a valid email address.'),
  phone: z
    .string()
    .trim()
    .regex(/^\+?\d{10,15}$/, 'Use 10-15 digits, with an optional leading +.'),
  workshop: z.string().min(1, 'Please choose a workshop.'),
})

function getWorkshopId(workshop) {
  return String(workshop._id || workshop.id || '')
}

function Register() {
  const [searchParams] = useSearchParams()
  const workshopFromUrl = searchParams.get('workshop') || ''
  const { workshops, isLoading, error, retry } = useWorkshops()
  const { showToast } = useToast()
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [registeredWorkshopTitle, setRegisteredWorkshopTitle] = useState('')
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: emptyValues,
  })

  usePageTitle(
    'Register | TOOP',
    'Choose a TOOP workshop, review its details, and reserve your place.',
  )

  useEffect(() => {
    const workshopExists = workshops.some(
      (workshop) => getWorkshopId(workshop) === workshopFromUrl,
    )
    if (workshopFromUrl && workshopExists) {
      setValue('workshop', workshopFromUrl)
    }
  }, [setValue, workshopFromUrl, workshops])

  const selectedWorkshopId = useWatch({ control, name: 'workshop' })
  const selectedWorkshop = workshops.find(
    (workshop) => getWorkshopId(workshop) === selectedWorkshopId,
  )
  const reportedSeatsLeft = Number(selectedWorkshop?.seatsLeft)
  const hasRemainingSeatCount =
    selectedWorkshop?.seatsLeft !== undefined &&
    selectedWorkshop?.seatsLeft !== null
  const isSelectedWorkshopSoldOut =
    hasRemainingSeatCount &&
    (!Number.isFinite(reportedSeatsLeft) || reportedSeatsLeft <= 0)

  async function submitRegistration(values) {
    try {
      await registerForWorkshop({
        ...values,
        name: values.name.trim(),
        email: values.email.trim().toLowerCase(),
        phone: values.phone.trim(),
      })
      setRegisteredWorkshopTitle(selectedWorkshop?.title || 'your workshop')
      setIsConfirmed(true)
      reset(emptyValues)
      showToast('Your registration was successful.')
    } catch (requestError) {
      showToast(requestError.message, 'error')
    }
  }

  function registerAnother() {
    const preselectedWorkshopExists = workshops.some(
      (workshop) => getWorkshopId(workshop) === workshopFromUrl,
    )

    reset({
      ...emptyValues,
      workshop: preselectedWorkshopExists ? workshopFromUrl : '',
    })
    setIsConfirmed(false)
  }

  return (
    <section className="py-14 sm:py-18">
      <Container>
        <SectionHeading
          as="h1"
          description="Choose a workshop and save your seat."
          eyebrow="Join the next gathering"
          title="Workshop registration"
        />

        {error && (
          <div
            className="mt-8 flex flex-col gap-4 rounded-card border border-brand-200 bg-blush-50 p-5 sm:flex-row sm:items-center sm:justify-between"
            role="alert"
          >
            <p className="text-ink-700">{error}</p>
            <Button className="shrink-0" onClick={retry} variant="secondary">
              Retry loading workshops
            </Button>
          </div>
        )}

        {isConfirmed ? (
          <Card
            className="mt-9 max-w-2xl border-green-200 bg-white p-6 sm:p-8"
            role="status"
          >
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-800">
              You are registered
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-ink">
              We saved your seat.
            </h2>
            <p className="mt-3 text-ink-700">
              Your registration for {registeredWorkshopTitle} is confirmed.
            </p>
            <Button className="mt-6" onClick={registerAnother}>
              Register for another
            </Button>
          </Card>
        ) : (
          <div className="mt-9 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
            <Card className="h-fit bg-blush-50 p-5 sm:p-7 lg:sticky lg:top-24 lg:col-start-2 lg:row-start-1">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-800">
                Your selection
              </p>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-ink">
                Registration summary
              </h2>
              {selectedWorkshop ? (
                <>
                  <div className="mt-5 aspect-[16/10] overflow-hidden rounded-2xl bg-blush-100">
                    <WorkshopImage
                      key={getWorkshopId(selectedWorkshop)}
                      alt={`Participants at the ${selectedWorkshop.title} workshop`}
                      className="h-full w-full object-cover"
                      workshop={selectedWorkshop}
                    />
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-semibold text-ink">
                    {selectedWorkshop.title}
                  </h3>
                  <dl className="mt-4 space-y-4">
                    <div>
                      <dt className="text-sm text-ink-700">Date and time</dt>
                      <dd className="mt-1 font-semibold text-ink-900">
                        {formatDate(selectedWorkshop.date)}
                        {selectedWorkshop.time && ` · ${selectedWorkshop.time}`}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-ink-700">Venue</dt>
                      <dd className="mt-1 font-semibold text-ink-900">
                        {selectedWorkshop.location || 'Venue to be announced'}
                      </dd>
                      {selectedWorkshop.address && (
                        <dd className="mt-1 text-sm leading-5 text-ink-700">
                          {selectedWorkshop.address}
                        </dd>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-4 border-t border-blush-200 pt-4">
                      <div>
                        <dt className="text-sm text-ink-700">Fee</dt>
                        <dd className="mt-1 font-semibold text-ink-900">
                          {formatFee(selectedWorkshop.fee)}
                        </dd>
                      </div>
                      <div className="text-right">
                        <dt className="text-sm text-ink-700">Seats left</dt>
                        <dd
                          className={`mt-1 font-semibold ${
                            isSelectedWorkshopSoldOut ? 'text-brand-800' : 'text-ink-900'
                          }`}
                        >
                          {formatSeatsLeft(selectedWorkshop.seatsLeft)}
                        </dd>
                      </div>
                    </div>
                  </dl>
                </>
              ) : (
                <div className="mt-5 flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-brand-200 bg-white/70 px-5 py-8 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    <PenNib aria-hidden="true" className="h-9 w-9" />
                  </span>
                  <p className="mt-4 max-w-xs text-sm leading-6 text-ink-700">
                    Choose a workshop to preview its photo, schedule, venue, and fee.
                  </p>
                </div>
              )}
            </Card>

            <Card className="p-5 sm:p-7 lg:col-start-1 lg:row-start-1">
              <form
                className="space-y-5"
                noValidate
                onSubmit={handleSubmit(submitRegistration)}
              >
                <Input
                  autoComplete="name"
                  error={errors.name}
                  label="Full name"
                  placeholder="Your full name"
                  {...register('name')}
                />
                <Input
                  autoComplete="email"
                  error={errors.email}
                  label="Email"
                  placeholder="you@example.com"
                  type="email"
                  {...register('email')}
                />
                <Input
                  autoComplete="tel"
                  error={errors.phone}
                  inputMode="tel"
                  label="Phone"
                  placeholder="+15551234567"
                  description="Use 10-15 digits, with an optional leading +. Example: +15551234567"
                  type="tel"
                  {...register('phone')}
                />
                <Select
                  disabled={isLoading || workshops.length === 0}
                  error={errors.workshop}
                  label="Workshop"
                  {...register('workshop')}
                >
                  <option value="">
                    {isLoading ? 'Loading workshops...' : 'Choose a workshop'}
                  </option>
                  {workshops.map((workshop) => (
                    <option key={getWorkshopId(workshop)} value={getWorkshopId(workshop)}>
                      {workshop.title}
                    </option>
                  ))}
                </Select>

                <Button
                  className="w-full sm:w-auto"
                  disabled={
                    isLoading ||
                    workshops.length === 0 ||
                    isSelectedWorkshopSoldOut
                  }
                  loading={isSubmitting}
                  type="submit"
                >
                  {isSelectedWorkshopSoldOut ? 'Sold out' : 'Complete registration'}
                </Button>
              </form>
            </Card>
          </div>
        )}
      </Container>
    </section>
  )
}

export default Register
