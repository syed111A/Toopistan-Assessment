function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`rounded-card border border-blush-200 bg-white p-5 shadow-soft transition duration-200 hover:shadow-lg motion-safe:hover:-translate-y-1 motion-reduce:transition-none ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
