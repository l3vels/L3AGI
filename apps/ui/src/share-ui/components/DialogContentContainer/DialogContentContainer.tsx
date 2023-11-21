import React, { useRef, forwardRef } from 'react'
import cx from 'classnames'
import useMergeRefs from '../../hooks/useMergeRefs'
import { BEMClass as bemClass } from '../../helpers/bem-helper'

import { DialogSize, DialogType } from './DialogContentContainerConstants'
import { L3Component, L3ComponentProps } from 'share-ui/types'

interface DialogContentContainerProps extends L3ComponentProps {
  children?: React.ReactNode
  className?: string
  ariaLabelledby?: string
  ariaDescribedby?: string
  type?: DialogType
  size?: DialogSize
  style?: React.CSSProperties
}

const bemHelper = bemClass('dialog-content-container')

const DialogContentContainer: L3Component<DialogContentContainerProps> & {
  types?: typeof DialogType
  sizes?: typeof DialogSize
  // eslint-disable-next-line react/display-name
} = forwardRef(
  (
    {
      className = '',
      ariaLabelledby = '',
      ariaDescribedby = '',
      type = DialogType.POPOVER,
      size = DialogSize.MEDIUM,
      children,
      style,
    },
    ref,
  ) => {
    const componentRef = useRef(null)
    const mergedRef = useMergeRefs({ refs: [ref, componentRef] })

    return (
      <div
        role='dialog'
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        ref={mergedRef}
        style={style}
        className={cx(
          'dialog-content-container',
          className,
          bemHelper({ state: type }),
          bemHelper({ state: size }),
        )}
      >
        {children}
      </div>
    )
  },
)

Object.assign(DialogContentContainer, {
  types: DialogType,
  sizes: DialogSize,
})

export default DialogContentContainer
