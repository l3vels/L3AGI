import { ButtonPrimary } from 'components/Button/Button'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'

import IconButton from '@l3-lib/ui-core/dist/IconButton'

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
        width: 400,
      },
      {
        Header: 'Description',
        accessor: 'description',
        width: 400,
      },
      {
        Header: 'Actions',
        accessor: 'id',
        width: 300,
        Cell: ({ cell }: any) => {
          return (
            <StyledTableButtons>
              <IconButton
                onClick={() => deleteGroupHandler(cell.value)}
                icon={() => <StyledDeleteIcon />}
                size={IconButton.sizes.SMALL}
                kind={IconButton.kinds.TERTIARY}
                // ariaLabel='Delete'
              />

              <IconButton
                onClick={() => navigate(`/groups/${cell.value}/edit-group`)}
                icon={() => <StyledEditIcon />}
                size={IconButton.sizes.SMALL}
                kind={IconButton.kinds.TERTIARY}
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
          <StyledSectionTitle>Groups</StyledSectionTitle>
          {/* <StyledSectionDescription>
            Here is your datasource, a collection of databases, APIs, files, and more.
          </StyledSectionDescription> */}
        </div>
        <div>
          <ButtonPrimary onClick={() => navigate('/groups/create-group')} size={'small'}>
            Add Group
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
`
