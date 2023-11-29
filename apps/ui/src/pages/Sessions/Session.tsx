import styled from 'styled-components'

import Table from 'components/Table'
import { useTranslation } from 'react-i18next'
import Heading from '@l3-lib/ui-core/dist/Heading'

import TextField from '@l3-lib/ui-core/dist/TextField'
import {
  StyledHeaderGroup,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import SearchOutline from '@l3-lib/ui-core/dist/icons/SearchOutline'
import { StyledTableWrapper } from 'plugins/contact/pages/Contact/Contacts'

import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { useSession } from './useSession'
import SessionDropdown from './SessionDropdown'
import columnConfig from './columnConfig'
// import DatePicker from '@l3-lib/ui-core/dist/DatePicker'
import { SetStateAction, useState } from 'react'
import DatePickerField from 'components/DatePicker/DatePicker'
import { Moment } from 'moment'

const Sessions = () => {
  const { t } = useTranslation()
  const {
    scheduleOptions,
    agentOptions,
    filteredData,
    searchText,
    setSearchText,
    selectedAgentNames,
    setSelectedAgentNames,
    startDate,
    endDate,
    filterByDateRange,
    handleDateChange,
    clearSelectedDays,
  } = useSession()

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          <StyledSectionTitle>{t('sessions')}</StyledSectionTitle>
        </div>

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
          <StyledDateWrapper>
            <DatePickerField
              start_date={startDate}
              end_date={endDate}
              onChange={handleDateChange}
              onClear={clearSelectedDays}
              onApply={filterByDateRange}
            />
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

const StyledSessionDropdownWrapper = styled.div`
  min-width: 300px !important;
  max-width: 800px;
`

const StyledRightSideWrapper = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
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
`

export const StyledTable = styled(Table)`
  min-height: 870px !important;
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
