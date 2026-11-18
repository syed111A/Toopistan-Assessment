import { forwardRef, useId } from 'react'

const Select = forwardRef(function Select(
  { label, error, id, className = '', children, ...props },
  ref,
) {
  const generatedId = useId()
  const selectId = id || generatedId
  const errorMessage = typeof error === 'string' ? error : error?.message
  const errorId = `${selectId}-error`

  return (
    <div className="w-full">
      {label && (
        <label
          className="mb-1.5 block text-sm font-semibold text-ink-700"
          htmlFor={selectId}
        >
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        aria-invalid={Boolean(errorMessage)}
        aria-describedby={errorMessage ? errorId : undefined}
        className={`min-h-12 w-full rounded-xl border bg-white px-4 py-3 text-base text-ink outline-none transition focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
          errorMessage
            ? 'border-brand-600'
            : 'border-blush-300 hover:border-brand-300'
        } ${className}`}
        {...props}
      >
        {children}
      </select>
      {errorMessage && (
        <p className="mt-1.5 text-sm text-brand-800" id={errorId}>
          {errorMessage}
        </p>
      )}
    </div>
  )
})

export default Select
