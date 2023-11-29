import { FormikProvider } from 'formik'

import DatasourceForm from './DatasourceForm'
import { useEditDatasource } from '../useEditDatasource'

import Button from '@l3-lib/ui-core/dist/Button'
import Loader from '@l3-lib/ui-core/dist/Loader'

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

const EditDatasourceForm = () => {
  const { formik, isLoading } = useEditDatasource()

  return (
    <>
      <FormikProvider value={formik}>
        <StyledSectionWrapper>
          <StyledHeaderGroup className='header_group'>
            <div>
              <StyledSectionTitle>{`${t('edit-datasource')}`}</StyledSectionTitle>
              <StyledCombiner>
                <StyledSectionDescription>
                  {`${t('datasource-description')}`}
                </StyledSectionDescription>
                <DatasourceDemoButton />
              </StyledCombiner>
            </div>

            <StyledButtonWrapper>
              <BackButton />
              <ButtonPrimary
                onClick={formik?.handleSubmit}
                size={Button.sizes.SMALL}
                disabled={isLoading}
              >
                {isLoading ? <Loader size={32} /> : t('save')}
              </ButtonPrimary>
            </StyledButtonWrapper>
          </StyledHeaderGroup>

          <ComponentsWrapper noPadding>
            <StyledFormWrapper>
              <DatasourceForm formik={formik} isLoading={isLoading} isEdit />
            </StyledFormWrapper>
          </ComponentsWrapper>
        </StyledSectionWrapper>
      </FormikProvider>
    </>
  )
}

export default EditDatasourceForm
