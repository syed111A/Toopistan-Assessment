import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import Container from '../components/Container.jsx'
import PenNib from '../components/PenNib.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { SkeletonCard } from '../components/Loader.jsx'
import WorkshopCard from '../components/WorkshopCard.jsx'
import usePageTitle from '../hooks/usePageTitle.js'
import useWorkshops from '../hooks/useWorkshops.js'

const steps = [
  {
    number: '01',
    title: 'Browse',
    description: 'Find a workshop that sparks your curiosity.',
  },
  {
    number: '02',
    title: 'Register',
    description: 'Save your seat in a few simple steps.',
  },
  {
    number: '03',
    title: 'Create',
    description: 'Meet, learn, and make something meaningful.',
  },
]

function Home() {
  const shouldReduceMotion = useReducedMotion()
  const { workshops, isLoading, error, retry } = useWorkshops()
  const featuredWorkshops = workshops.slice(0, 3)

  usePageTitle(
    'TOOP: The Order of Pen',
    'Explore creative and technical workshops at TOOP: The Order of Pen.',
  )

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-blush-100 via-paper to-brand-100">
        <Container className="relative grid min-h-[32rem] items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.15fr_.85fr] lg:py-24">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
          >
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-paper/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-800">
              <PenNib className="h-4 w-4" />
              TOOP: The Order of Pen
            </p>
            <h1 className="max-w-3xl font-heading text-4xl font-semibold leading-tight text-ink sm:text-5xl lg:text-6xl">
              Make space for the words that matter.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-ink-700 sm:text-lg">
              Find your people, try a new craft, and bring your next idea to life
              at a TOOP workshop.
            </p>
            <p className="mt-3 font-heading text-base italic text-brand-800">
              Ars longa, vita brevis
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button as={Link} to="/workshops">
                Explore Workshops
              </Button>
              <Button as={Link} to="/register" variant="secondary">
                Register Now
              </Button>
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto w-full max-w-md lg:max-w-none"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.12,
              duration: shouldReduceMotion ? 0 : 0.35,
            }}
          >
            <div className="relative mx-auto aspect-[4/3] w-full max-w-lg">
              <div
                aria-hidden="true"
                className="absolute inset-5 rounded-full bg-brand-300/30 blur-3xl"
              />
              <figure className="absolute inset-y-[9%] right-[4%] w-[76%] overflow-hidden rounded-card border-4 border-white/80 shadow-soft">
                <img
                  alt="A workshop leader presenting to a room of participants"
                  className="h-full w-full object-cover"
                  src="/images/workshop-hero.jpg"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-br from-brand-500/15 via-transparent to-blush-200/30"
                />
              </figure>
              <figure className="absolute bottom-[2%] left-[1%] z-10 h-[43%] w-[45%] overflow-hidden rounded-3xl border-4 border-white shadow-soft">
                <img
                  alt="Writers sharing ideas during a creative writing session"
                  className="h-full w-full object-cover"
                  src="/images/creative-writing.jpg"
                />
              </figure>
              <figure className="absolute right-0 top-[1%] z-10 h-[36%] w-[36%] overflow-hidden rounded-3xl border-4 border-white shadow-soft">
                <img
                  alt="Workshop participants collaborating around a table"
                  className="h-full w-full object-cover"
                  src="/images/poetry-spoken-word.jpg"
                />
              </figure>
              <figcaption className="absolute bottom-0 right-[4%] z-20 flex items-center gap-2 rounded-full bg-paper px-4 py-2 text-sm font-semibold text-ink shadow-soft">
                <PenNib aria-hidden="true" className="h-5 w-5 text-brand-700" />
                Learn together. Make something lasting.
              </figcaption>
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              description="A few upcoming ways to make, learn, and connect."
              eyebrow="Coming up"
              title="Featured workshops"
            />
            <Button as={Link} className="self-start sm:self-auto" to="/workshops" variant="ghost">
              View all workshops
            </Button>
          </div>

          {isLoading ? (
            <div
              aria-label="Loading featured workshops"
              className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              role="status"
            >
              {Array.from({ length: 3 }, (_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : error ? (
            <div
              className="mt-8 rounded-card border border-brand-200 bg-blush-50 p-6"
              role="alert"
            >
              <p className="text-ink-700">{error}</p>
              <Button className="mt-4" onClick={retry} variant="secondary">
                Retry
              </Button>
            </div>
          ) : featuredWorkshops.length > 0 ? (
            <motion.div
              className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07 } },
              }}
            >
              {featuredWorkshops.map((workshop, index) => (
                <WorkshopCard
                  compact
                  index={index}
                  key={workshop._id || workshop.id}
                  workshop={workshop}
                />
              ))}
            </motion.div>
          ) : (
            <p className="mt-8 rounded-card border border-blush-200 bg-paper p-6 text-ink-700">
              There are no upcoming workshops just yet. Please check back soon.
            </p>
          )}
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            description="A welcoming path from first thought to finished work."
            eyebrow="A simple beginning"
            title="How it works"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {steps.map((step) => (
              <Card className="h-full" key={step.number}>
                <p className="font-heading text-3xl font-semibold text-brand-600">
                  {step.number}
                </p>
                <h3 className="mt-4 font-heading text-2xl font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-700">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-18">
        <Container>
          <SectionHeading
            description="A glimpse of the people, ideas, and moments that make a workshop."
            eyebrow="A little inspiration"
            title="Good things happen around the table"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <figure className="overflow-hidden rounded-card shadow-soft">
              <img
                alt="A writing session in progress"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
                src="/images/creative-writing.jpg"
              />
              <figcaption className="bg-paper px-4 py-3 font-semibold text-ink">
                Words taking shape
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-card shadow-soft">
              <img
                alt="Participants sketching and discussing design ideas"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
                src="/images/ui-ux-design.jpg"
              />
              <figcaption className="bg-paper px-4 py-3 font-semibold text-ink">
                New ideas taking form
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-card shadow-soft">
              <img
                alt="A small group listening and sharing stories together"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
                src="/images/poetry-spoken-word.jpg"
              />
              <figcaption className="bg-paper px-4 py-3 font-semibold text-ink">
                Stories shared aloud
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <Container className="rounded-card bg-gradient-to-r from-brand-700 to-brand-500 px-6 py-10 text-white shadow-soft sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">
              Your next idea starts here
            </p>
            <h2 className="mt-3 max-w-2xl font-heading text-3xl font-semibold sm:text-4xl">
              Come make something with us.
            </h2>
          </div>
          <Button
            as={Link}
            className="mt-6 shrink-0 border-white bg-white text-brand-800 hover:bg-blush-50 lg:mt-0"
            to="/workshops"
            variant="secondary"
          >
            Find a workshop
          </Button>
        </Container>
      </section>
    </>
  )
}

export default Home
