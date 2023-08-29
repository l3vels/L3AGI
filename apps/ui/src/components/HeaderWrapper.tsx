import { useEffect, useState } from 'react'

const HeaderWrapper = ({ children }: any) => {
  const [is_scroll, set_is_scroll] = useState(false)

  useEffect(() => {
    document.getElementById('main_container')?.addEventListener('scroll', (e: any) => {
      const scrollPosition = e.target.scrollTop
      if (scrollPosition > 0) {
        set_is_scroll(true)
      } else {
        set_is_scroll(false)
      }
    })
  }, [])

  return (
    <div className={is_scroll ? 'header_wrapper header_is_visible' : 'header_wrapper'}>
      {children}
    </div>
  )
}

export default HeaderWrapper
