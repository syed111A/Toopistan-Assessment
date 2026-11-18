import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'

function Layout({ navbar, footer }) {
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink-900">
      {navbar}
      <main className="min-w-0 flex-1">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="min-w-0"
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
            key={location.pathname}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      {footer}
    </div>
  )
}

export default Layout
