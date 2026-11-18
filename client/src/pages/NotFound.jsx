import { useNavigate } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Container from '../components/Container.jsx'
import PenNib from '../components/PenNib.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

function NotFound() {
  const navigate = useNavigate()

  usePageTitle(
    'Page not found | TOOP',
    'The page you requested could not be found. Return to TOOP workshops.',
  )

  return (
    <section className="py-20 sm:py-22">
      <Container className="text-center">
        <PenNib className="mx-auto h-12 w-12 text-brand-600" />
        <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-brand-800">
          404 — page not found
        </p>
        <h1 className="mx-auto mt-3 max-w-xl font-heading text-4xl font-semibold text-ink sm:text-5xl">
          This page is still unwritten.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-ink-700">
          The page you are looking for does not exist.
        </p>
        <Button className="mt-7" onClick={() => navigate('/')} variant="primary">
          Return home
        </Button>
      </Container>
    </section>
  )
}

export default NotFound
