import React, { FC } from 'react'
import cx from 'classnames'
import { backwardCompatibilityForProperties } from '../../../helpers/backwardCompatibilityForProperties'
import { MenuTitleCaptionPosition, MenuTitleSize } from './MenuTitleConstants'
import { L3ComponentProps } from '../../../types'

// import Avatar from "../../Avatar/Avatar";
// import EditableHeading from "../../EditableHeading/EditableHeading";

interface MenuTitleProps extends L3ComponentProps {
  /** Backward compatibility for props naming **/
  children?: React.ReactNode
  classname?: string
  caption?: string
  captionPosition?: MenuTitleCaptionPosition
  size?: MenuTitleSize
  iconName?: string
  titleEditable?: boolean
  collapsed?: boolean
  imageSrc?: string
  onImageClick?: (event: React.MouseEvent | React.KeyboardEvent, avatarId: string) => void
}

const MenuTitle: FC<MenuTitleProps> & {
  children?: React.ReactNode
  positions?: typeof MenuTitleCaptionPosition
  captionPositions?: typeof MenuTitleCaptionPosition
  isMenuChild?: boolean
  size?: typeof MenuTitleSize
  iconName?: string
  titleEditable?: boolean
  imageSrc?: string
  onImageClick?: (event: React.MouseEvent | React.KeyboardEvent, avatarId: string) => void
} = ({
  children,
  className,
  // Backward compatibility for props naming
  classname,
  caption = '',
  captionPosition = MenuTitle.positions.BOTTOM,
  id,
  size = MenuTitleSize.LARGE,
  titleEditable = false,
  collapsed = false,
  imageSrc,
  onImageClick,
}) => {
  const overrideClassName = backwardCompatibilityForProperties([className, classname])
  const menutitleSizeClassName =
    size === 'sm'
      ? 'menu-title-size__sm'
      : size === 'md'
      ? `menu-title-size__md`
      : size === 'lg'
      ? `menu-title-size__lg`
      : size === 'bg'
      ? `menu-title-size__bg`
      : ''

  const renderTitlteIconIfNeeded = () => {
    return (
      <div className='polygon-main-container'>
        {/* <Avatar size={Avatar.sizes.MEDIUM} src={imageSrc} type={Avatar.types.IMG} onClick={onImageClick} rectangle /> */}
      </div>
    )
  }

  const renderCaptionIfNeeded = () => {
    if (caption) {
      // if (titleEditable) {
      //   return <EditableHeading type={EditableHeading.types.h2} value="H2 Header" highlightTerm="head" />;
      // }
      if (!titleEditable) {
        return (
          <>
            {!collapsed && (
              <label
                className={`l3-style-menu-title__caption l3-style-menu-title__caption--${captionPosition} ${menutitleSizeClassName}`}
                id={id}
                contentEditable={true}
              >
                {caption}
              </label>
            )}
          </>
        )
      }
      if (titleEditable) {
        return (
          <>
            {!collapsed && (
              <label
                className={`l3-style-menu-title__caption l3-style-menu-title__caption--${captionPosition} ${menutitleSizeClassName}`}
                id={id}
              >
                {caption}
              </label>
            )}
          </>
        )
      }
    }
  }

  return (
    <div className={cx('l3-style-menu-title', overrideClassName)}>
      {renderTitlteIconIfNeeded()}
      {children ? children : renderCaptionIfNeeded()}
    </div>
  )
}

Object.assign(MenuTitle, {
  positions: MenuTitleCaptionPosition,
  captionPositions: MenuTitleCaptionPosition,
  isMenuChild: true,
})

export default MenuTitle
