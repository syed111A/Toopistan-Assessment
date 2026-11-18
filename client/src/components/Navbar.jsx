import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Container from './Container.jsx'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Find Events', to: '/workshops' },
  { label: 'Register', to: '/register' },
  { label: 'Sign In', to: '/admin/login' },
]

function Navbar() {
  const [menuPath, setMenuPath] = useState(null)
  const [hasScrolled, setHasScrolled] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const location = useLocation()
  const menuOpen = menuPath === location.pathname

  useEffect(() => {
    function updateScrollState() {
      setHasScrolled(window.scrollY > 8)
    }

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  const linkClass = ({ isActive }, isSignIn) =>
    `flex min-h-11 items-center rounded-full px-4 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700 motion-reduce:transition-none ${
      isSignIn
        ? 'bg-brand-600 text-white hover:bg-brand-700'
        : isActive
          ? 'bg-blush-100 text-brand-800 hover:bg-blush-100'
          : 'text-ink-700 hover:bg-blush-100'
    }`

  return (
    <header
      className={`sticky top-0 z-50 border-b border-blush-200 transition-colors duration-200 motion-reduce:transition-none ${
        hasScrolled ? 'bg-paper/95 shadow-soft backdrop-blur-md' : 'bg-paper/85 backdrop-blur'
      }`}
    >
      <Container className="relative flex min-h-16 items-center justify-between gap-4">
        <Link
          aria-label="TOOP home"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700"
          onClick={() => setMenuPath(null)}
          to="/"
        >
          <img
            alt=""
            aria-hidden="true"
            className="h-11 w-11 rounded-xl object-cover"
            src="/images/toop-logo.jpg"
          />
          <span className="font-heading text-xl font-bold tracking-wide">TOOP</span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="ml-auto hidden items-center gap-1 md:flex"
        >
          {links.map((link) => (
            <NavLink
              className={(state) => linkClass(state, link.to === '/admin/login')}
              end={link.to === '/'}
              key={link.to}
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          aria-controls={menuOpen ? 'mobile-navigation' : undefined}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-blush-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-700 motion-reduce:transition-none md:hidden"
          onClick={() => setMenuPath(menuOpen ? null : location.pathname)}
          type="button"
        >
          <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
            <span className="h-0.5 w-full rounded-full bg-current" />
            <span className="h-0.5 w-full rounded-full bg-current" />
            <span className="h-0.5 w-full rounded-full bg-current" />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.nav
              animate={{ opacity: 1, y: 0 }}
              aria-label="Mobile navigation"
              className="absolute inset-x-0 top-full flex flex-col gap-1 border-b border-blush-200 bg-paper p-4 shadow-soft md:hidden"
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              id="mobile-navigation"
              initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
            >
              {links.map((link) => (
                <NavLink
                  className={(state) => linkClass(state, link.to === '/admin/login')}
                  end={link.to === '/'}
                  key={link.to}
                  onClick={() => setMenuPath(null)}
                  to={link.to}
                >
                  {link.label}
                </NavLink>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </Container>
    </header>
  )
}

export default Navbar
