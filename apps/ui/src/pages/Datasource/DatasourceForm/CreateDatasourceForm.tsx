import { FormikProvider } from 'formik'
import DatasourceForm from './DatasourceForm'

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
import { useCreateDatasource } from '../useCreateDatasource'
import BackButton from 'components/BackButton'
import { ButtonPrimary } from 'components/Button/Button'
import { t } from 'i18next'
import { StyledFormWrapper } from 'styles/formStyles.css'

import DatasourceDemoButton from './components/DatasourceDemoButton'
import styled from 'styled-components'

const CreateDatasourceForm = ({
  createCallback,
  type,
}: {
  createCallback?: (id: string) => void
  type?: string
}) => {
  const { formik, isLoading } = useCreateDatasource({ createCallback })

  return (
    <>
      <FormikProvider value={formik}>
        <StyledSectionWrapper>
          <StyledHeaderGroup className='header_group'>
            <StyledCombiner>
              <StyledSectionTitle>{`${t('add-datasource')}`}</StyledSectionTitle>

              <DatasourceDemoButton />
            </StyledCombiner>
          </StyledHeaderGroup>

          {/* <StyledFormWrapper> */}
          <DatasourceForm formik={formik} isLoading={isLoading} type={type} />
          {/* </StyledFormWrapper> */}

          <StyledButtonWrapper>
            {/* <BackButton /> */}
            <ButtonPrimary
              onClick={formik?.handleSubmit}
              size={Button.sizes?.MEDIUM}
              disabled={isLoading}
            >
              {isLoading ? <Loader size={32} /> : 'Save'}
            </ButtonPrimary>
          </StyledButtonWrapper>
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

  width: 100%;
`
