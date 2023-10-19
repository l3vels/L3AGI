import { FormikProvider } from 'formik'

import AgentForm from './AgentForm'

import Button from '@l3-lib/ui-core/dist/Button'
import Loader from '@l3-lib/ui-core/dist/Loader'

import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import styled from 'styled-components'
import BackButton from 'components/BackButton'
// import { useNavigate } from 'react-router-dom'
import { ButtonPrimary } from 'components/Button/Button'
import { useCreateAgent } from '../useCreateAgent'
import { t } from 'i18next'

const CreateAgentForm = () => {
  const { formik, isLoading } = useCreateAgent()

  // const navigate = useNavigate()

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <div>
            <StyledSectionTitle>{`${t('add-agent')}`}</StyledSectionTitle>
            {/* <StyledSectionDescription>{`${t('agent-description')}`}</StyledSectionDescription> */}
          </div>

          <StyledButtonWrapper>
            <BackButton />

            <ButtonPrimary
              onClick={formik?.handleSubmit}
              disabled={isLoading}
              size={Button.sizes.SMALL}
            >
              {isLoading ? <Loader size={32} /> : 'Save'}
            </ButtonPrimary>
          </StyledButtonWrapper>
        </StyledHeaderGroup>

        <ComponentsWrapper noPadding>
          <StyledFormWrapper>
            <AgentForm formik={formik} />
          </StyledFormWrapper>
        </ComponentsWrapper>
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default CreateAgentForm

export const StyledFormWrapper = styled.div`
  width: 100%;

  height: calc(100vh - 250px);

  max-height: 1500px;
`
export const StyledButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;
`
