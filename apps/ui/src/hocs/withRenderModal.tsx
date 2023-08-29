import React from 'react'
import get from 'lodash/fp/get'

import { ModalContext } from 'contexts'

type getModalNameType = string | ((params: any) => string)

const withRenderModal = (getModalName: getModalNameType) => (Modal: React.FC<any>) => {
  const Hoc = (props: any) => {
    const { modals, closeModal } = React.useContext(ModalContext)
    const modalName = typeof getModalName === 'function' ? getModalName(props) : getModalName

    const data = get(modalName, modals)

    if (!data) {
      return null
    }

    return (
      <Modal
        {...props}
        data={data}
        closeModal={() => closeModal(modalName)}
        modalName={modalName}
      />
    )
  }

  return Hoc
}

export default withRenderModal
