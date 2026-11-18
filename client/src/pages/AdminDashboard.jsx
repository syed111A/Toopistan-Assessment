import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import Container from '../components/Container.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import usePageTitle from '../hooks/usePageTitle.js'
import { getRegistrations } from '../services/api.js'
import { formatRegistrationDate } from '../utils/formatters.js'

function AdminDashboard() {
  const navigate = useNavigate()
  const [registrations, setRegistrations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  usePageTitle(
    'Admin dashboard | TOOP',
    'Review recent TOOP workshop registrations.',
  )

  const handleLoadError = useCallback(
    (requestError, signal) => {
      if (signal?.aborted) {
        return
      }

      if (requestError.message.toLowerCase().includes('session has expired')) {
        sessionStorage.removeItem('toopAdminToken')
        navigate('/admin/login', {
          replace: true,
          state: { message: requestError.message },
        })
        return
      }

      setError(requestError.message)
    },
    [navigate],
  )

  useEffect(() => {
    const controller = new AbortController()
    const token = sessionStorage.getItem('toopAdminToken')

    if (!token) {
      navigate('/admin/login', { replace: true })
      return () => controller.abort()
    }

    getRegistrations(token, { signal: controller.signal })
      .then((results) => {
        if (!controller.signal.aborted) {
          setRegistrations(results)
        }
      })
      .catch((requestError) =>
        handleLoadError(requestError, controller.signal),
      )
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      })

    return () => controller.abort()
  }, [handleLoadError, navigate])

  function signOut() {
    sessionStorage.removeItem('toopAdminToken')
    navigate('/admin/login', {
      replace: true,
      state: { message: 'You have been signed out.' },
    })
  }

  function retryRegistrations() {
    const token = sessionStorage.getItem('toopAdminToken')
    if (!token) {
      navigate('/admin/login', { replace: true })
      return
    }

    setIsLoading(true)
    setError('')
    getRegistrations(token)
      .then(setRegistrations)
      .catch((requestError) => handleLoadError(requestError))
      .finally(() => setIsLoading(false))
  }

  return (
    <section className="py-14 sm:py-18">
      <Container>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            as="h1"
            description="Review the people registered for upcoming workshops."
            eyebrow="For the TOOP team"
            title="Registration dashboard"
          />
          <Button
            className="self-start sm:self-auto"
            onClick={signOut}
            variant="secondary"
          >
            Sign Out
          </Button>
        </div>

        <Card className="mt-8 overflow-hidden p-0">
          {isLoading ? (
            <p aria-live="polite" className="p-6 text-ink-700" role="status">
              Loading registrations...
            </p>
          ) : error ? (
            <div className="p-6" role="alert">
              <p className="text-ink-700">{error}</p>
              <Button
                className="mt-4"
                onClick={retryRegistrations}
                variant="secondary"
              >
                Retry
              </Button>
            </div>
          ) : registrations.length === 0 ? (
            <p className="p-6 text-ink-700">
              No registrations yet. New workshop registrations will appear here.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <caption className="px-5 py-4 text-left font-semibold text-ink-900">
                  {registrations.length}{' '}
                  {registrations.length === 1 ? 'registration' : 'registrations'}
                </caption>
                <thead className="bg-blush-50 text-ink-700">
                  <tr>
                    <th className="px-5 py-3 font-semibold" scope="col">
                      Name
                    </th>
                    <th className="px-5 py-3 font-semibold" scope="col">
                      Email
                    </th>
                    <th className="px-5 py-3 font-semibold" scope="col">
                      Phone
                    </th>
                    <th className="px-5 py-3 font-semibold" scope="col">
                      Workshop
                    </th>
                    <th className="px-5 py-3 font-semibold" scope="col">
                      Registered
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blush-100">
                  {registrations.map((registration) => (
                    <tr key={registration._id}>
                      <td className="px-5 py-4 font-medium text-ink-900">
                        {registration.name}
                      </td>
                      <td className="px-5 py-4 text-ink-700">
                        <a
                          className="underline decoration-blush-300 underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700"
                          href={`mailto:${registration.email}`}
                        >
                          {registration.email}
                        </a>
                      </td>
                      <td className="px-5 py-4 text-ink-700">
                        {registration.phone}
                      </td>
                      <td className="px-5 py-4 text-ink-700">
                        {registration.workshop?.title ||
                          'Workshop no longer available'}
                      </td>
                      <td className="px-5 py-4 text-ink-700">
                        {formatRegistrationDate(registration.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </Container>
    </section>
  )
}

export default AdminDashboard
