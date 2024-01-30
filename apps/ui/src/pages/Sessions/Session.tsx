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

import { memo, useEffect, useState } from 'react'
import { ButtonTertiary } from 'components/Button/Button'
import {
  StyledNavigationChevronDown,
  StyledNavigationChevronUp,
} from 'pages/Agents/AgentForm/components/ShowAdvancedButton'
import TextField from 'share-ui/components/TextField/TextField'

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
    setSelectedCampaign,
    selectedCampaign,
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
    selectedAgentType,
    campaignOptions,
  } = useSession()

  const columnConfig = useColumn({})

  const navigate = useNavigate()
  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)
  const sessionId = urlParams.get('chat')
  const campaignId = urlParams.get('campaign')

  const agentTypeOption = [
    { label: 'Chat based', value: 'text' },
    { label: 'Outbound based', value: 'outbound' },
    { label: 'Inbound based', value: 'inbound' },
  ]

  useEffect(() => {
    if (campaignId && campaignOptions?.length > 0) {
      const value = campaignOptions?.find((option: any) => option.value === campaignId)
      if (value) setSelectedCampaign([value])
    }
  }, [campaignId, campaignOptions])

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <StyledTitleWrapper>
          <StyledSectionTitle>{t('sessions')}</StyledSectionTitle>

          <ButtonTertiary onClick={() => setShowFilter(!showFilter)} size={'xs'}>
            {t('filter')}
            {showFilter ? (
              <StyledNavigationChevronUp size={14} />
            ) : (
              <StyledNavigationChevronDown size={14} />
            )}
          </ButtonTertiary>
        </StyledTitleWrapper>
      </StyledHeaderGroup>

      <ComponentsWrapper noPadding>
        {showFilter && (
          <StyledFilterContainer>
            <StyledSearchContainer>
              <TextField
                id='searchInput'
                value={searchText}
                onChange={(value: string) => setSearchText(value || '')}
                placeholder='Search...'
              />
              <StyledSearchIcon />
            </StyledSearchContainer>

            <SessionDropdown
              isMulti
              placeholder='Agent'
              label={''}
              options={agentOptions}
              onChange={setSelectedAgentNames}
              value={selectedAgentNames}
            />

            {/* <StyledDateWrapper>
            <DatePickerField
              start_date={startDate}
              end_date={endDate}
              onChange={handleDateChange}
              onClear={clearSelectedDays}
              onApply={filterByDateRange}
            />
          </StyledDateWrapper> */}

            {/* <StyledSessionDropdownWrapper>
            <SessionDropdown isMulti placeholder='Schedule' label={''} options={scheduleOptions} />
          </StyledSessionDropdownWrapper> */}

            <SessionDropdown
              placeholder='Agent Type'
              label={''}
              options={agentTypeOption}
              onChange={setSelectedAgentType}
              value={selectedAgentType}
            />

            <SessionDropdown
              isMulti
              placeholder='Campaign'
              label={''}
              options={campaignOptions}
              onChange={(value: any) => {
                setSelectedCampaign(value)
                navigate('/sessions')
              }}
              value={selectedCampaign}
            />

            {/* <StyledSessionDropdownWrapper>
            <StyledSessionDropdown
              isMulti
              kind={Dropdown.kind.PRIMARY}
              placeholder='Call Duration'
              size={Dropdown.size.SMALL}
            />
          </StyledSessionDropdownWrapper> */}
          </StyledFilterContainer>
        )}
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
export default memo(Sessions)

const StyledFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  /* align-items: center; */
  /* flex-wrap: wrap; */

  padding: 10px;
  margin-right: 10px;

  width: 100%;
  max-width: 300px;

  overflow: auto;
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
  width: 100%;
`

const StyledSearchIcon = styled(SearchOutline)`
  position: absolute;
  top: 20px;
  right: 5px;
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
