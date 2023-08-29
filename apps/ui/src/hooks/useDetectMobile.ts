import React from 'react'

import useViewport from './useViewport'
import useModal from './useModal'

const useDetectMobile = () => {
  const { width } = useViewport()
  const { openModal } = useModal()

  React.useEffect(() => {
    if (width > 800) return
    openModal({ name: 'mobile-alert' })
  }, [openModal, width])
}

export default useDetectMobile
