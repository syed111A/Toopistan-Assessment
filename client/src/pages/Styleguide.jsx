import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import Container from '../components/Container.jsx'
import Input from '../components/Input.jsx'
import Loader, { SkeletonCard } from '../components/Loader.jsx'
import PenNib from '../components/PenNib.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Select from '../components/Select.jsx'
import useToast from '../components/useToast.js'
import usePageTitle from '../hooks/usePageTitle.js'

const colors = [
  { name: 'brand-100', className: 'bg-brand-100' },
  { name: 'brand-300', className: 'bg-brand-300' },
  { name: 'brand-500', className: 'bg-brand-500' },
  { name: 'brand-700', className: 'bg-brand-700' },
  { name: 'brand-900', className: 'bg-brand-900' },
  { name: 'blush-100', className: 'bg-blush-100' },
  { name: 'blush-200', className: 'bg-blush-200' },
  { name: 'ink', className: 'bg-ink' },
  { name: 'paper', className: 'bg-paper' },
]

function Styleguide() {
  const { showToast } = useToast()

  usePageTitle(
    'Style guide | TOOP',
    'Preview the TOOP brand colors, typography, and shared interface components.',
  )

  return (
    <div className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          as="h1"
          description="A temporary showcase of the brand colors, typography, and shared UI components."
          eyebrow="Design system"
          title="TOOP style guide"
        />

        <section aria-labelledby="brand-heading" className="mt-12">
          <h2 className="font-heading text-2xl font-semibold" id="brand-heading">
            Brand
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {colors.map((color) => (
              <div
                className={`flex min-h-24 items-end rounded-card border border-blush-200 p-3 ${color.className}`}
                key={color.name}
              >
                <span className="rounded bg-white/90 px-2 py-1 text-xs font-semibold text-ink-900">
                  {color.name}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 rounded-card bg-blush-50 p-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-white">
              <PenNib className="h-8 w-8" />
            </span>
            <div>
              <p className="font-heading text-2xl font-bold">TOOP</p>
              <p className="text-sm text-ink-700">The Order of Pen</p>
              <p className="font-heading text-sm italic text-brand-800">
                Ars longa, vita brevis
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="type-heading" className="mt-12">
          <h2 className="font-heading text-2xl font-semibold" id="type-heading">
            Typography
          </h2>
          <div className="mt-5 space-y-3 rounded-card border border-blush-200 bg-white p-5 shadow-soft">
            <p className="font-heading text-4xl font-semibold">Playfair Display</p>
            <p className="text-lg">Inter — clean, readable interface text.</p>
            <p className="text-sm text-ink-700">
              Body copy uses a comfortable line height and strong contrast.
            </p>
          </div>
        </section>

        <section aria-labelledby="buttons-heading" className="mt-12">
          <h2 className="font-heading text-2xl font-semibold" id="buttons-heading">
            Buttons
          </h2>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button loading>Loading</Button>
            <Button disabled variant="secondary">Disabled</Button>
          </div>
        </section>

        <section aria-labelledby="form-heading" className="mt-12">
          <h2 className="font-heading text-2xl font-semibold" id="form-heading">
            Form fields
          </h2>
          <div className="mt-5 grid max-w-2xl gap-5 rounded-card border border-blush-200 bg-white p-5 shadow-soft sm:grid-cols-2">
            <Input label="Your name" placeholder="Alex Writer" />
            <Input
              error="Please enter a valid email address."
              label="Email with error"
              placeholder="you@example.com"
              type="email"
            />
            <Select defaultValue="" label="Choose a workshop">
              <option disabled value="">Select a workshop</option>
              <option value="writing">Creative writing</option>
              <option value="poetry">Poetry &amp; spoken word</option>
            </Select>
            <Select
              error="Please select a category."
              label="Category with error"
              defaultValue=""
            >
              <option disabled value="">Choose one</option>
              <option value="creative">Creative</option>
              <option value="technical">Technical</option>
            </Select>
          </div>
        </section>

        <section aria-labelledby="feedback-heading" className="mt-12">
          <h2 className="font-heading text-2xl font-semibold" id="feedback-heading">
            Feedback
          </h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button onClick={() => showToast('Your changes have been saved.')}>
              Show success toast
            </Button>
            <Button
              onClick={() => showToast('Something needs your attention.', 'error')}
              variant="secondary"
            >
              Show error toast
            </Button>
          </div>
        </section>

        <section aria-labelledby="loading-heading" className="mt-12">
          <h2 className="font-heading text-2xl font-semibold" id="loading-heading">
            Loading states
          </h2>
          <div className="mt-5 flex items-center gap-3 rounded-card border border-blush-200 bg-white p-5 shadow-soft">
            <Loader />
            <span className="text-sm text-ink-700">Loading content</span>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </section>

        <section aria-labelledby="card-heading" className="mt-12">
          <h2 className="font-heading text-2xl font-semibold" id="card-heading">
            Card and section heading
          </h2>
          <Card className="mt-5 max-w-xl">
            <SectionHeading
              description="Use a clear heading and a concise supporting sentence."
              eyebrow="Reusable helper"
              title="Ideas take shape here."
            />
          </Card>
        </section>
      </Container>
    </div>
  )
}

export default Styleguide
