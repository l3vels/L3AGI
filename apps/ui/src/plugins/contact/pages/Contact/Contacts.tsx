import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { ButtonPrimary } from 'components/Button/Button'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'

import IconButton from '@l3-lib/ui-core/dist/IconButton'

import {
  StyledHeaderGroup,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import { useContacts } from './useContacts'

import {
  StyledDeleteIcon,
  StyledEditIcon,
} from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'

import { useMemo } from 'react'
import Table from 'components/Table'
import { StyledTableButtons } from '../Group/Groups'

import Microphone from '@l3-lib/ui-core/dist/icons/Microphone'
import Close from '@l3-lib/ui-core/dist/icons/Close'
import { StyledCloseIcon } from 'pages/Home/GetStarted/GetStartedContainer'

const Contacts = () => {
  const navigate = useNavigate()

  const { contacts, deleteContactHandler } = useContacts()

  const gridData =
    contacts?.map((contact: any) => ({
      id: contact.id,
      name: contact.name,
      description: contact.description,
      email: contact.email,
      phone: contact.phone,
    })) || []

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
        Cell: ({ cell }: any) => {
          return (
            <StyledPhoneCell>
              <span>{cell.value}</span>
              <StyledTableButtons>
                <IconButton
                  onClick={() => deleteContactHandler(cell.value)}
                  icon={() => <StyledCallIcon />}
                  size={IconButton.sizes.SMALL}
                  kind={IconButton.kinds.TERTIARY}
                  ariaLabel='Call'
                />
                {/* <IconButton
                  onClick={() => deleteContactHandler(cell.value)}
                  icon={() => <StyledCloseIcon size={25} />}
                  size={IconButton.sizes.SMALL}
                  kind={IconButton.kinds.TERTIARY}
                  ariaLabel='Hung up'
                /> */}
              </StyledTableButtons>
            </StyledPhoneCell>
          )
        },
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Actions',
        accessor: 'id',
        maxWidth: 100,
        Cell: ({ cell }: any) => {
          return (
            <StyledTableButtons>
              <IconButton
                onClick={() => deleteContactHandler(cell.value)}
                icon={() => <StyledDeleteIcon />}
                size={IconButton.sizes.SMALL}
                kind={IconButton.kinds.TERTIARY}
                // ariaLabel='Delete'
              />

              <IconButton
                onClick={() => navigate(`/contacts/${cell.value}/edit-contact`)}
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
          <StyledSectionTitle>Contacts</StyledSectionTitle>
          {/* <StyledSectionDescription>
          Here is your datasource, a collection of databases, APIs, files, and more.
        </StyledSectionDescription> */}
        </div>
        <div>
          <ButtonPrimary onClick={() => navigate('/contacts/create-contact')} size={'small'}>
            Add Contact
          </ButtonPrimary>
        </div>
      </StyledHeaderGroup>

      <ComponentsWrapper>
        <Table columns={columns} data={gridData} />
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default Contacts

const StyledPhoneCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
const StyledCallIcon = styled(Microphone)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`
