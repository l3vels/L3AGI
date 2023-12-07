import React, { FC } from 'react'
import { useModal } from 'hooks'
import { useTranslation } from 'react-i18next'
import TableCell from '../../components/Table/components/TableCell'
import useApiKeys from './useApiKeys'
import moment from 'moment'
import Typography from 'share-ui/components/typography/Typography'
import MenuButton from 'share-ui/components/MenuButton/MenuButton'

import styled from 'styled-components'
import TypographySecondary from 'components/Typography/Secondary'
import { ButtonTertiary } from 'components/Button/Button'
import { useNavigate } from 'react-router-dom'
import IconButton from 'share-ui/components/IconButton/IconButton'

import {
  StyledDeleteIcon,
  StyledEditIcon,
} from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'

type CellProps = {
  value: any
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
    minWidth: 100,
    width: 150,
  },
  {
    Header: 'Token',
    accessor: 'token',
    minWidth: 300,
    width: 350,
  },
  {
    Header: 'Description',
    accessor: 'description',
    minWidth: 250,
    width: 300,
  },
  {
    Header: 'Created On',
    accessor: 'created_on',
    minWidth: 100,
    width: 140,
    Cell: DateRenderer,
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    minWidth: 100,
    width: 130,

    Cell: (props: { row: { original: any } }) => {
      const { original: data } = props.row
      const { handleDeleteApiKey } = useApiKeys()
      const navigate = useNavigate()
      const handleEditClick = (apiKeyId: string) => {
        navigate(`/api-key/${apiKeyId}/edit-api-key`)
      }

      return (
        <StyledActionWrapper>
          <IconButton
            onClick={() => handleDeleteApiKey(data.id)}
            icon={() => <StyledDeleteIcon />}
            size={IconButton.sizes?.SMALL}
            kind={IconButton.kinds?.TERTIARY}
            ariaLabel='Delete'
          />

          <IconButton
            onClick={() => handleEditClick(data.id)}
            icon={() => <StyledEditIcon />}
            size={IconButton.sizes?.SMALL}
            kind={IconButton.kinds?.TERTIARY}
            ariaLabel='Edit'
          />
        </StyledActionWrapper>
      )
    },
  },
]

export default columns

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
