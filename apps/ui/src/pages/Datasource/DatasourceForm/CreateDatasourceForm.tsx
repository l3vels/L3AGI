import { FormikProvider } from 'formik'
import DatasourceForm from './DatasourceForm'

import Button from '@l3-lib/ui-core/dist/Button'
import Loader from '@l3-lib/ui-core/dist/Loader'
import Typography from '@l3-lib/ui-core/dist/Typography'

import Play from '@l3-lib/ui-core/dist/icons/PlayOutline'

import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { StyledButtonWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'
import { useCreateDatasource } from '../useCreateDatasource'
import BackButton from 'components/BackButton'
import { ButtonPrimary } from 'components/Button/Button'
import { t } from 'i18next'
import { StyledFormWrapper } from 'styles/formStyles.css'

import DatasourceDemoButton from './components/DatasourceDemoButton'
import styled from 'styled-components'

const CreateDatasourceForm = () => {
  const { formik, isLoading } = useCreateDatasource()

  return (
    <>
      <FormikProvider value={formik}>
        <StyledSectionWrapper>
          <StyledHeaderGroup className='header_group'>
            <div>
              <StyledSectionTitle>{`${t('add-datasource')}`}</StyledSectionTitle>
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
                {isLoading ? <Loader size={32} /> : 'Save'}
              </ButtonPrimary>
            </StyledButtonWrapper>
          </StyledHeaderGroup>

          <ComponentsWrapper noPadding>
            <StyledFormWrapper>
              <DatasourceForm formik={formik} isLoading={isLoading} />
            </StyledFormWrapper>
          </ComponentsWrapper>
        </StyledSectionWrapper>
      </FormikProvider>
    </>
  )
}

export default CreateDatasourceForm

export const StyledCombiner = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`
