function PenNib({ className = 'h-6 w-6', ...props }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        d="M19.2 4.8 9.4 8.1l-4.6 8.2 7.8-4.7 3.3-9.8a1 1 0 0 0-1.3-1.3Z"
        fill="currentColor"
        opacity=".18"
      />
      <path
        d="M19.2 4.8 9.4 8.1l-4.6 8.2 7.8-4.7 3.3-9.8a1 1 0 0 0-1.3-1.3ZM4.8 19.2l4.6-2.9M9.4 8.1l2.8 3.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  )
}

export default PenNib
