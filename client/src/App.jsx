import { MotionConfig } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Layout from './components/Layout.jsx'
import Navbar from './components/Navbar.jsx'
import { ToastProvider } from './components/Toast.jsx'

const AdminDashboard = lazy(() => import('./pages/AdminDashboard.jsx'))
const AdminLogin = lazy(() => import('./pages/AdminLogin.jsx'))
const Home = lazy(() => import('./pages/Home.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))
const Register = lazy(() => import('./pages/Register.jsx'))
const Styleguide = lazy(() => import('./pages/Styleguide.jsx'))
const Workshops = lazy(() => import('./pages/Workshops.jsx'))

function PageLoading() {
  return (
    <div
      aria-live="polite"
      className="flex min-h-[40vh] items-center justify-center text-sm text-ink-700"
      role="status"
    >
      Loading page...
    </div>
  )
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout navbar={<Navbar />} footer={<Footer />} />}>
              <Route
                index
                element={
                  <Suspense fallback={<PageLoading />}>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path="workshops"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <Workshops />
                  </Suspense>
                }
              />
              <Route
                path="register"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <Register />
                  </Suspense>
                }
              />
              <Route
                path="admin/login"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <AdminLogin />
                  </Suspense>
                }
              />
              <Route
                path="admin"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <AdminDashboard />
                  </Suspense>
                }
              />
              <Route
                path="styleguide"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <Styleguide />
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <NotFound />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </MotionConfig>
  )
}

export default App
