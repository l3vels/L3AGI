import React from 'react'
import { FormikProvider } from 'formik'
import BackButton from 'components/BackButton'
import Button from '@l3-lib/ui-core/dist/Button'
import Loader from '@l3-lib/ui-core/dist/Loader'
import { ButtonPrimary } from 'components/Button/Button'
import { StyledButtonWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import ApiKeysForm from './ApiKeysForm'
import { useCreateApiKey } from './useCreateApiKey'
import { StyledFormWrapper } from 'styles/formStyles.css'

function CreateApiKeyForm() {
  const { formik, isLoading } = useCreateApiKey()

  return (
    <>
      <FormikProvider value={formik}>
        <StyledSectionWrapper>
          <StyledHeaderGroup className='header_group'>
            <div>
              <StyledSectionTitle>Add API Key</StyledSectionTitle>
              <StyledSectionDescription>Here is your API Key.</StyledSectionDescription>
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
              {/* Pass the apiKeys data to ApiKeysForm component */}
              <ApiKeysForm formik={formik} />
            </StyledFormWrapper>
          </ComponentsWrapper>
        </StyledSectionWrapper>
      </FormikProvider>
    </>
  )
}

export default CreateApiKeyForm
