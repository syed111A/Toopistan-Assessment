const variants = {
  primary:
    'bg-brand-600 text-white hover:bg-brand-700 focus-visible:outline-brand-700',
  secondary:
    'border border-brand-200 bg-blush-50 text-brand-800 hover:border-brand-400 hover:bg-blush-100 focus-visible:outline-brand-700',
  ghost:
    'bg-transparent text-ink-700 hover:bg-blush-50 focus-visible:outline-brand-700',
}

const sizes = {
  sm: 'min-h-11 px-4 text-sm',
  md: 'min-h-11 px-5 text-base',
  lg: 'min-h-12 px-6 text-base',
}

function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  children,
  type = 'button',
  ...props
}) {
  const isDisabled = disabled || loading
  const elementProps =
    Component === 'button'
      ? { type, disabled: isDisabled }
      : { 'aria-disabled': isDisabled || undefined }

  return (
    <Component
      {...props}
      {...elementProps}
      aria-busy={loading || undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transform-none motion-reduce:transition-none ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="h-4 w-4 rounded-full border-2 border-current border-r-transparent motion-safe:animate-spin"
        />
      )}
      {children}
    </Component>
  )
}

export default Button
