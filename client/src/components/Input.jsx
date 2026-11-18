import { forwardRef, useId } from 'react'

const Input = forwardRef(function Input(
  { label, error, description, id, className = '', ...props },
  ref,
) {
  const generatedId = useId()
  const inputId = id || generatedId
  const errorMessage = typeof error === 'string' ? error : error?.message
  const errorId = `${inputId}-error`
  const descriptionId = `${inputId}-description`
  const describedBy = [
    description ? descriptionId : null,
    errorMessage ? errorId : null,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="w-full">
      {label && (
        <label
          className="mb-1.5 block text-sm font-semibold text-ink-700"
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(errorMessage)}
        aria-describedby={describedBy || undefined}
        className={`min-h-12 w-full rounded-xl border bg-white px-4 py-3 text-base text-ink outline-none transition focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
          errorMessage
            ? 'border-brand-600'
            : 'border-blush-300 hover:border-brand-300'
        } ${className}`}
        {...props}
      />
      {description && (
        <p className="mt-1.5 text-sm leading-5 text-ink-700" id={descriptionId}>
          {description}
        </p>
      )}
      {errorMessage && (
        <p className="mt-1.5 text-sm text-brand-800" id={errorId}>
          {errorMessage}
        </p>
      )}
    </div>
  )
})

export default Input
