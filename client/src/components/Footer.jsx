import { Link } from 'react-router-dom'
import Container from './Container.jsx'
import PenNib from './PenNib.jsx'

function Footer() {
  return (
    <footer className="mt-auto border-t border-blush-200 bg-white">
      <Container className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Link
            aria-label="TOOP home"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700"
            to="/"
          >
            <PenNib className="h-6 w-6 text-brand-600" />
            <span className="font-heading text-lg font-bold">TOOP</span>
          </Link>
          <p className="mt-2 text-sm text-ink-700">The Order of Pen</p>
          <p className="mt-1 font-heading text-sm italic text-brand-800">
            Ars longa, vita brevis
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-ink-900">
            Quick links
          </h2>
          <nav aria-label="Footer navigation" className="mt-2 flex flex-wrap gap-x-4">
            <Link className="flex min-h-11 items-center text-sm text-ink-700 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700" to="/">
              Home
            </Link>
            <Link className="flex min-h-11 items-center text-sm text-ink-700 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700" to="/workshops">
              Workshops
            </Link>
            <Link className="flex min-h-11 items-center text-sm text-ink-700 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700" to="/register">
              Register
            </Link>
          </nav>
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className="text-sm font-bold uppercase tracking-wide text-ink-900">
            For the team
          </h2>
          <Link
            className="mt-2 inline-flex min-h-11 items-center text-sm text-ink-700 underline decoration-blush-300 underline-offset-4 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700"
            to="/admin/login"
          >
            Admin
          </Link>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
