import React from 'react'
import cx from 'classnames'
import { BEMClass as bemClass } from '../../../helpers/bem-helper'
import { SubIcon, L3ComponentProps } from '../../../types'
import Icon from '../../Icon/Icon'
import { ToastArtWorkSize, ToastArtWorkType } from '../ToastConstants'

const ARTWORK_CONTENT_CSS_BASE_CLASS = 'l3-style-artWork-content'
const bemHelper = bemClass(ARTWORK_CONTENT_CSS_BASE_CLASS)

export interface ArtWorkProps extends L3ComponentProps {
  src?: string
  size?: ToastArtWorkSize
  className?: string
  type?: ToastArtWorkType
  role?: string
  icon?: SubIcon
  ariaLabel?: string
}

export const ArtWork: React.FC<ArtWorkProps> & {
  types?: typeof ToastArtWorkType
  sizes?: ToastArtWorkSize
} = ({
  type = ToastArtWorkType.IMG,
  src,
  icon,
  ariaLabel,
  role,
  size = ToastArtWorkSize.SMALL,
}) => {
  const className = cx(bemHelper({ element: type }), bemHelper({ element: type, state: size }))
  switch (type) {
    case ToastArtWorkType.IMG:
      return (
        <img
          role={role}
          alt={ariaLabel}
          src={src}
          width='48px'
          height='48px'
          style={{ borderRadius: '2px' }}
          className={className}
        />
      )
    case ToastArtWorkType.ICON:
      return (
        <Icon
          icon={icon}
          aria-label={ariaLabel}
          clickable={false}
          className={className}
          ariaHidden={false}
        />
      )
    default:
      return null
  }
}

Object.assign(ArtWork, {
  types: ToastArtWorkType,
  sizes: ToastArtWorkSize,
})
