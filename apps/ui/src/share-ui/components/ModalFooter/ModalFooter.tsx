import React, { FC, ReactElement } from 'react'
import cx from 'classnames'
import L3ComponentProps from '../../types/L3ComponentProps'
import styled from 'styled-components'

interface ModalFooterProps extends L3ComponentProps {
  children: ReactElement | ReactElement[] | string
}

const ModalFooter: FC<ModalFooterProps> = ({ className, children }) => {
  return <StyledModalFooter>{children}</StyledModalFooter>
}

Object.assign(ModalFooter, {
  displayName: 'ModalFooter',
})

export default ModalFooter

const StyledModalFooter = styled.div`
  margin-top: 34px;
`
