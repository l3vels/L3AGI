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

import { openLinkTab } from 'components/HeaderButtons/HeaderButtons'
import TypographySecondary from 'components/Typography/Secondary'
import { useModal } from 'hooks'
import CopyButton from 'components/CopyButton'
import { useCreateChatService } from 'services/chat/useCreateChat'
import { FormikProvider, useFormik } from 'formik'
import { useState } from 'react'
import FormikTextField from 'components/TextFieldFormik'
import { useChatsService } from 'services/chat/useChatsService'
import TypographyPrimary from 'components/Typography/Primary'
import HeadingPrimary from 'components/Heading/Primary'
import { ButtonPrimary, ButtonTertiary } from 'components/Button/Button'

type ChatLinkModalProps = {
  data: {
    agentId: string
  }
}

const ChatLinkModal = ({ data }: ChatLinkModalProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { agentId } = data

  const [chatLink, setChatLink] = useState<string | null>(null)

  const { refetch: refetchChat } = useChatsService()

  const { closeModal } = useModal()

  const { t } = useTranslation()

  const [createChat] = useCreateChatService()

  const initialValues = {
    chat_name: '',
  }
  const handleSubmit = async (values: any) => {
    setIsLoading(true)
    try {
      const res = await createChat({ agent_id: agentId, name: values.chat_name })
      await refetchChat()
      setChatLink(`${import.meta.env.REACT_APP_DOMAIN_NAME}/chat/session?chat=${res.id}`)
    } catch (e) {
      console.log(e)
    }
    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async values => handleSubmit(values),
    // validationSchema: agentValidationSchema,
    // enableReinitialize: true,
  })

  return (
    <StyledChatLinkModal
      onClose={() => closeModal('chat-link-modal')}
      show
      backgroundColor='dark'
      hideCloseButton={true}
      title={
        chatLink ? (
          <HeadingPrimary
            value={'Create Session'}
            type={Typography.types.P}
            size={Typography.sizes.md}
          />
        ) : (
          <HeadingPrimary
            value={'Create Session'}
            type={Typography.types.P}
            size={Typography.sizes.md}
          />
        )
      }
    >
      <FormikProvider value={formik}>
        <StyledBody>
          {chatLink ? (
            <>
              <StyledLinkWrapper>
                <StyledLink
                  onClick={() => {
                    openLinkTab(chatLink)
                  }}
                >
                  <TypographyPrimary
                    value={chatLink}
                    type={Typography.types.P}
                    size={Typography.sizes.md}
                  />
                </StyledLink>
                <CopyButton onCopyClick={() => navigator.clipboard.writeText(chatLink)} />
              </StyledLinkWrapper>
            </>
          ) : (
            <FormikTextField name='chat_name' placeholder='Name' label='Name' />
          )}
        </StyledBody>
      </FormikProvider>
      <StyledModalFooter>
        <ButtonTertiary onClick={() => closeModal('chat-link-modal')} size={Button.sizes.MEDIUM}>
          <Typography value='Cancel' type={Typography.types.LABEL} size={Typography.sizes.sm} />
        </ButtonTertiary>

        {!chatLink && (
          <ButtonPrimary
            onClick={formik?.handleSubmit}
            size={Button.sizes.MEDIUM}
            disabled={isLoading}
          >
            {isLoading ? <Loader size={20} /> : 'Confirm'}
          </ButtonPrimary>
        )}
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
  /* padding: 12px; */
  width: fit-content;
  height: fit-content;
  color: ${({ theme }) => theme.body.textColorPrimary} !important;
`
const StyledModalFooter = styled(ModalFooter)`
  display: flex;
  justify-content: flex-end;
  gap: 4px;
`

const StyledLink = styled.span`
  cursor: pointer;
`
const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  gap: 30px;
  width: 100vw;
  max-width: 650px;

  margin-top: 30px;
`
const StyledLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

const StyledDiv = styled.div`
  color: ${({ theme }) => theme.body.textColorPrimary} !important;
`
