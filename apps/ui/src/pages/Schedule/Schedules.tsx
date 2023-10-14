import { useSchedulesService } from 'services/schedule/useSchedulesService'

import { ButtonPrimary } from 'components/Button/Button'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'

import { StyledCardsWrapper } from 'pages/Agents/Agents'

import {
  StyledHeaderGroup,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import { useNavigate } from 'react-router-dom'
import TempCard from 'pages/Schedule/TempCard'
import { useSchedules } from './useSchedules'

const Schedules = () => {
  const navigate = useNavigate()

  const { deleteScheduleHandler, schedules } = useSchedules()

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          <StyledSectionTitle>Schedules</StyledSectionTitle>
          {/* <StyledSectionDescription>
        Here is your datasource, a collection of databases, APIs, files, and more.
      </StyledSectionDescription> */}
        </div>
        <div>
          <ButtonPrimary onClick={() => navigate('/schedules/create-schedule')} size={'small'}>
            Add Schedule
          </ButtonPrimary>
        </div>
      </StyledHeaderGroup>

      <ComponentsWrapper noPadding>
        <StyledCardsWrapper>
          {schedules?.map((scheduleObj: any) => {
            const { schedule } = scheduleObj

            return (
              <TempCard
                key={schedule.id}
                name={schedule.name}
                description={schedule.description}
                onDeleteClick={() => deleteScheduleHandler(schedule.id)}
                onEditClick={() => navigate(`/schedules/${schedule.id}/edit-schedule`)}
              />
            )
          })}
        </StyledCardsWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default Schedules
