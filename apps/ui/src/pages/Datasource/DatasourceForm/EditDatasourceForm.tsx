import { FormikProvider } from 'formik'

import DatasourceForm from './DatasourceForm'
import { useEditDatasource } from '../useEditDatasource'

import Button from 'share-ui/components/Button/Button'
import Loader from 'share-ui/components/Loader/Loader'

import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { StyledButtonWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'
import BackButton from 'components/BackButton'
import { ButtonPrimary } from 'components/Button/Button'
import { t } from 'i18next'
import { StyledFormWrapper } from 'styles/formStyles.css'
import DatasourceDemoButton from './components/DatasourceDemoButton'
import { StyledCombiner } from './CreateDatasourceForm'

const EditDatasourceForm = ({ incomingDatasourceId }: { incomingDatasourceId?: string }) => {
  const { formik, isLoading } = useEditDatasource({ incomingDatasourceId })

  return (
    <>
      <FormikProvider value={formik}>
        <StyledSectionWrapper>
          {/* <StyledHeaderGroup className='header_group'>
            <StyledCombiner>
              <StyledSectionTitle>{`${t('edit-datasource')}`}</StyledSectionTitle>
            </StyledCombiner>
          </StyledHeaderGroup> */}

          {/* <StyledFormWrapper> */}
          <DatasourceForm formik={formik} isLoading={isLoading} isEdit />
          {/* </StyledFormWrapper> */}

          <StyledButtonWrapper>
            {/* <BackButton /> */}
            <ButtonPrimary
              onClick={formik?.handleSubmit}
              size={Button.sizes?.MEDIUM}
              disabled={isLoading}
            >
              {isLoading ? <Loader size={32} /> : t('save')}
            </ButtonPrimary>
          </StyledButtonWrapper>
        </StyledSectionWrapper>
      </FormikProvider>
    </>
  )
}

export default EditDatasourceForm
