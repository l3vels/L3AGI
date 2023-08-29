import React from 'react'
import set from 'lodash/fp/set'
import unset from 'lodash/fp/unset'

import { ModalContext } from 'contexts'

const ModalsProvider = ({ children }: any) => {
  const [modals, updateModals] = React.useState<any>({})

  const openModal = ({ name, data }: { name: string; data?: any }) => {
    updateModals(set(name, data || {}))
  }

  const closeModal = (name: string) => {
    updateModals(unset(name))
  }

  const contextValue = {
    modals,
    openModal,
    closeModal,
  }

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>
}

export default ModalsProvider
