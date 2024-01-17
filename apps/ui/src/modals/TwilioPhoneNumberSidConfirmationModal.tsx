import { useState } from 'react'
import styled from 'styled-components'

//eslint-disable-next-line
import PropTypes from 'prop-types'
import withRenderModal from 'hocs/withRenderModal'
import Button from 'share-ui/components/Button/Button'
import Modal from 'share-ui/components/Modal/Modal'
import ModalFooter from 'share-ui/components/ModalFooter/ModalFooter'
import Typography from 'share-ui/components/typography/Typography'
import Loader from 'share-ui/components/Loader/Loader'

import { useTranslation } from 'react-i18next'
import { useModal } from 'hooks'

type TwilioPhoneNumberSidConfirmationModalProps = {
  data: {
    saveItem: () => void
    label: string
    title: string
  }
}

const TwilioPhoneNumberSidConfirmationModal = ({
  data,
}: TwilioPhoneNumberSidConfirmationModalProps) => {
  const { saveItem, label } = data
  const [isLoading, setIsLoading] = useState(false)

  const { closeModal } = useModal()

  const handleConfirm = async () => {
    setIsLoading(true)
    await saveItem()
    setIsLoading(false)
  }

  const handleClose = () => {
    closeModal('twilio-phone-number-sid-modal')
  }

  const { t } = useTranslation()

  return (
    <StyledTwilioPhoneNumberSidConfirmationModal
      onClose={handleClose}
      show
      backgroundColor='dark'
      hideCloseButton={true}
      title={isLoading ? `${t('processing')}` : label}
    >
      <StyledModalFooter>
        {isLoading ? (
          <StyledLoadingText>
            <Loader size={48} />
          </StyledLoadingText>
        ) : (
          <StyledActionsContainer>
            <Button
              onClick={handleClose}
              kind={Button.kinds?.TERTIARY}
              size={Button.sizes?.MEDIUM}
              disabled={isLoading}
            >
              <Typography
                value={t('cancel')}
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
              />
            </Button>

            <Button
              onClick={handleConfirm}
              kind={Button.kinds?.PRIMARY}
              size={Button.sizes?.MEDIUM}
              disabled={isLoading}
            >
              <StyledLabelTypography
                value={t('confirm')}
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
              />
            </Button>
          </StyledActionsContainer>
        )}
      </StyledModalFooter>
    </StyledTwilioPhoneNumberSidConfirmationModal>
  )
}

TwilioPhoneNumberSidConfirmationModal.propTypes = {
  openModal: PropTypes.func,
  data: PropTypes.object,
  closeModal: PropTypes.func,
}

export default withRenderModal('twilio-phone-number-sid-modal')(
  TwilioPhoneNumberSidConfirmationModal,
)

const StyledTwilioPhoneNumberSidConfirmationModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  padding: 12px;
  width: fit-content;
  height: fit-content;
`
const StyledModalFooter = styled(ModalFooter)`
  display: grid;
  position: relative;
  /* justify-content: flex-end; */
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
`
const StyledActionsContainer = styled.div`
  display: flex;
  position: relative;
  justify-items: flex-end;
  gap: 16px;
`
const StyledLabelTypography = styled(Typography)`
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
`
const StyledLoadingText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
`
