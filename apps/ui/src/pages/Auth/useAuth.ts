/* eslint-disable getter-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import qs from 'qs'
import { useLocation } from 'react-router-dom'

const useAuthVerify = () => {
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  useEffect(() => {
    const search: any = qs.parse(location.search.replace('?', ''))
    if (!Object.keys(search).length) return
    ;(async () => {
      if (search.result === 'success') {
        setLoading(false)
        window.location.href = '/dashboard'
      } else {
        window.location.href = '/'
      }
    })()
  }, [location.search])

  return { loading }
}

export default useAuthVerify
