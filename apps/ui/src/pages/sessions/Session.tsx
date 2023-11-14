import styled from 'styled-components'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Table from 'components/Table'

import Heading from '@l3-lib/ui-core/dist/Heading'

import columnConfig from './columnConfig'

import Dropdown from '@l3-lib/ui-core/dist/Dropdown'

import TextField from '@l3-lib/ui-core/dist/TextField'
import {
  StyledHeaderGroup,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import ComponentsWrapper from 'components/ComponentsWrapper/SessionComponentWrapper'
import SearchOutline from '@l3-lib/ui-core/dist/icons/SearchOutline'
import { StyledTableWrapper } from 'plugins/contact/pages/Contact/Contacts'
import { useChatsService } from 'services/chat/useChatsService'

import SessionDropdown from './SessionDropdown'
import { useSchedules } from 'pages/Schedule/useSchedules'
import { useAgentsService } from 'services/agent/useAgentsService'
const Sessions = () => {
  const { t } = useTranslation()
  const { data: chatsData } = useChatsService()

  const { schedules } = useSchedules()
  const { data: agentsData } = useAgentsService()

  const [searchText, setSearchText] = useState('')

  const mappedData = chatsData?.map((chat: any) => ({
    id: chat?.id,
    name: chat?.name,
    agent_name: chat?.agent?.agent?.name,
    team_name: chat?.team?.team?.name,
  }))

  const scheduleOptions = schedules?.map((schedule: any) => ({
    value: schedule.schedule.name,
    label: schedule.schedule.name,
  }))

  const agentOptions = agentsData?.map((agent: any) => {
    return { value: agent.agent.name, label: agent.agent.name }
  })

  const filteredData = mappedData?.filter(
    (row: { name: string; agent_name: string; team_name: string }) =>
      row.name.toLowerCase().includes(searchText.toLowerCase()) ||
      row.agent_name.toLowerCase().includes(searchText.toLowerCase()),
  )

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          <StyledSectionTitle>Sessions</StyledSectionTitle>
        </div>

        <StyledRightSideWrapper>
          <StyledSessionDropdownWrapper>
            <SessionDropdown isMulti placeholder='Agent' label={''} options={agentOptions} />
          </StyledSessionDropdownWrapper>
          <StyledDateWrapper>
            <TextField iconName='fa fa-square' placeholder='Date and Time' type='date' />
          </StyledDateWrapper>

          <StyledSessionDropdownWrapper>
            <SessionDropdown isMulti placeholder='Schedule' label={''} options={scheduleOptions} />
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
      </StyledHeaderGroup>

      <ComponentsWrapper noPadding>
        <StyledTableWrapper>
          <StyledTable expand columns={columnConfig} data={filteredData} />
        </StyledTableWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}
export default Sessions
export const StyledRightSideHeadingWrapper = styled.div`
  display: flex;
  position: relative;
  float: right;
`
export const StyledRightSideButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ffffff;
  width: 305px;
  height: 20px;
  float: right;
  top: 42px;
  right: 90px;
  margin-left: auto;
  margin-top: auto;
  display: flex;
  position: relative;
  top: 35px;
  right: 70px;
  width: fit-content;
`
export const StyledRightSideIconButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 6px;
  height: 12px;
  float: right;
  top: 46px;
  right: 53px;
  transform: rotate(90deg);
`
export const StyledLeftSideHeadingWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  height: 36px;
  // top: 40px;
  // left: 24px;
  @media (max-width: 809px) {
    margin-left: auto;
    margin-top: auto;
    display: flex;
    position: relative;
    bottom: 40px;
  }
`
export const StyledLeftSideHeading = styled(Heading)`
  line-height: 36px !important;
  font-size: 28px !important;
  color: #ffffff;
`
export const StyledTypography = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  height: 28px;
  // color: rgba(255, 255, 255, 0.6);
  @media (max-width: 1209px) {
    margin-left: auto;
    margin-top: auto;
    display: flex;
    position: relative;
    top: 60px;
  }
`
export const StyledTypographyWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.body.textColorPrimary};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75px;
  min-width: 30px;
  height: 20px;
  margin-left: 10px;
  // color: #ffffff;
  @media (max-width: 320px) {
    margin-left: auto;
    margin-top: auto;
    display: flex;
    position: relative;
    right: 65px;
    top: 40px;
    width: fit-content;
  }
`
export const StyledButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  -webkit-box-pack: end;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: fit-content;
  height: 56px;
`
export const StyledGridWrapper = styled.div`
  display: flex;
  position: relative;
  margin-top: 40px;
  width: 100%;
  height: 900px;
`

const StyledSearch = styled.input`
  color: ${({ theme }) => theme.body.textColorSecondary} !important;
  border:  ${({ theme }) => theme.body.sessionDropdownBorder}!important;

  min-width: 300px;
  height: 48px;
  border-radius: 8px;FDate
`

const StyledSessionDropdownWrapper = styled.div`
  width: 300px !important;
  height: 48px !important;
`

const StyledSessionDropdown = styled(Dropdown)`
  .css-1762592-control {
    border: ${({ theme }) => theme.body.sessionDropdownBorder}!important;
    border-radius: 8px;
    height: 48px;
  }

  .css-wxpx7r-menu {
    background: ${({ theme }) => theme.body.toolkitCardBgColorSecondary};
    border: ${({ theme }) => theme.body.sessionDropdownBorder}!important;
    color: ${({ theme }) => theme.body.textColorPrimary} !important;
  }
  .primary__wrapper {
    border: ${({ theme }) => theme.body.sessionDropdownBorder}!important;
  }

  .css-196qg4a-container {
    border: ${({ theme }) => theme.body.sessionDropdownBorder}!important;
  }
  .css-11unzgr {
    color: ${({ theme }) => theme.body.textColorPrimary} !important;
  }

  .menu.dropdown-menu-wrapper.css-19zapvn-menu {
    // background: ${({ theme }) => theme.body.toolkitCardBgColorSecondary};
    // color: ${({ theme }) => theme.body.textColorPrimary};
    border: ${({ theme }) => theme.body.border};
  }

  .icon_component--clickable {
    path {
      fill: ${({ theme }) => theme.body.iconColor};
    }
  }
  .css-196qg4a-container:active,
  .css-196qg4a-container:focus-within {
    border: ${({ theme }) => theme.body.sessionDropdownBorder} !important;
  }

  .css-1aqeloh-singleValue {
    background: rgb(0, 0, 0);
    height: 30px;
    border-radius: 8px;
  }

  .css-1aqeloh-singleValue {
    background: ${({ theme }) => theme.body.textColorPrimary};
  }

  .css-ugu73m-placeholder {
    color: ${({ theme }) => theme.body.textColorSecondary};
  }

  .css-1mm2o3n-indicatorContainer {
    color: ${({ theme }) => theme.body.textColorSecondary};
  }
`

const StyledRightSideWrapper = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`

const StyledDateWrapper = styled.div`
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
`

export const StyledTable = styled(Table)`
  min-height: 870px !important;
`

const StyledSearchContainer = styled.div`
  position: relative;
`

const StyledSearchInput = styled.input`
  color: ${({ theme }) => theme.body.textColorSecondary} !important;
  background: ${({ theme }) => theme.body.textAreaBgColor};
  border: ${({ theme }) => theme.body.sessionDropdownBorder} !important;
  min-width: 300px;
  height: 48px;
  border-radius: 8px;
  padding-right: 40px;
`

const StyledSearchIcon = styled(SearchOutline)`
  position: absolute;
  top: 50%;
  right: 10px; /* Adjust this value based on the desired right spacing */
  transform: translateY(-50%);
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`
