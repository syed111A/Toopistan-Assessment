import Button from '../components/Button.jsx'
import Container from '../components/Container.jsx'
import { SkeletonCard } from '../components/Loader.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import WorkshopCard from '../components/WorkshopCard.jsx'
import usePageTitle from '../hooks/usePageTitle.js'
import useWorkshops from '../hooks/useWorkshops.js'

function Workshops() {
  const { workshops, isLoading, error, retry } = useWorkshops()

  usePageTitle(
    'Workshops | TOOP',
    'Browse upcoming creative and technical workshops from TOOP.',
  )

  return (
    <section className="py-14 sm:py-18">
      <Container>
        <SectionHeading
          as="h1"
          description="Explore upcoming gatherings for curious minds and creative hands."
          eyebrow="Find your next idea"
          title="Upcoming workshops"
        />

        {isLoading ? (
          <div
            aria-label="Loading workshops"
            className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            role="status"
          >
            {Array.from({ length: 6 }, (_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : error ? (
          <div
            className="mt-9 rounded-card border border-brand-200 bg-blush-50 p-6 sm:p-8"
            role="alert"
          >
            <h2 className="font-heading text-2xl font-semibold text-ink">
              Workshops could not be loaded
            </h2>
            <p className="mt-2 text-ink-700">{error}</p>
            <Button className="mt-5" onClick={retry} variant="secondary">
              Retry
            </Button>
          </div>
        ) : workshops.length > 0 ? (
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {workshops.map((workshop, index) => (
              <WorkshopCard
                index={index}
                key={workshop._id || workshop.id}
                workshop={workshop}
              />
            ))}
          </div>
        ) : (
          <div className="mt-9 rounded-card border border-blush-200 bg-white px-6 py-12 text-center shadow-soft">
            <h2 className="font-heading text-2xl font-semibold text-ink">
              Nothing on the calendar yet
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-ink-700">
              We do not have any upcoming workshops at the moment. Please come back soon.
            </p>
          </div>
        )}
      </Container>
    </section>
  )
}

export default Workshops
