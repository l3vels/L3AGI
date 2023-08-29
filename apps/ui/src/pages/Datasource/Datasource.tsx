import Button from '@l3-lib/ui-core/dist/Button'

import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'

import { StyledButtonWrapper } from 'pages/Agents/Agents'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import styled from 'styled-components'
import DatasourceCard from './DatasourceCard'
import { useDatasource } from './useDatasource'

const Datasource = () => {
  const { datasources, openDatasourceModal, deleteDatasourceHandler, openEditDatasourceModal } =
    useDatasource()

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <StyledSectionTitle>Datasource</StyledSectionTitle>

        <StyledSectionDescription>Here are all of your games, etc</StyledSectionDescription>
      </StyledHeaderGroup>
      <ComponentsWrapper>
        <StyledButtonWrapper>
          <Button onClick={openDatasourceModal}>Create Datasource</Button>
        </StyledButtonWrapper>

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
