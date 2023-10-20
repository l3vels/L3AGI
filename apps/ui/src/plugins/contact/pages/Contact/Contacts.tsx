import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { ButtonPrimary } from 'components/Button/Button'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'

import IconButton from '@l3-lib/ui-core/dist/IconButton'

import MenuButton from '@l3-lib/ui-core/dist/MenuButton'

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
import { StyledMenuDots } from 'pages/Agents/AgentView/components/AgentViewDetailBox'
import { useAgents } from 'pages/Agents/useAgents'
import AgentChatCard from 'components/ChatCards/AgentChatCard'
import { useModal } from 'hooks'
import { useContactForm } from './ContactForm/useContactForm'
import { useCreateCallService } from 'plugins/contact/services/call/useCreateCallService'

const Contacts = () => {
  const navigate = useNavigate()

  const { contacts, deleteContactHandler } = useContacts()
  const { groupOptions } = useContactForm()

  const { agentsData } = useAgents()

  const { openModal } = useModal()

  const [createCallService] = useCreateCallService()

  const gridData =
    contacts?.map((contact: any) => ({
      id: contact.id,
      name: contact.name,
      description: contact.description,
      email: contact.email,
      phone: contact.phone,
      group_id: contact.group_id,
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
                <MenuButton component={StyledCallIcon} closeDialogOnContentClick={false} zIndex={1}>
                  <StyledMenuList>
                    {agentsData?.map((agentObj: any, index: number) => {
                      const { agent } = agentObj

                      const handleView = () => {
                        openModal({
                          name: 'agent-view-modal',
                          data: {
                            agent: agentObj,
                          },
                        })
                      }

                      return (
                        <AgentChatCard
                          key={index}
                          onClick={() => createCallService()}
                          onViewClick={handleView}
                          picked={false}
                          agent={agent}
                        />
                      )
                    })}
                  </StyledMenuList>
                </MenuButton>

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
        Header: 'Group',
        accessor: 'group_id',

        Cell: ({ cell }: any) => {
          return (
            <span>
              {groupOptions
                ?.filter((group: any) => group.value === cell.value)
                .map((group: any) => group.label)}
            </span>
          )
        },
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
const StyledMenuList = styled.div`
  /* width: 100px;
  height: 100px; */
  padding: 10px;
  overflow: auto;

  max-height: 300px;

  background: ${({ theme }) => theme.body.backgroundColorSecondary};
  border: ${({ theme }) => theme.body.secondaryBorder};
  backdrop-filter: blur(100px);
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  gap: 5px;
`
