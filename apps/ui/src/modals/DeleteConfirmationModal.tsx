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
import TypographyPrimary from 'components/Typography/Primary'

type DeleteConfirmationModalProps = {
  data: {
    deleteItem: () => void
    label: string
    title: string
  }
}

const DeleteConfirmationModal = ({ data }: DeleteConfirmationModalProps) => {
  const { deleteItem, label } = data
  const [isLoading, setIsLoading] = useState(false)

  const { closeModal } = useModal()

  const handleConfirm = async () => {
    setIsLoading(true)
    await deleteItem()
    setIsLoading(false)
  }

  const handleClose = () => {
    closeModal('delete-confirmation-modal')
  }

  const { t } = useTranslation()

  return (
    <StyledDeleteConfirmationModal
      onClose={handleClose}
      show
      backgroundColor='light'
      hideCloseButton={true}
      // title={isLoading ? `${t('processing')}` : label}
    >
      <StyledBody>
        <TypographyPrimary
          value={isLoading ? `${t('processing')}` : label}
          size={Typography.sizes.lg}
        />
      </StyledBody>

      {isLoading ? (
        <StyledLoadingText>
          <Loader size={48} />
        </StyledLoadingText>
      ) : (
        <StyledActionsContainer>
          <Button
            onClick={handleClose}
            kind={Button.kinds?.TERTIARY}
            size={Button.sizes?.SMALL}
            disabled={isLoading}
          >
            <Typography
              value={t('cancel')}
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
            />
          </Button>

          <Button
            onClick={handleConfirm}
            kind={Button.kinds?.PRIMARY}
            size={Button.sizes?.SMALL}
            disabled={isLoading}
          >
            <StyledLabelTypography
              value={t('confirm')}
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
            />
          </Button>
        </StyledActionsContainer>
      )}
    </StyledDeleteConfirmationModal>
  )
}

DeleteConfirmationModal.propTypes = {
  openModal: PropTypes.func,
  data: PropTypes.object,
  closeModal: PropTypes.func,
}

export default withRenderModal('delete-confirmation-modal')(DeleteConfirmationModal)

const StyledBody = styled.div`
  width: 12vw;
  height: 12vh;

  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledDeleteConfirmationModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  padding: 12px;
  width: fit-content;
  height: fit-content;
`

export const StyledActionsContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-end;
  gap: 16px;

  width: 100%;
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
