import { useEffect } from 'react'

const defaultDescription =
  'TOOP: The Order of Pen — creative workshops for learning, writing, and making together.'

function usePageTitle(title, description = defaultDescription) {
  useEffect(() => {
    document.title = title

    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.append(metaDescription)
    }

    metaDescription.content = description
  }, [description, title])
}

export default usePageTitle
