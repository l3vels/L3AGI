import React, { ReactNode, forwardRef, useCallback, useMemo, useRef } from 'react'
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
import styled, { css } from 'styled-components'

interface TagsProps extends L3ComponentProps {
  label?: string | ReactNode
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
  onMouseDown?: (event: React.MouseEvent) => void
  /**
   * Callback function to be called when the user clicks the component.
   */
  onClick?: (event: React.MouseEvent) => void
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
  sizes?: typeof TagSizes
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
      onDelete = (_id: string, _e: React.MouseEvent) => {},
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
      (e: React.MouseEvent) => {
        e.stopPropagation()
        if (onDelete && id) {
          onDelete(id, e)
        }
      },
      [id, onDelete],
    )

    const onClickCallback = useCallback(
      (e: React.MouseEvent) => {
        if ((e.target as HTMLElement) !== iconButtonRef.current && onClick) {
          e.preventDefault()
          onClick(e)
        }
      },
      [onClick],
    )

    return (
      <StyledWrapper>
        <StyledClickableWrapper
          isClickable={hasClickableWrapper}
          clickableProps={{
            onClick: onClickCallback,
            onMouseDown,
            disabled,
            ariaLabel: ariaLabel || label,
          }}
        >
          <StyledTag
            ref={mergedRef}
            outlined={outlined}
            size={size}
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
                iconType={Icon.type?.ICON_FONT}
                clickable={false}
                icon={leftIcon}
                iconSize={iconSize}
                ignoreFocusStyle
              />
            ) : null}
            <StyledLabel disabled={disabled} outlined={outlined} size={size}>
              {label}
            </StyledLabel>
            {rightIcon ? (
              <Icon
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
              <StyledCloseButton outlined={outlined} disabled={disabled} size={size}>
                <IconButton
                  size={TagsSize.XXS}
                  color={IconButton.colors?.ON_PRIMARY_COLOR}
                  ariaLabel='Remove'
                  hideTooltip
                  icon={() => (
                    <div>
                      <CloseSmall />
                    </div>
                  )}
                  onClick={onDeleteCallback}
                  dataTestId={`${overrideDataTestId}-close`}
                  ref={iconButtonRef}
                  kind={IconButton.kinds?.TERTIARY}
                />
              </StyledCloseButton>
            )}
          </StyledTag>
        </StyledClickableWrapper>
      </StyledWrapper>
    )
  },
)

Object.assign(Tags, {
  sizes: TagSizes,
  defaultTestId: ComponentDefaultTestId.TAG,
  colors: tagElementColorsNames,
})

export default Tags

const StyledWrapper = styled.div`
  align-items: center;
  display: inline-flex;
  height: fit-content;
  position: relative;
`
const StyledClickableWrapper = styled(ClickableWrapper)`
  height: 100%;
  width: 100%;
`
const StyledTag = styled.div<{ outlined: boolean; size: string }>`
  display: inline-flex;
  overflow: hidden;

  padding: 6px 8px;
  align-items: center;
  user-select: none;
  /* animation: tags-pop-in-emphasized var(--motion-productive-medium) var(--motion-timing-emphasize); */

  gap: 2px;

  border-radius: 24px;
  border: 2px solid ${({ theme }) => theme?.body.textareaBorder};

  ${props =>
    props.outlined &&
    css`
      background-color: rgba(0, 0, 0, 0.2);

      display: flex;
      position: relative;
      z-index: 0;

      ::before {
        content: '';
        position: absolute;
        z-index: -1;
        inset: 0;
        padding: 1px;
        border-radius: 4px;
        background: var(--outline-border-color-var);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
      }
    `}

  ${props =>
    props.size === 'small' &&
    css`
      /* height: 24px; */
      padding: 4px 6px;
    `}
  ${props =>
    props.size === 'xs' &&
    css`
      padding: 2px 4px;
    `}
`
const StyledLabel = styled.span<{ outlined: boolean; disabled: boolean; size: string }>`
  color: rgba(0, 0, 0, 1);
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;

  ${props =>
    props.disabled &&
    css`
      color: rgba(255, 255, 255, 0.4);
    `}

  ${props =>
    props.outlined &&
    css`
      /* color: #fff; */
      color: rgba(0, 0, 0, 0.5);
    `}

    ${props =>
    props.size === 'small' &&
    css`
      font-size: 12px;
      line-height: 12px;
    `}
    ${props =>
    props.size === 'xs' &&
    css`
      font-size: x-small;
      line-height: 12px;
    `}
`
const StyledCloseButton = styled.div<{ outlined: boolean; disabled: boolean; size: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.5);

  margin-top: 4px;

  ${props =>
    props.outlined &&
    css`
      color: #fff;
    `}

  ${props =>
    props.disabled &&
    css`
      color: rgba(255, 255, 255, 0.4);
    `}

    ${props =>
    props.size === 'small' &&
    css`
      margin-left: 4px;
    `}
`
