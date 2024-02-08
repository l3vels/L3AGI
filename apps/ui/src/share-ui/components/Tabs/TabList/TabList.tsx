import React, {
  FC,
  forwardRef,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import cx from 'classnames'
import useGridKeyboardNavigation from '../../../hooks/useGridKeyboardNavigation/useGridKeyboardNavigation'
import useMergeRefs from '../../../hooks/useMergeRefs'
import usePrevious from '../../../hooks/usePrevious'
import L3ComponentProps from '../../../types/L3ComponentProps'
import { NOOP } from '../../../utils/function-utils'
import { TabProps } from '../Tab/Tab'

import { TabSize } from '../Tab/TabConstants'
import styled, { css } from 'styled-components'

export interface TabListProps extends L3ComponentProps {
  onTabChange?: (tabId: number) => void
  activeTabId?: number
  tabType?: string
  size?: TabSize
  children?: ReactElement<TabProps>[]
  isColumn?: boolean
  noBorder?: boolean
  customWidth?: number
}

// eslint-disable-next-line react/display-name
const TabList: FC<TabListProps> = forwardRef(
  (
    {
      className,
      id,
      onTabChange = NOOP,
      activeTabId = 0,
      tabType = 'Compact',
      size = TabSize.LARGE,
      children,
      isColumn = false,
      noBorder = true,
      customWidth = 130,
    },
    ref,
  ) => {
    const componentRef = useRef(null)
    const mergedRef = useMergeRefs({ refs: [ref, componentRef] })

    const [activeTabState, setActiveTabState] = useState<number>(activeTabId)

    const prevActiveTabIdProp = usePrevious(activeTabId)

    useEffect(() => {
      // Update active tab if changed from props
      if (activeTabId !== prevActiveTabIdProp && activeTabId !== activeTabState) {
        setActiveTabState(activeTabId)
      }
    }, [activeTabId, prevActiveTabIdProp, activeTabState, setActiveTabState])

    const disabledTabIds = useMemo(() => {
      const disabledIds = new Set<number>()
      React.Children.forEach(children, (child, index) => {
        if (child?.props.disabled) {
          disabledIds.add(index)
        }
      })
      return disabledIds
    }, [children])

    const onTabSelect = useCallback(
      (tabId: number) => {
        if (disabledTabIds.has(tabId)) return
        setActiveTabState(tabId)
        onTabChange && onTabChange(tabId)
      },
      [onTabChange, disabledTabIds],
    )

    const onTabClick = useCallback(
      (value: HTMLElement | void, tabId: number) => {
        const tabCallbackFunc = children?.[tabId].props?.onClick
        if (disabledTabIds.has(tabId)) return
        if (tabCallbackFunc) tabCallbackFunc(tabId)
        onTabSelect(tabId)
      },
      [children, disabledTabIds, onTabSelect],
    )

    const getItemByIndex = useCallback(
      (index: number): ReactElement<TabProps> => children[index],
      [children],
    )
    const disabledIndexes = useMemo(() => Array.from(disabledTabIds), [disabledTabIds])
    const ulRef = useRef()
    const { activeIndex: focusIndex, onSelectionAction } = useGridKeyboardNavigation({
      ref: ulRef,
      numberOfItemsInLine: children?.length,
      itemsCount: children?.length,
      getItemByIndex,
      onItemClicked: onTabClick,
      disabledIndexes,
    })

    const tabsToRender = useMemo(() => {
      const childrenToRender = React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          value: index,
          active: activeTabState === index,
          focus: focusIndex === index,
          onClick: onSelectionAction,
          size: size,
        })
      })
      return childrenToRender
    }, [children, activeTabState, focusIndex, onSelectionAction, size])

    return (
      <StyledTabWrapper ref={mergedRef} id={id}>
        <StyledTabList
          ref={ulRef}
          tabIndex={0}
          className={cx('tabs-list', size)}
          role='tablist'
          isColumn={isColumn}
          noBorder={noBorder}
          customWidth={customWidth}
        >
          {tabsToRender}
        </StyledTabList>
      </StyledTabWrapper>
    )
  },
)

Object.assign(TabList, {
  isTabList: true,
})

export default TabList

const StyledTabWrapper = styled.div`
  width: 100%;
`
const StyledTabList = styled.ul<{ isColumn: boolean; noBorder: boolean; customWidth: number }>`
  display: flex;
  flex-direction: row;
  list-style-type: none;

  outline: none;
  align-items: center;

  width: fit-content;
  border-radius: 60px;

  border: 1px solid ${({ theme }) => theme.tabs.borderColor};

  background-color: rgba(255, 255, 255, 0.2);

  padding: 4px;
  gap: 8px;

  ${props =>
    props.isColumn &&
    css`
      flex-direction: column;
      border-radius: 20px;
    `}
  ${props =>
    props.noBorder &&
    css`
      border-color: transparent;
    `}

    min-width: ${props => props.customWidth && `${props.customWidth}px`};
`
