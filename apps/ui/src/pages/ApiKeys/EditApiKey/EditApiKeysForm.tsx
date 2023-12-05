// EditApiKeyForm.js
import React from 'react'
import { FormikProvider } from 'formik'
import BackButton from 'components/BackButton'
import Button from 'share-ui/components/Button/Button'
import Loader from 'share-ui/components/Loader/Loader'
import { ButtonPrimary } from 'components/Button/Button'
import { StyledButtonWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'

import { StyledFormWrapper } from 'styles/formStyles.css'

import ApiKeysForm from '../CreateApiKey/ApiKeysForm'
import useEditApiKey from './useEditApiKey'

function EditApiKeyForm() {
  const { formik, isLoading } = useEditApiKey()
  // console.log('formik', formik)

  return (
    <>
      <FormikProvider value={formik}>
        <StyledSectionWrapper>
          <StyledHeaderGroup className='header_group'>
            <div>
              <StyledSectionTitle>Edit API Key</StyledSectionTitle>
              <StyledSectionDescription>Edit your API Key details.</StyledSectionDescription>
            </div>

            <StyledButtonWrapper>
              <BackButton />
              <ButtonPrimary
                onClick={formik?.handleSubmit}
                size={Button.sizes?.SMALL}
                disabled={isLoading}
              >
                {isLoading ? <Loader size={32} /> : 'Save'}
              </ButtonPrimary>
            </StyledButtonWrapper>
          </StyledHeaderGroup>

          <ComponentsWrapper noPadding>
            <StyledFormWrapper>
              <ApiKeysForm formik={formik} />
            </StyledFormWrapper>
          </ComponentsWrapper>
        </StyledSectionWrapper>
      </FormikProvider>
    </>
  )
}

export default EditApiKeyForm
