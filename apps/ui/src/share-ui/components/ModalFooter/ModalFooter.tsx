import React, { FC, ReactElement } from 'react'
import cx from 'classnames'
import L3ComponentProps from '../../types/L3ComponentProps'

interface ModalFooterProps extends L3ComponentProps {
  children: ReactElement | ReactElement[] | string
}

const ModalFooter: FC<ModalFooterProps> = ({ className, children }) => {
  return <div>{children}</div>
}

Object.assign(ModalFooter, {
  displayName: 'ModalFooter',
})

export default ModalFooter
