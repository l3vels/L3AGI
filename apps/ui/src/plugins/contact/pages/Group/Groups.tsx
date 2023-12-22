import { ButtonPrimary } from 'components/Button/Button'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'

import IconButton from 'share-ui/components/IconButton/IconButton'

import {
  StyledHeaderGroup,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import { useMemo } from 'react'

import { useNavigate } from 'react-router-dom'

import { useGroups } from './useGroups'
import {
  StyledDeleteIcon,
  StyledEditIcon,
} from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'
import styled from 'styled-components'
import Table from 'components/Table'
import { StyledTableWrapper } from '../Contact/Contacts'
import { t } from 'i18next'

const Groups = () => {
  const { groups, deleteGroupHandler } = useGroups()

  const navigate = useNavigate()

  const gridData =
    groups?.map((group: any) => ({
      id: group.id,
      name: group.name,
      description: group.description,
    })) || []

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        width: 485,
      },
      {
        Header: 'Description',
        accessor: 'description',
        width: 485,
      },
      {
        Header: 'Actions',
        accessor: 'id',
        width: 100,
        Cell: ({ cell }: any) => {
          return (
            <StyledTableButtons>
              <IconButton
                onClick={() => deleteGroupHandler(cell.value)}
                icon={() => <StyledDeleteIcon />}
                size={IconButton.sizes?.SMALL}
                kind={IconButton.kinds?.TERTIARY}
                // ariaLabel='Delete'
              />

              <IconButton
                onClick={() => navigate(`/contacts/${cell.value}/edit-group`)}
                icon={() => <StyledEditIcon />}
                size={IconButton.sizes?.SMALL}
                kind={IconButton.kinds?.TERTIARY}
                // ariaLabel='Edit'
              />
            </StyledTableButtons>
          )
        },
      },
    ],
    [],
  )

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          <StyledSectionTitle>{`${t('groups')}`}</StyledSectionTitle>
          {/* <StyledSectionDescription>
            Here is your datasource, a collection of databases, APIs, files, and more.
          </StyledSectionDescription> */}
        </div>
        <div>
          <ButtonPrimary onClick={() => navigate('/contacts/create-group')} size={'small'}>
            {t('add-group')}
          </ButtonPrimary>
        </div>
      </StyledHeaderGroup>

      <ComponentsWrapper noPadding>
        <StyledTableWrapper>
          <Table columns={columns} data={gridData} />
        </StyledTableWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default Groups

export const StyledTableButtons = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
`
