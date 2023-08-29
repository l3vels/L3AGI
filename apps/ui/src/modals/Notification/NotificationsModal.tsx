import { ChangeEvent, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { useModal } from 'hooks'

import withRenderModal from 'hocs/withRenderModal'

import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Search from '@l3-lib/ui-core/dist/Search'

import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'

import Close from '@l3-lib/ui-core/dist/icons/Close'
import SearchOutline from '@l3-lib/ui-core/dist/icons/SearchOutline'

import NotificationsDateGroup from './NotificationsDateGroup'
import { useNotificationsByDateService } from 'services/useNotificationService'
import Modal from '@l3-lib/ui-core/dist/Modal'
import BgWrapper from 'modals/components/BgWrapper'

type NotificationsModalProps = {
  refetchCount: any
}

const NotificationsModal = ({ refetchCount }: NotificationsModalProps) => {
  const { closeModal } = useModal()

  const [activeTab, setActiveTab] = useState(0)
  const [isOpen, setIsOpen] = useState(0)
  const [searchValue, setSearchValue] = useState('')

  const { data: todayNotifications } = useNotificationsByDateService({
    search_text: searchValue,
    date: 'today',
    page: 1,
    limit: 10,
  })
  const { data: yesterdayNotifications } = useNotificationsByDateService({
    search_text: searchValue,
    date: 'yesterday',
    page: 1,
    limit: 10,
  })
  const { data: thisWeekNotifications } = useNotificationsByDateService({
    search_text: searchValue,
    date: 'thisWeek',
    page: 1,
    limit: 10,
  })

  const handleSearchChange = (value: string) => {
    setTimeout(() => setSearchValue(value), 1000)
  }

  const outsideClickRef = useRef(null as any)

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (outsideClickRef.current && !outsideClickRef.current.contains(event.target)) {
        closeModal('notifications-modal')
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [outsideClickRef])

  return (
    <Modal fullscreen show isClean isTransparent onClose={() => closeModal('notifications-modal')}>
      {/* <BgWrapper> */}
      <StyledRoot>
        <StyledNotificationsContainer ref={outsideClickRef}>
          <TabsContext activeTabId={activeTab}>
            <TabPanels>
              <TabPanel>
                {todayNotifications.length > 0 && (
                  <NotificationsDateGroup
                    notifications={todayNotifications}
                    refetchCount={refetchCount}
                    title={'Today'}
                    isOpen={isOpen === 1}
                    setIsOpen={() => setIsOpen(1)}
                    onClose={() => setIsOpen(0)}
                  />
                )}
                {yesterdayNotifications.length > 0 && (
                  <NotificationsDateGroup
                    notifications={yesterdayNotifications}
                    refetchCount={refetchCount}
                    title={'Yesterday'}
                    isOpen={isOpen === 2}
                    setIsOpen={() => setIsOpen(2)}
                    onClose={() => setIsOpen(0)}
                  />
                )}
                {thisWeekNotifications.length > 0 && (
                  <NotificationsDateGroup
                    notifications={thisWeekNotifications}
                    refetchCount={refetchCount}
                    title={'This Week'}
                    isOpen={isOpen === 3}
                    setIsOpen={() => setIsOpen(3)}
                    onClose={() => setIsOpen(0)}
                  />
                )}
              </TabPanel>

              {/* <TabPanel>error</TabPanel> */}
            </TabPanels>
          </TabsContext>

          <StyledTablistWrapper>
            {/* <Search
              placeholder='Search by games, collections or anything'
              onChange={handleSearchChange}
              size={Search.sizes.SMALL}
            /> */}

            <TabList size='small'>
              <Tab onClick={() => setActiveTab(0)}>All</Tab>
              {/* <Tab onClick={() => setActiveTab(1)}>Errors</Tab> */}
            </TabList>

            <StyledCloseButton>
              <IconButton
                kind={IconButton.kinds.TERTIARY}
                icon={() => <Close />}
                size={IconButton.sizes.MEDIUM}
                onClick={() => closeModal('notifications-modal')}
              />
            </StyledCloseButton>
          </StyledTablistWrapper>
        </StyledNotificationsContainer>
      </StyledRoot>
      {/* </BgWrapper> */}
    </Modal>
  )
}

export default withRenderModal('notifications-modal')(NotificationsModal)

const StyledRoot = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: auto;
  position: relative;
  /* background: red; */
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`
const StyledCloseButton = styled.div`
  top: 42px;
  right: 42px;
`
const StyledNotificationsContainer = styled.div`
  height: fit-content;
  min-width: 460px;
  /* width: 460px; */
  padding-bottom: 30px;
  padding-right: 50px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 60px;
`
const StyledSearchWrapper = styled.div`
  position: relative;
  margin-top: 16px;
  display: flex;
  align-items: center;
`
const StyledIconWrapper = styled.div`
  position: absolute;
  width: 25px;
  margin-left: 20px;
`

const StyledSearch = styled.input`
  background: rgba(0, 0, 0, 0.7);
  border-radius: 100px;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 16px;
  padding-left: 50px;

  width: 452px;
  height: 52px;

  border: none;

  color: #fff;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;

  &:focus-visible {
    outline: none;
  }
`
const StyledTablistWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  padding: 5px;
  border-radius: 100px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
    rgba(255, 255, 255, 0.1);
  /* Background-blur */

  backdrop-filter: blur(67.955px);
`
