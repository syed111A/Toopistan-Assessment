import { useCallback, useEffect, useState } from 'react'
import { getWorkshops } from '../services/api.js'

function useWorkshops() {
  const [requestNumber, setRequestNumber] = useState(0)
  const [workshops, setWorkshops] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    let isCurrentRequest = true

    getWorkshops({ signal: controller.signal })
      .then((results) => {
        if (isCurrentRequest) {
          setWorkshops(results)
          setError('')
          setIsLoading(false)
        }
      })
      .catch((requestError) => {
        if (isCurrentRequest) {
          setError(requestError.message)
          setIsLoading(false)
        }
      })

    return () => {
      isCurrentRequest = false
      controller.abort()
    }
  }, [requestNumber])

  const retry = useCallback(() => {
    setError('')
    setIsLoading(true)
    setRequestNumber((currentNumber) => currentNumber + 1)
  }, [])

  return { workshops, isLoading, error, retry }
}

export default useWorkshops
