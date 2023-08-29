import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const useCheckRoute = (routeName: string) => {
  const { pathname } = useLocation()
  const [path, setPath] = useState<string[]>([])

  const isCheckedRoute = path.includes(routeName)

  useEffect(() => {
    const pathArr = pathname ? pathname.split('/') : []
    setPath(pathArr)
  }, [pathname])

  return {
    isCheckedRoute,
  }
}

export default useCheckRoute
