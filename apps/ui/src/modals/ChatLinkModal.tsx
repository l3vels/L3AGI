import { useState } from 'react'
import styled from 'styled-components'
//eslint-disable-next-line
import PropTypes from 'prop-types'
import withRenderModal from 'hocs/withRenderModal'
import Button from '@l3-lib/ui-core/dist/Button'
import Modal from '@l3-lib/ui-core/dist/Modal'
import ModalFooter from '@l3-lib/ui-core/dist/ModalFooter'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Loader from '@l3-lib/ui-core/dist/Loader'

import { useTranslation } from 'react-i18next'
import TypographyPrimary from 'components/Typography/Primary'
import { openLinkTab } from 'components/HeaderButtons/HeaderButtons'
import TypographySecondary from 'components/Typography/Secondary'
import { useModal } from 'hooks'
import CopyButton from 'components/CopyButton'

type ChatLinkModalProps = {
  data: {
    chatLink: string
  }
}

const ChatLinkModal = ({ data }: ChatLinkModalProps) => {
  const { chatLink } = data

  const { closeModal } = useModal()

  const { t } = useTranslation()

  return (
    <StyledChatLinkModal
      onClose={() => closeModal('chat-link-modal')}
      show
      backgroundColor='dark'
      hideCloseButton={true}
      //   title={isLoading ? 'Processing...' : label}
    >
      <StyledText>
        <TypographyPrimary
          value={'Copy your Link'}
          type={Typography.types.P}
          size={Typography.sizes.lg}
        />

        <StyledLinkWrapper>
          <StyledLink
            onClick={() => {
              openLinkTab(`http://localhost:3000/chat/client?chat=${chatLink}`)
            }}
          >
            <TypographySecondary
              value={`http://localhost:3000/chat/client?chat=${chatLink}`}
              type={Typography.types.P}
              size={Typography.sizes.md}
            />
          </StyledLink>
          <CopyButton
            onCopyClick={() =>
              navigator.clipboard.writeText(`http://localhost:3000/chat/client?chat=${chatLink}`)
            }
          />
        </StyledLinkWrapper>
      </StyledText>
      <StyledModalFooter>
        <Button
          onClick={() => closeModal('chat-link-modal')}
          kind={Button.kinds.TERTIARY}
          size={Button.sizes.SMALL}
        >
          <Typography value='Cancel' type={Typography.types.LABEL} size={Typography.sizes.sm} />
        </Button>
      </StyledModalFooter>
    </StyledChatLinkModal>
  )
}

ChatLinkModal.propTypes = {
  openModal: PropTypes.func,
  data: PropTypes.object,
  closeModal: PropTypes.func,
}

export default withRenderModal('chat-link-modal')(ChatLinkModal)

const StyledChatLinkModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  padding: 12px;
  width: fit-content;
  height: fit-content;
`
const StyledModalFooter = styled(ModalFooter)`
  display: flex;
  justify-content: flex-end;
`

const StyledLink = styled.span`
  cursor: pointer;
`
const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  gap: 30px;
  width: 100%;
`
const StyledLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`
