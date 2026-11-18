import Container from '../components/Container.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

function PlaceholderPage({ title, description }) {
  usePageTitle(
    `${title} | TOOP`,
    description || `${title} page for TOOP: The Order of Pen.`,
  )

  return (
    <section className="py-16 sm:py-22">
      <Container>
        <SectionHeading
          as="h1"
          description="This page is a placeholder for a future step."
          eyebrow="TOOP: The Order of Pen"
          title={title}
        />
      </Container>
    </section>
  )
}

export default PlaceholderPage
