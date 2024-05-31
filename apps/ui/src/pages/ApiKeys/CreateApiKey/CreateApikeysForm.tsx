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
            <div style={{ width: '100%' }}>
              <StyledSectionTitle>Add API Key</StyledSectionTitle>
            </div>

            <StyledButtonWrapper>
              <BackButton />
              <ButtonPrimary
                onClick={formik?.handleSubmit}
                size={Button.sizes?.MEDIUM}
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
