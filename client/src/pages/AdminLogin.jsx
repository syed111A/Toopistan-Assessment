import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import Container from '../components/Container.jsx'
import Input from '../components/Input.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import usePageTitle from '../hooks/usePageTitle.js'
import { adminLogin } from '../services/api.js'

function AdminLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(location.state?.message || '')
  const [isSubmitting, setIsSubmitting] = useState(false)

  usePageTitle(
    'Admin sign in | TOOP',
    'Secure sign in for TOOP workshop administrators.',
  )

  async function submitLogin(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const token = await adminLogin(email.trim().toLowerCase(), password)
      sessionStorage.setItem('toopAdminToken', token)
      navigate('/admin', { replace: true })
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-14 sm:py-18">
      <Container className="max-w-3xl">
        <SectionHeading
          as="h1"
          description="Sign in to review workshop registrations."
          eyebrow="For the TOOP team"
          title="Admin sign in"
        />
        <Card className="mx-auto mt-8 max-w-xl p-5 sm:p-7">
          <form className="space-y-5" noValidate onSubmit={submitLogin}>
            <Input
              autoComplete="username"
              label="Admin email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@example.com"
              required
              type="email"
              value={email}
            />
            <Input
              autoComplete="current-password"
              label="Password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your admin password"
              required
              type="password"
              value={password}
            />
            {error && (
              <p
                className="rounded-xl border border-brand-200 bg-blush-50 p-3 text-sm text-brand-800"
                role="alert"
              >
                {error}
              </p>
            )}
            <Button
              className="w-full"
              disabled={!email || !password}
              loading={isSubmitting}
              type="submit"
            >
              Sign In
            </Button>
          </form>
        </Card>
      </Container>
    </section>
  )
}

export default AdminLogin
