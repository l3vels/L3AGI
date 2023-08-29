import React from 'react'

import { ModalContext } from 'contexts'

const useModal = () => {
  const { openModal, closeModal } = React.useContext(ModalContext)

  return { openModal, closeModal }
}

export default useModal
