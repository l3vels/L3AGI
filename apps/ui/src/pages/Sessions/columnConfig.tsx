import React, { FC, useContext } from 'react'
import { useModal } from 'hooks'

import moment from 'moment'
import Typography from 'share-ui/components/typography/Typography'
import styled from 'styled-components'
import TypographySecondary from 'components/Typography/Secondary'

import { useNavigate } from 'react-router-dom'
import IconButton from 'share-ui/components/IconButton/IconButton'

import {
  StyledDeleteIcon,
  StyledEyeOpenIcon,
} from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'
import { useChatsService } from 'services/chat/useChatsService'
import { useDeleteChatService } from 'services/chat/useDeleteChatService'
import { ToastContext } from 'contexts'
import { Nullable } from 'types'

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
    const formattedDate = moment(value).fromNow()
    content = <span>{formattedDate}</span>
  }

  return content
}

const columns = [
  {
    Header: 'Name',
    accessor: 'name',
    minWidth: 300,
    width: 350,
  },
  // {
  //   Header: 'Team Name',
  //   accessor: 'team_name',
  //   minWidth: 150,
  //   width: 200,
  // },
  {
    Header: 'Agent Name',
    accessor: 'agent_name',
    minWidth: 300,
    width: 350,
  },
  {
    Header: 'Status',
    accessor: 'status',
    minWidth: 300,
    width: 350,
  },
  {
    Header: 'Sender Name',
    accessor: 'sender_name',
    minWidth: 300,
    width: 350,
  },
  // {
  //   Header: 'Schedule Name',
  //   accessor: 'schedule_name',
  //   minWidth: 150,
  //   width: 200,
  // },
  {
    Header: 'Created Date',
    accessor: 'created_date',
    minWidth: 300,
    width: 350,
    Cell: DateRenderer,
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    minWidth: 100,
    width: 110,

    Cell: (props: { row: { original: any } }) => {
      const { original: data } = props.row
      const { data: chatsData, refetch: refetchChat } = useChatsService()
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
            size={IconButton.sizes?.SMALL}
            kind={IconButton.kinds?.TERTIARY}
            ariaLabel='Delete'
          />

          <IconButton
            onClick={() => handleViewClick(data.id)}
            icon={() => <StyledEyeOpenIcon />}
            size={IconButton.sizes?.SMALL}
            kind={IconButton.kinds?.TERTIARY}
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
