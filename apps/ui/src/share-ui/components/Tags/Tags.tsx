import React, { forwardRef, useCallback, useMemo, useRef } from 'react'
import cx from 'classnames'
import Icon from '../Icon/Icon'
import useMergeRefs from '../../hooks/useMergeRefs'
import CloseSmall from '../Icon/Icons/components/CloseSmall'

import { tagElementColorsNames, getTagElementColor } from '../../utils/colors-vars-map'
// import Avatar from "../Avatar/Avatar";
import IconButton from '../IconButton/IconButton'
import { getTestId } from '../../tests/test-ids-utils'
import { TagsSize, TagSizes } from './TagsConstants'
// import { AvatarType } from "../Avatar/AvatarConstants";
import { SubIcon, L3Component, L3ComponentProps } from '../../types'
import useHover from '../../hooks/useHover'
import ClickableWrapper from '../Clickable/ClickableWrapper'
import { ComponentDefaultTestId } from '../../tests/constants'

interface TagsProps extends L3ComponentProps {
  label?: string
  disabled?: boolean
  readOnly?: boolean
  dataTestId?: string
  /** Icon to place on the right */
  rightIcon?: SubIcon
  /** Icon to place on the left */
  leftIcon?: SubIcon
  /** Img to place as avatar on the right */
  rightAvatar?: string
  /** Img to place as avatar on the left */
  leftAvatar?: string
  // color?: Object.keys(Tags.colors),
  color?: keyof Record<string, string>
  /** size for font icon */
  iconSize?: number | string
  onDelete?: (id: string, event: React.MouseEvent<HTMLSpanElement>) => void
  /**
   * Disables the Tags's entry animation
   */
  noAnimation?: boolean
  /**
   * Allow user to select text
   */
  allowTextSelection?: boolean
  /**
   * Callback function to be called when the user clicks the component.
   */
  onMouseDown?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  /**
   * Callback function to be called when the user clicks the component.
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  /**
   * Applies when element has onClick or onMouseDown props
   */
  ariaLabel?: string
  /**
   * Should element be focusable & clickable - for backward compatability
   */
  isClickable?: boolean

  size?: TagSizes

  outlined?: boolean
}

const Tags: L3Component<TagsProps, HTMLElement> & {
  sizes?: typeof TagsSize
  colors?: typeof tagElementColorsNames
  // eslint-disable-next-line react/display-name
} = forwardRef<HTMLElement, TagsProps>(
  (
    {
      className,
      id,
      label = '',
      leftIcon = null,
      rightIcon = null,
      leftAvatar = null,
      rightAvatar = null,
      disabled = false,
      readOnly = false,
      allowTextSelection = false,
      color = tagElementColorsNames.gradient_blue,
      iconSize = 16,
      onDelete = (_id: string, _e: React.MouseEvent<HTMLSpanElement>) => {},
      onMouseDown,
      onClick,
      noAnimation = false,
      ariaLabel,
      isClickable = false,
      dataTestId,
      size = 'large',
      outlined = false,
    },
    ref,
  ) => {
    const overrideDataTestId = dataTestId || getTestId(ComponentDefaultTestId.TAG, id)
    const hasClickableWrapper = isClickable && (!!onClick || !!onMouseDown)
    const hasCloseButton = !readOnly && !disabled

    const [hoverRef, isHovered] = useHover()
    const iconButtonRef = useRef(null)
    const componentRef = useRef(null)
    const mergedRef = useMergeRefs({ refs: [ref, componentRef, hoverRef] })

    const backgroundColorStyle = useMemo(() => {
      let cssVar
      if (disabled) {
        // cssVar = getCSSVar("disabled-background-color");
      } else if (isHovered && hasClickableWrapper) {
        cssVar = getTagElementColor(color, true, true)
      } else if (outlined) {
        cssVar = getTagElementColor(color, true)
      } else {
        cssVar = getTagElementColor(color, true)
      }

      return outlined
        ? {
            '--outline-border-color-var': cssVar,
          }
        : { background: cssVar }
    }, [disabled, isHovered, hasClickableWrapper, color, outlined])

    const onDeleteCallback = useCallback(
      (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation()
        if (onDelete && id) {
          onDelete(id, e)
        }
      },
      [id, onDelete],
    )

    const onClickCallback = useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if ((e.target as HTMLElement) !== iconButtonRef.current && onClick) {
          e.preventDefault()
          onClick(e)
        }
      },
      [onClick],
    )

    return (
      <div
        className={cx(styles.tagsWrapper, className, {
          [styles.sizeSmall]: size === 'small',
          [styles.outlined]: outlined,
        })}
      >
        <ClickableWrapper
          isClickable={hasClickableWrapper}
          clickableProps={{
            onClick: onClickCallback,
            onMouseDown,
            disabled,
            ariaLabel: ariaLabel || label,
            className: styles.clickableWrapper,
          }}
        >
          <div
            ref={mergedRef}
            className={cx(styles.tags, 'tags--wrapper', className, {
              [styles.disabled]: disabled,
              [styles.withClose]: hasCloseButton,
              [styles.noAnimation]: noAnimation,
              [styles.withUserSelect]: allowTextSelection,
            })}
            id={id}
            style={backgroundColorStyle}
            data-testid={overrideDataTestId}
          >
            {/* {leftAvatar ? (
              <Avatar
                withoutBorder
                className={cx(styles.avatar, styles.left)}
                customSize={18}
                src={leftAvatar}
                type={AvatarType.IMG}
                key={id}
              />
            ) : null} */}
            {leftIcon ? (
              <Icon
                className={cx(styles.icon, styles.left)}
                iconType={Icon.type?.ICON_FONT}
                clickable={false}
                icon={leftIcon}
                iconSize={iconSize}
                ignoreFocusStyle
              />
            ) : null}
            <div className={cx(styles.label, { [styles.white]: color === 'white' })}>{label}</div>
            {rightIcon ? (
              <Icon
                className={cx(styles.icon, styles.right)}
                iconType={Icon.type?.ICON_FONT}
                clickable={false}
                icon={rightIcon}
                iconSize={iconSize}
                ignoreFocusStyle
              />
            ) : null}
            {/* {rightAvatar ? (
              <Avatar
                withoutBorder
                className={cx(styles.avatar, styles.right)}
                customSize={16}
                src={rightAvatar}
                type={AvatarType.IMG}
                key={id}
              />
            ) : null} */}
            {hasCloseButton && (
              <div className={cx(styles.icon, styles.close)}>
                <IconButton
                  size={TagsSize.XXS}
                  color={IconButton.colors?.ON_PRIMARY_COLOR}
                  ariaLabel='Remove'
                  hideTooltip
                  icon={() => (
                    <div className={cx(styles.close, { [styles.closeOutlined]: outlined })}>
                      <CloseSmall />
                    </div>
                  )}
                  onClick={onDeleteCallback}
                  dataTestId={`${overrideDataTestId}-close`}
                  ref={iconButtonRef}
                  kind={IconButton.kinds?.TERTIARY}
                />
              </div>
            )}
          </div>
        </ClickableWrapper>
      </div>
    )
  },
)

Object.assign(Tags, {
  sizes: TagsSize,
  defaultTestId: ComponentDefaultTestId.TAG,
  colors: tagElementColorsNames,
})

export default Tags
