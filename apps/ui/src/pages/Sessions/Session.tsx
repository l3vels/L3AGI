import styled from 'styled-components'

import Table from 'components/Table'

import { useTranslation } from 'react-i18next'

import {
  StyledHeaderGroup,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import SearchOutline from 'share-ui/components/Icon/Icons/components/SearchOutline'

import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { useSession } from './useSession'
import SessionDropdown from './SessionDropdown'

import DatePickerField from 'components/DatePicker/DatePicker'

import { useColumn } from './columnConfig'
import ChatV2 from 'modals/AIChatModal/components/ChatV2'
import { useLocation, useNavigate } from 'react-router-dom'
import IconButton from 'share-ui/components/IconButton/IconButton'
import { Close } from 'share-ui/components/Icon/Icons'

import { useState } from 'react'
import { ButtonTertiary } from 'components/Button/Button'
import {
  StyledNavigationChevronDown,
  StyledNavigationChevronUp,
} from 'pages/Agents/AgentForm/components/ShowAdvancedButton'

const Sessions = () => {
  const { t } = useTranslation()

  const [showFilter, setShowFilter] = useState(false)

  const {
    scheduleOptions,
    agentOptions,
    filteredData,
    searchText,
    setSearchText,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    selectedAgentNames,
    setSelectedAgentNames,
    startDate,
    endDate,
    filterByDateRange,
    handleDateChange,
    clearSelectedDays,
    setPage,
    page,
    totalPages,
    chatsLoading,
    setSelectedAgentType,
  } = useSession()

  const columnConfig = useColumn()

  const navigate = useNavigate()
  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)
  const sessionId = urlParams.get('chat')

  const agentTypeOption = [
    { label: 'Chat based', value: 'text' },
    { label: 'Call based', value: 'voice' },
  ]

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <StyledTitleWrapper>
          <StyledSectionTitle>{t('sessions')}</StyledSectionTitle>

          <ButtonTertiary onClick={() => setShowFilter(!showFilter)} size={'xs'}>
            Filter
            {showFilter ? (
              <StyledNavigationChevronUp size={14} />
            ) : (
              <StyledNavigationChevronDown size={14} />
            )}
          </ButtonTertiary>
        </StyledTitleWrapper>
      </StyledHeaderGroup>

      {showFilter && (
        <StyledRightSideWrapper>
          <StyledSessionDropdownWrapper>
            <SessionDropdown
              isMulti
              placeholder='Agent'
              label={''}
              options={agentOptions}
              onChange={(selectedValues: string[]) => setSelectedAgentNames(selectedValues)}
            />
          </StyledSessionDropdownWrapper>
          {/* <StyledDateWrapper>
            <DatePickerField
              start_date={startDate}
              end_date={endDate}
              onChange={handleDateChange}
              onClear={clearSelectedDays}
              onApply={filterByDateRange}
            />
          </StyledDateWrapper> */}

          <StyledSessionDropdownWrapper>
            <SessionDropdown isMulti placeholder='Schedule' label={''} options={scheduleOptions} />
          </StyledSessionDropdownWrapper>
          <StyledSessionDropdownWrapper>
            <SessionDropdown
              placeholder='Agent Type'
              label={''}
              options={agentTypeOption}
              onChange={(value: any) => setSelectedAgentType(value)}
            />
          </StyledSessionDropdownWrapper>

          {/* <StyledSessionDropdownWrapper>
            <StyledSessionDropdown
              isMulti
              kind={Dropdown.kind.PRIMARY}
              placeholder='Call Duration'
              size={Dropdown.size.SMALL}
            />
          </StyledSessionDropdownWrapper> */}

          <StyledSearchContainer>
            <StyledSearchInput
              type='text'
              id='searchInput'
              value={searchText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchText(e.target?.value || '')
              }
              placeholder='Search...'
            />
            <StyledSearchIcon />
          </StyledSearchContainer>
        </StyledRightSideWrapper>
      )}
      <ComponentsWrapper noPadding>
        <Table
          expand
          columns={columnConfig}
          data={filteredData}
          setPage={setPage}
          page={page}
          totalPages={totalPages}
          isLoading={chatsLoading}
          selectedRow={sessionId}
        />
        {sessionId && (
          <StyledSessionChatWrapper>
            <StyledButtonWrapper>
              <IconButton
                icon={() => <Close />}
                size={IconButton.sizes?.XS}
                kind={IconButton.kinds?.SECONDARY}
                onClick={() => navigate('/sessions')}
              />
            </StyledButtonWrapper>

            <ChatV2 chatSessionId={sessionId} />
          </StyledSessionChatWrapper>
        )}
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}
export default Sessions

const StyledSessionDropdownWrapper = styled.div`
  min-width: 300px !important;
  max-width: 800px;
`

const StyledRightSideWrapper = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  flex-wrap: wrap;
`

const StyledDateWrapper = styled.div`
  z-index: 10;

  .input-component {
    width: 300px;
    border: ${({ theme }) => theme.body.sessionDropdownBorder} !important;
    border-radius: 8px;
    height: 48px;
    color: ${({ theme }) => theme.body.textColorSecondary};
  }
  .input-component .input-component__input-wrapper .input-component__input {
    color: ${({ theme }) => theme.body.textColorSecondary} !important;
  }
  .search_component_wrapper input[type='search'] {
    color: ${({ theme }) => theme.body.textColorSecondary};
  }
  .cvAljc {
    font-size: 14px !important;
  }
`

const StyledSearchContainer = styled.div`
  position: relative;
`

const StyledSearchInput = styled.input`
  color: ${({ theme }) => theme.body.textColorSecondary} !important;
  background: ${({ theme }) => theme.body.toolkitCardBgColorSecondary};
  border: ${({ theme }) => theme.body.sessionDropdownBorder} !important;
  min-width: 300px;
  height: 48px;
  border-radius: 8px;
  padding-left: 15px;
  padding-right: 40px;
  font-size: 14px;
`

const StyledSearchIcon = styled(SearchOutline)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`
const StyledSessionChatWrapper = styled.div`
  height: calc(100vh - 250px);
  width: 100%;

  padding: 0 10px;
`
const StyledButtonWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;

  z-index: 1;
`
const StyledTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`
