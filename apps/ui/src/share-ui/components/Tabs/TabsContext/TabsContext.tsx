import React, {
  FC,
  forwardRef,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import cx from 'classnames'
import useMergeRefs from '../../../hooks/useMergeRefs'
import usePrevious from '../../../hooks/usePrevious'
import L3ComponentProps from '../../../types/L3ComponentProps'
import styled from 'styled-components'

export interface TabsContextProps extends L3ComponentProps {
  activeTabId?: number
  children?: ReactElement | ReactElement[]
}

// eslint-disable-next-line react/display-name
const TabsContext: FC<TabsContextProps> = forwardRef(
  ({ className, id, activeTabId = 0, children }, ref) => {
    const componentRef = useRef(null)
    const mergedRef = useMergeRefs({ refs: [ref, componentRef] })

    const [previousActiveTabIdState, setPreviousActiveTabIdState] = useState(activeTabId)
    const [activeTabIdState, setActiveTabIdState] = useState(activeTabId)
    const prevActiveTabIdProp = usePrevious(activeTabId)

    useEffect(() => {
      // Update active tab if changed from props
      if (activeTabId !== prevActiveTabIdProp && activeTabId !== activeTabIdState) {
        setPreviousActiveTabIdState(activeTabIdState)
        setActiveTabIdState(activeTabId)
      }
    }, [
      activeTabId,
      prevActiveTabIdProp,
      activeTabIdState,
      setPreviousActiveTabIdState,
      setActiveTabIdState,
    ])

    const onTabClick = useCallback(
      (tabId: number) => {
        setPreviousActiveTabIdState(activeTabIdState)
        setActiveTabIdState(tabId)
      },
      [setPreviousActiveTabIdState, activeTabIdState, setActiveTabIdState],
    )

    return (
      <StyledRoot ref={mergedRef} className={cx('tabs-context--wrapper', className)} id={id}>
        {React.Children.map(children, child => {
          if (child?.type.isTabList) {
            return React.cloneElement(child, {
              activeTabId: activeTabIdState,
              onTabChange: onTabClick,
            })
          }

          if (child?.type.isTabPanels) {
            const animationDirection = previousActiveTabIdState < activeTabIdState ? 'ltr' : 'rtl'
            return React.cloneElement(child, { activeTabId: activeTabIdState, animationDirection })
          }
          return child
        })}
      </StyledRoot>
    )
  },
)

export default TabsContext

const StyledRoot = styled.div`
  height: 100%;
  width: 100%;
`
