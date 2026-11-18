function Loader({ label = 'Loading', className = '' }) {
  return (
    <span
      aria-label={label}
      className={`inline-block h-5 w-5 rounded-full border-2 border-brand-500 border-r-transparent motion-safe:animate-spin ${className}`}
      role="status"
    />
  )
}

export function SkeletonCard() {
  return (
    <div
      aria-hidden="true"
      className="animate-pulse rounded-card border border-blush-200 bg-white p-5 shadow-soft motion-reduce:animate-none"
    >
      <div className="h-40 rounded-xl bg-blush-100" />
      <div className="mt-5 h-5 w-2/3 rounded bg-blush-100" />
      <div className="mt-3 h-4 rounded bg-blush-50" />
      <div className="mt-2 h-4 w-4/5 rounded bg-blush-50" />
      <div className="mt-5 h-11 w-32 rounded-full bg-blush-100" />
    </div>
  )
}

export default Loader
