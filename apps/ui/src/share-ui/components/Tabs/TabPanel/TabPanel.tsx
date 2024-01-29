import React, { FC, forwardRef, useRef } from 'react'
import cx from 'classnames'
import useMergeRefs from '../../../hooks/useMergeRefs'
import L3ComponentProps from '../../../types/L3ComponentProps'
import styled from 'styled-components'

export interface TabPanelProps extends L3ComponentProps {
  children?: React.ReactNode
  index?: number
}

// eslint-disable-next-line react/display-name
const TabPanel: FC<TabPanelProps> = forwardRef(({ className, id, children, index }, ref) => {
  const componentRef = useRef(null)
  const mergedRef = useMergeRefs({ refs: [ref, componentRef] })

  return (
    <StyledRoot
      key={`${id}_${index}`}
      ref={mergedRef}
      className={cx('tab-panel--wrapper', className)}
      id={id}
      role='tabpanel'
    >
      {children}
    </StyledRoot>
  )
})

export default TabPanel

const StyledRoot = styled.div`
  height: 100%;
  width: 100%;
`
