import React, { FC, ReactElement } from 'react'
import cx from 'classnames'
import L3ComponentProps from '../../types/L3ComponentProps'
// import classes from "./ModalContent.module.scss";

interface ModalContentProps extends L3ComponentProps {
  children: ReactElement | ReactElement[] | string
}

const ModalContent: FC<ModalContentProps> = ({ className, children }) => {
  return <div>{children}</div>
}

Object.assign(ModalContent, {
  displayName: 'ModalContent',
})

export default ModalContent
