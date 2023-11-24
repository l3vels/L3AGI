import React, { FC, useContext } from 'react'
import { useModal } from 'hooks'

import moment from 'moment'
import Typography from '@l3-lib/ui-core/dist/Typography'
import styled from 'styled-components'
import TypographySecondary from 'components/Typography/Secondary'

import { Navigate, useNavigate } from 'react-router-dom'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import {
  StyledDeleteIcon,
  StyledEditIcon,
  StyledEyeOpenIcon,
} from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'
import { useChatsService } from 'services/chat/useChatsService'
import { useDeleteChatService } from 'services/chat/useDeleteChatService'
import { ToastContext } from 'contexts'
import { AgentWithConfigs, Nullable } from 'types'
import Edit from '@l3-lib/ui-core/dist/icons/Edit'
import SearchOutline from '@l3-lib/ui-core/dist/icons/SearchOutline'
import { useAgentsService } from 'services/agent/useAgentsService'
import AudioPlayer from 'components/AudioPlayer'

type CellProps = {
  value: Nullable<string>
}

const DateRenderer: React.FC<CellProps> = ({ value }) => {
  let content = null

  if (value === null) {
    const currentTime = moment().fromNow()
    content = (
      <TypographySecondary
        value={currentTime}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
      />
    )
  } else {
    const formattedDate = moment(value).format('MMM DD, YYYY')
    const formattedTime = moment(value).format('h:mm A')
    content = (
      <StyledDateWrapper>
        <TypographySecondary
          value={formattedDate}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
        />
        <TypographySecondary
          value={formattedTime}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
        />
      </StyledDateWrapper>
    )
  }

  return content
}

const columns = [
  {
    Header: 'Name',
    accessor: 'name',
    minWidth: 343,
    width: '24.8%',
  },
  // {
  //   Header: 'Team Name',
  //   accessor: 'team_name',
  //   minWidth: 342,
  //   width: 200,
  // },
  {
    Header: 'Agent Name',
    accessor: 'agent_name',
    minWidth: 342,
    width: '24.8%',
    Cell: (props: { row: { original: any } }) => {
      const { original: data } = props.row
      const navigate = useNavigate()
      const { openModal } = useModal()

      const { data: agentsData } = useAgentsService()

      const handleAgentEditClick = () => {
        const agentIdToEdit = data.agent_id

        const agentToEdit = agentsData.find(agent => agent.agent.id === agentIdToEdit)

        if (agentToEdit) {
          navigate(`/agents/${agentToEdit.agent.id}/edit-agent`)
        }
      }

      const handleViewClick = () => {
        const selectedAgent = agentsData.find(agentObj => agentObj.agent.id === data.agent_id)

        if (selectedAgent) {
          openModal({ name: 'agent-view-modal', data: { agent: selectedAgent } })
        }
      }

      return (
        <StyledAgentNameCell>
          <TypographySecondary
            value={data.agent_name}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
          />
          <StyledAgentIconsWrapper>
            <IconButton
              onClick={() => handleAgentEditClick()}
              icon={() => <StyledEditIcon />}
              size={IconButton.sizes.SMALL}
              kind={IconButton.kinds.TERTIARY}
              ariaLabel='Edit'
              className='eye-icon'
            />

            <IconButton
              onClick={() => handleViewClick()}
              icon={() => <StyledEyeOpenIcon />}
              size={IconButton.sizes.SMALL}
              kind={IconButton.kinds.TERTIARY}
              ariaLabel='View'
              className='search-icon'
            />
          </StyledAgentIconsWrapper>
        </StyledAgentNameCell>
      )
    },
  },
  {
    Header: 'Status',
    accessor: 'status',
    minWidth: 343,
    width: '24.8%',
  },
  {
    Header: 'Voice',
    accessor: 'sender_name',
    minWidth: 343,
    width: '24.8%',
    Cell: (props: { row: { original: any } }) => {
      const { original: data } = props.row

      if (data.voice_url !== null) {
        const audioUrl = data.voice_url

        return <AudioPlayer audioUrl={audioUrl} />
      }

      return null
    },
  },
  // {
  //   Header: 'Schedule Name',
  //   accessor: 'schedule_name',
  //   minWidth: 343,
  //   width: 200,
  // },
  {
    Header: 'Created Date',
    accessor: 'added_at',
    minWidth: 343,
    width: '24.8%',
    Cell: DateRenderer,
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    minWidth: 150,
    width: '10.39%',

    Cell: (props: { row: { original: any } }) => {
      const { original: data } = props.row
      const { refetch: refetchChat } = useChatsService()

      const { deleteChat } = useDeleteChatService()
      const { openModal, closeModal } = useModal()
      const { setToast } = useContext(ToastContext)
      const deleteChatHandler = async (id: string) => {
        openModal({
          name: 'delete-confirmation-modal',
          data: {
            deleteItem: async () => {
              try {
                await deleteChat(id)
                await refetchChat()
                // navigate('/chat');
                setToast({
                  message: 'Chat was deleted!',
                  type: 'positive',
                  open: true,
                })
              } catch (e) {
                setToast({
                  message: 'Failed to delete Chat!',
                  type: 'negative',
                  open: true,
                })
              }
              closeModal('delete-confirmation-modal')
            },
            label: 'Delete Session?',
          },
        })
      }

      const navigate = useNavigate()
      const handleViewClick = (id: string) => {
        navigate(`/chat/session?chat=${id}`)
      }

      return (
        <StyledActionWrapper>
          <IconButton
            onClick={() => deleteChatHandler(data.id)}
            icon={() => <StyledDeleteIcon />}
            size={IconButton.sizes.SMALL}
            kind={IconButton.kinds.TERTIARY}
            ariaLabel='Delete'
          />

          <IconButton
            onClick={() => handleViewClick(data.id)}
            icon={() => <StyledEyeOpenIcon />}
            size={IconButton.sizes.SMALL}
            kind={IconButton.kinds.TERTIARY}
            ariaLabel='View'
          />
        </StyledActionWrapper>
      )
    },
  },
]

export default columns

export const StyledMenuDots = styled.div`
  .menu-button--wrapper.menu-button--wrapper--size-32 {
    &:hover {
      background: ${({ theme }) => theme.body.humanMessageBgColor};
    }
    path {
      stroke: ${({ theme }) => theme.body.iconColor};
    }
  }
`

export const StyledMenuButtonsWrapper = styled.div`
  background: ${({ theme }) => theme.body.backgroundColorSecondary};
  border: ${({ theme }) => theme.body.secondaryBorder};
  backdrop-filter: blur(100px);
  padding: 10px;
  border-radius: 10px;
  width: 200px;
  min-width: fit-content;

  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const StyledOutlineIcon = styled.div`
  color: transparent;
  /* width: 40px; */
`

const StyledActionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .components-IconButton-IconButton-module__iconButtonContainer--ttuRB {
    &:hover {
      background: ${({ theme }) => theme.body.humanMessageBgColor};
      border-radius: 50%;
    }
  }
`

const StyledAgentNameCell = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 5px;

  .components-IconButton-IconButton-module__iconButtonContainer--ttuRB {
    &:hover {
      background: ${({ theme }) => theme.body.humanMessageBgColor};
      border-radius: 50%;
    }
  }
`
const StyledAgentIconsWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  bottom: 11px;
  margin-left: auto;
  opacity: 0;

  ${StyledAgentNameCell}:hover & {
    opacity: 1;
  }

  .edit-icon,
  .search-icon {
    margin-left: 10px;
  }
`

const StyledDateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`
