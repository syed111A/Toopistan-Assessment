function SectionHeading({
  as: Heading = 'h2',
  eyebrow,
  title,
  description,
  className = '',
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
          {eyebrow}
        </p>
      )}
      <Heading className="font-heading text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        {title}
      </Heading>
      {description && (
        <p className="mt-3 text-base leading-7 text-ink-700">{description}</p>
      )}
    </div>
  )
}

export default SectionHeading
