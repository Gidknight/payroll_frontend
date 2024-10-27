import { useEffect, useState } from 'react'

const useStore = ({ store }) => {
  const result = store(callback)
  const [data, setData] = useState()

  useEffect(() => {
    setData(result)
  }, [result])

  return data
}

export default useStore
