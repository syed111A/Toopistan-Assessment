import { Component } from 'react'
import Button from './Button.jsx'
import Container from './Container.jsx'

class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center bg-paper py-16">
          <Container className="text-center">
            <section
              aria-live="assertive"
              className="mx-auto max-w-xl rounded-card border border-blush-200 bg-white p-8 shadow-soft"
              role="alert"
            >
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-800">
                A small setback
              </p>
              <h1 className="mt-3 font-heading text-3xl font-semibold text-ink">
                This page could not be displayed.
              </h1>
              <p className="mt-3 text-ink-700">
                Please reload the page to try again.
              </p>
              <Button
                className="mt-6"
                onClick={() => window.location.reload()}
              >
                Reload page
              </Button>
            </section>
          </Container>
        </main>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
