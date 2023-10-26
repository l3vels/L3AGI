import { FormikProvider } from 'formik'

import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import ModalFooter from '@l3-lib/ui-core/dist/ModalFooter'
import Loader from '@l3-lib/ui-core/dist/Loader'

import styled from 'styled-components'

import AgentForm from 'pages/Agents/AgentForm'
import {
  StyledBody,
  StyledCloseButton,
  StyledFooter,
  StyledFormContainer,
  StyledHeader,
  StyledHeaderText,
  StyledSecondColumn,
} from './CreateDatasourceModal'
import { Footer } from 'components/Layout'
import Spotlight from 'components/Spotlight'
import CreateFineTuningForm from 'pages/Models/FineTuning/FineTuningForm/CreateFineTuningForm'
import { useModal } from 'hooks'

const CreateFineTuningModal = () => {
  // const { formik, handleSubmit, isLoading } = useAgents()

  const { closeModal } = useModal()

  const handleClose = () => {
    closeModal('create-fine-tuning-modal')
  }

  return (
    <Modal show isClean onClose={handleClose}>
      <StyledWrapper>
        <CreateFineTuningForm />
      </StyledWrapper>
    </Modal>
  )
}

export default withRenderModal('create-fine-tuning-modal')(CreateFineTuningModal)

const StyledWrapper = styled.div`
  width: 100vw;
  max-width: 800px;
`
