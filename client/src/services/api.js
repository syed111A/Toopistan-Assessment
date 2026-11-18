import axios from 'axios'

const apiBaseUrl =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const apiUrl = new URL(apiBaseUrl)
const isLoopbackHost = (hostname) =>
  hostname === 'localhost' || hostname === '127.0.0.1'

if (
  import.meta.env.DEV &&
  isLoopbackHost(apiUrl.hostname) &&
  !isLoopbackHost(window.location.hostname)
) {
  apiUrl.hostname = window.location.hostname
}

const api = axios.create({
  baseURL: apiUrl.toString().replace(/\/$/, ''),
  headers: {
    'Content-Type': 'application/json',
  },
})

function getErrorMessage(error, fallbackMessage) {
  const serverMessage = error?.response?.data?.message
  const requestUrl = error?.config?.url || ''
  const status = error?.response?.status

  if (
    status === 401 &&
    requestUrl.startsWith('/admin/') &&
    requestUrl !== '/admin/login'
  ) {
    return 'Your admin session has expired. Please sign in again.'
  }

  if (status === 400 && requestUrl === '/registrations') {
    return 'Please check your registration details and try again.'
  }

  if (status === 409 && requestUrl === '/registrations') {
    if (typeof serverMessage === 'string' && /sold out|seats remaining/i.test(serverMessage)) {
      return 'This workshop is sold out. Please choose another workshop.'
    }
  }

  if (typeof serverMessage === 'string' && serverMessage.trim()) {
    return serverMessage
  }

  if (axios.isAxiosError(error) && !error.response) {
    return 'The server is unavailable. Please check your connection and try again.'
  }

  return fallbackMessage
}

async function getResponseData(request, fallbackMessage) {
  try {
    const response = await request
    return response.data?.data ?? response.data
  } catch (error) {
    throw new Error(getErrorMessage(error, fallbackMessage), { cause: error })
  }
}

export async function getWorkshops({ signal } = {}) {
  const workshops = await getResponseData(
    api.get('/workshops', { signal }),
    'We could not load workshops. Please try again.',
  )

  if (!Array.isArray(workshops)) {
    throw new Error('The server returned an invalid workshop list.')
  }

  return workshops
}

export async function getWorkshop(id) {
  return getResponseData(
    api.get(`/workshops/${encodeURIComponent(id)}`),
    'We could not load this workshop. Please try again.',
  )
}

export async function registerForWorkshop(registration) {
  return getResponseData(
    api.post('/registrations', registration),
    'We could not complete your registration. Please try again.',
  )
}

export async function adminLogin(email, password) {
  const result = await getResponseData(
    api.post('/admin/login', { email, password }),
    'We could not sign in. Please try again.',
  )

  if (typeof result?.token !== 'string' || !result.token) {
    throw new Error('The server returned an invalid sign-in response.')
  }

  return result.token
}

export async function getRegistrations(token, { signal } = {}) {
  if (!token) {
    throw new Error('Your admin session has expired. Please sign in again.')
  }

  const registrations = await getResponseData(
    api.get('/admin/registrations', {
      signal,
      headers: { Authorization: `Bearer ${token}` },
    }),
    'We could not load registrations. Please try again.',
  )

  if (!Array.isArray(registrations)) {
    throw new Error('The server returned an invalid registrations list.')
  }

  return registrations
}

export default api
