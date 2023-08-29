import { FormikProvider } from 'formik'
import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'

import Typography from '@l3-lib/ui-core/dist/Typography'

import DatasourceForm from 'pages/Datasource/DatasourceForm'
import { useEditDatasource } from 'pages/Datasource/useEditDatasource'

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

type EditDatasourceModalProps = {
  data: {
    closeModal: () => void
    datasource: any
  }
}

const EditDatasourceModal = ({ data }: EditDatasourceModalProps) => {
  const { formik, closeEditDatasourceModal, handleSubmit, isLoading } = useEditDatasource(
    data.datasource,
  )

  return (
    <Modal isClean fullscreen show onClose={closeEditDatasourceModal}>
      <FormikProvider value={formik}>
        <StyledFormContainer>
          <StyledHeader>
            <StyledHeaderText>Edit Datasource</StyledHeaderText>
            <StyledCloseButton onClick={closeEditDatasourceModal}>
              <Typography
                value='Close'
                type={Typography.types.HEADING}
                size={Typography.sizes.xss}
                customColor={'color: rgba(255, 255, 255, 0.6)'}
              />
            </StyledCloseButton>
          </StyledHeader>

          <StyledBody>
            <DatasourceForm
              isEdit
              formik={formik}
              isLoading={isLoading}
              handleSubmit={handleSubmit}
            />
            <StyledSecondColumn />
          </StyledBody>
          <StyledFooter id='main_footer'>
            <Footer />
            <div>
              <Spotlight />
            </div>
            <div></div>
          </StyledFooter>
        </StyledFormContainer>
      </FormikProvider>
    </Modal>
  )
}

export default withRenderModal('edit-datasource-modal')(EditDatasourceModal)
