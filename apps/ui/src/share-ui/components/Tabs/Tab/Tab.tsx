/* eslint-disable jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events */
import React, { FC, forwardRef, ReactElement, useRef } from 'react'
import { noop as NOOP } from 'lodash-es'
import cx from 'classnames'
import useMergeRefs from '../../../hooks/useMergeRefs'
import Icon, { IconSubComponentProps } from '../../Icon/Icon'
import L3ComponentProps from '../../../types/L3ComponentProps'
import { IconType } from '../../Icon/IconConstants'

import { TabSize } from './TabConstants'
import styled, { css } from 'styled-components'

export interface TabProps extends L3ComponentProps {
  value?: number
  disabled?: boolean
  active?: boolean
  focus?: boolean
  icon?: string | React.FunctionComponent<IconSubComponentProps> | null
  iconType?: IconType
  iconSide?: string
  onClick?: (value: number) => void
  children?: string | ReactElement[]
  size?: TabSize
  isError?: boolean
}

// eslint-disable-next-line react/display-name
const Tab: FC<TabProps> = forwardRef(
  (
    {
      className,
      id,
      value = 0,
      disabled = false,
      active = false,
      focus = false,
      onClick = NOOP,
      icon,
      iconType,
      iconSide = 'left',
      children,
      size = 'small',
      isError = false,
    },
    ref,
  ) => {
    const componentRef = useRef(null)
    const mergedRef = useMergeRefs({ refs: [ref, componentRef] })

    function renderIconAndChildren() {
      if (!icon) return children

      const iconElement = (
        <Icon
          clickable={false}
          ariaHidden={true}
          iconType={iconType}
          icon={icon}
          className={cx('tab-icon', iconSide)}
          iconSize={18}
          ignoreFocusStyle
        />
      )

      if (iconSide === 'left') {
        return [iconElement, ...children]
      }

      return [...children, iconElement]
    }
    return (
      <StyledLi
        ref={mergedRef}
        key={id}
        focus={focus}
        id={id}
        role='tab'
        aria-selected={active}
        disabled={disabled}
      >
        <StyledA
          onClick={() => !disabled && onClick(value)}
          active={active}
          disabled={disabled}
          size={size}
          isError={isError}
        >
          {renderIconAndChildren()}
        </StyledA>
      </StyledLi>
    )
  },
)

export default Tab

const StyledLi = styled.li<{ focus: boolean; disabled: boolean }>`
  position: relative;
  display: inline-block;
  padding-left: 1px;
  padding-right: 1px;

  text-align: center;
  /* height: 32px; */
  width: fit-content;
  min-width: 130px;

  &:after {
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    content: '';
    border-bottom: solid 2px;
    transform: scaleX(0);
    z-index: 0;
  }

  ${props =>
    props.focus &&
    css`
      position: relative;
    `}

  ${p =>
    p.disabled &&
    css`
      position: absolute;
      z-index: -1;
      pointer-events: none;
      opacity: 0;
    `};
`
const StyledA = styled.a<{ active: boolean; disabled: boolean; size: string; isError: boolean }>`
  // $margin-bottom: 1px;
  // height: calc(100% - #{$margin-bottom});
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  // padding: 4px 16px;
  // font-weight: 400;
  // font-size: 16px;
  user-select: none;
  // margin-bottom: $margin-bottom;
  cursor: pointer;

  color: ${({ theme }) => theme?.tabs.color};

  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  height: 46px;
  min-width: 130px;

  ${props =>
    props.size === 'small' &&
    css`
      font-size: 16px;
      line-height: 20px;
      height: 32px;
    `}

  padding: 8px 16px;
  gap: 10px;

  &:focus {
    outline: none;
  }

  .tab-icon {
    /* @include theme-prop(color, icon-color); */
    margin-right: 8px;

    &.right {
      margin-right: 0;
      margin-left: 8px;
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme?.tabs.hoverBgColor};

    border-radius: 60px;
  }

  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
    `}

  ${props =>
    props.active &&
    css`
      color: ${({ theme }) => theme?.tabs.activeColor};
      background-color: ${({ theme }) => theme?.tabs.activeBgColor};
      border: 2px solid ${({ theme }) => theme?.tabs.borderColor};
      border-radius: 60px;

      &:hover {
        /* background-color: rgba(0, 0, 0, 0.); */
        background-color: ${({ theme }) => theme?.tabs.activeBgColor};

        cursor: auto;
      }
    `}

    ${p =>
    p.isError &&
    css`
      color: #ef5533;
      outline: 2px solid #ef5533;
      border-radius: 60px;
    `};
`
