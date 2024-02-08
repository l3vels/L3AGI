import React, { FC, forwardRef, ReactElement, useMemo, useRef } from 'react'
import cx from 'classnames'
import useMergeRefs from '../../../hooks/useMergeRefs'
import L3ComponentProps from '../../../types/L3ComponentProps'
import { TabPanelsAnimationDirection } from './TabPanelsConstants'
import { TabPanelProps } from '../TabPanel/TabPanel'
import styled from 'styled-components'

export interface TabPanelsProps extends L3ComponentProps {
  renderOnlyActiveTab?: boolean
  activeTabId?: number
  noAnimation?: boolean
  animationDirection?: TabPanelsAnimationDirection
  children?: ReactElement<TabPanelProps> | ReactElement<TabPanelProps>[]
}

// eslint-disable-next-line react/display-name
const TabPanels: FC<TabPanelsProps> = forwardRef(
  (
    {
      className,
      id,
      activeTabId = 0,
      noAnimation,
      animationDirection = TabPanelsAnimationDirection.RTL,
      children,
      renderOnlyActiveTab = false, // TODO BREAKING change to true - breaking change
    },
    ref,
  ) => {
    const componentRef = useRef(null)
    const mergedRef = useMergeRefs({ refs: [ref, componentRef] })
    const renderedTabs = useMemo(() => {
      return React.Children.map(children, (child, index) => {
        const isActiveTab = activeTabId === index
        if (renderOnlyActiveTab && !isActiveTab) return null
        const activeClass = isActiveTab ? 'active' : 'non-active'
        const noAnimationClass = noAnimation && 'no-animation'
        const animationClass = isActiveTab ? `animation-direction-${animationDirection}` : ''
        return React.cloneElement(child, {
          index,
          ...child.props,
          className: cx(
            'tab-panel',
            activeClass,
            noAnimationClass,
            animationClass,
            child.props.className,
          ),
        })
      }).filter(Boolean)
    }, [children, activeTabId, renderOnlyActiveTab, animationDirection])

    return (
      <StyledTabPanelsWrapper
        ref={mergedRef}
        className={cx('tab-panels--wrapper', className)}
        id={id}
      >
        {renderedTabs}
      </StyledTabPanelsWrapper>
    )
  },
)

Object.assign(TabPanels, {
  isTabPanels: true,
  animationDirections: TabPanelsAnimationDirection,
})

export default TabPanels

const StyledTabPanelsWrapper = styled.div`
  height: 100%;
  width: 100%;

  .tab-panel {
    display: none;

    /* &.animation-direction-rtl {
      transform: translateX(8px);
    }

    &.animation-direction-ltr {
      transform: translateX(-8px);
    } */

    &.no-animation {
      transform: unset;
    }

    &.active {
      display: block;
      animation: panel-slide-in var(--motion-productive-long) forwards var(--motion-timing-enter);
    }
  }

  @keyframes panel-slide-in {
    100% {
      transform: translateX(0%);
    }
  }
`
