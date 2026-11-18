import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import Button from './Button.jsx'
import ToastContext from './ToastContext.js'

function Toast({ type, message, onDismiss }) {
  const isError = type === 'error'

  return (
    <div
      role={isError ? 'alert' : 'status'}
      className={`flex min-w-0 items-start gap-3 rounded-xl border bg-white p-4 shadow-soft ${
        isError ? 'border-brand-300' : 'border-green-200'
      }`}
    >
      <span
        aria-hidden="true"
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
          isError ? 'bg-brand-100 text-brand-800' : 'bg-green-100 text-green-800'
        }`}
      >
        {isError ? '!' : '✓'}
      </span>
      <p className="min-w-0 flex-1 text-sm leading-6 text-ink-900">{message}</p>
      <Button
        aria-label="Dismiss notification"
        className="min-h-11 min-w-11 px-3"
        onClick={onDismiss}
        variant="ghost"
      >
        ×
      </Button>
    </div>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef(new Map())

  const dismissToast = useCallback((id) => {
    clearTimeout(timers.current.get(id))
    timers.current.delete(id)
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (message, type = 'success') => {
      const id = `${Date.now()}-${Math.random()}`
      setToasts((currentToasts) => [...currentToasts, { id, message, type }])
      timers.current.set(id, setTimeout(() => dismissToast(id), 4000))
    },
    [dismissToast],
  )

  useEffect(
    () => () => {
      timers.current.forEach((timer) => clearTimeout(timer))
      timers.current.clear()
    },
    [],
  )

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-[60] ml-auto flex max-w-sm flex-col gap-3 sm:inset-x-auto sm:right-6"
      >
        {toasts.map((toast) => (
          <div className="pointer-events-auto" key={toast.id}>
            <Toast
              message={toast.message}
              onDismiss={() => dismissToast(toast.id)}
              type={toast.type}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
