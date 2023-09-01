import Button from '@l3-lib/ui-core/dist/Button'

import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'

import { StyledButtonWrapper } from 'pages/Agents/Agents'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import DatasourceCard from './DatasourceCard'
import { useDatasource } from './useDatasource'

const Datasource = () => {
  const { datasources, deleteDatasourceHandler, openEditDatasourceModal } = useDatasource()

  const navigate = useNavigate()

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          <StyledSectionTitle>Datasource</StyledSectionTitle>
          <StyledSectionDescription>Here are all of your games, etc</StyledSectionDescription>
        </div>
        <StyledButtonWrapper>
          <Button onClick={() => navigate('/datasources/create-datasource')}>
            Create Datasource
          </Button>
        </StyledButtonWrapper>
      </StyledHeaderGroup>
      <ComponentsWrapper>
        <StyledDatasourceCardsWrapper>
          {datasources?.map((datasource: any, index: number) => {
            return (
              <DatasourceCard
                key={index}
                title={datasource.name}
                subTitle={datasource.source_type}
                onEditClick={() => openEditDatasourceModal(datasource)}
                onDeleteClick={() => deleteDatasourceHandler(datasource.id)}
              />
            )
          })}
        </StyledDatasourceCardsWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default Datasource

const StyledDatasourceCardsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`
