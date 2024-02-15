import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'

import { ButtonPrimary, ButtonSecondary } from 'components/Button/Button'

import IconButton from 'share-ui/components/IconButton/IconButton'

import { StyledHeaderGroup, StyledSectionWrapper } from 'pages/Home/homeStyle.css'
import { useContacts } from './useContacts'

import {
  StyledDeleteIcon,
  StyledEditIcon,
} from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'

import { useMemo } from 'react'
import Table from 'components/Table'
import { StyledTableButtons } from '../Group/Groups'

import Microphone from 'share-ui/components/Icon/Icons/components/Microphone'

import { useAgents } from 'pages/Agents/useAgents'

import { t } from 'i18next'
import { StyledButtonsWrapper } from 'styles/globalStyle.css'
import { StyledMobileIcon } from 'pages/Navigation/MainNavigation'
import ContactMenu from './contactComponents/ContactMenu'
import { isVoiceAgent } from 'utils/agentUtils'

const Contacts = () => {
  const navigate = useNavigate()

  const params = useParams()
  const { groupId } = params

  const { contacts, deleteContactHandler, handleCall, handleEndCall } = useContacts()

  const { agentsData } = useAgents()

  const voiceAgents = agentsData?.filter(agentData => isVoiceAgent(agentData.agent.agent_type))
  const outboundAgents = agentsData?.filter(agentData => agentData.agent.agent_type === 'outbound')

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
        width: 225,
      },
      {
        Header: 'Phone',
        accessor: 'phone',
        width: 200,
        Cell: ({ cell }: any) => {
          return (
            <StyledPhoneCell>
              <StyledPhoneText>{cell.value}</StyledPhoneText>
              <StyledTableButtons>
                <ContactMenu
                  ariaLabel={t('call-browser')}
                  icon={StyledCallIcon}
                  agentData={voiceAgents}
                  handleCall={handleCall}
                  contactId={cell?.row?.original?.id}
                  callType={'browser'}
                />
                <ContactMenu
                  ariaLabel={t('call-phone')}
                  icon={StyledMobileIcon}
                  agentData={outboundAgents}
                  handleCall={handleCall}
                  contactId={cell?.row?.original?.id}
                  callType={'outbound'}
                />

                {/* <IconButton
                  onClick={handleEndCall}
                  icon={() => <StyledCloseIcon size={25} />}
                  size={IconButton.sizes?.SMALL}
                  kind={IconButton.kinds?.TERTIARY}
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
        width: 200,
      },
      // {
      //   Header: 'Group',
      //   accessor: 'group_id',
      //   width: 100,
      //   Cell: ({ cell }: any) => {
      //     return (
      //       <span>
      //         {groupOptions
      //           ?.filter((group: any) => group.value === cell.value)
      //           .map((group: any) => group.label)}
      //       </span>
      //     )
      //   },
      // },
      {
        Header: 'Description',
        accessor: 'description',
        width: 250,
      },
      {
        Header: 'Actions',
        accessor: 'id',
        width: 100,
        Cell: ({ cell }: any) => {
          return (
            <StyledTableButtons>
              <IconButton
                onClick={() => deleteContactHandler(cell.value)}
                icon={() => <StyledDeleteIcon />}
                size={IconButton.sizes?.SMALL}
                kind={IconButton.kinds?.TERTIARY}
                // ariaLabel='Delete'
              />

              <IconButton
                onClick={() =>
                  navigate(`/datasources/${groupId}/edit-group/${cell.value}/edit-contact`)
                }
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
    [agentsData, handleEndCall],
  )

  const filteredContacts = gridData?.filter((data: any) => data.group_id === groupId)

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <StyledButtonsWrapper>
          {/* <ButtonPrimary onClick={() => navigate('/contacts/import-contacts')} size={'small'}>
            {t('import-contacts')}
          </ButtonPrimary> */}
          <ButtonSecondary
            onClick={() => navigate(`/datasources/${groupId}/edit-group/create-contact`)}
            size={'small'}
          >
            {t('add-contact')}
          </ButtonSecondary>
        </StyledButtonsWrapper>
      </StyledHeaderGroup>

      <Table columns={columns} data={filteredContacts} />
    </StyledSectionWrapper>
  )
}

export default Contacts

const StyledPhoneCell = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`
export const StyledCallIcon = styled(Microphone)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`

const StyledPhoneText = styled.span`
  max-width: 60%;
  overflow: hidden;
`
export const StyledTableWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 15px;
  overflow: auto;
  max-height: calc(100vh - 325px);
`
