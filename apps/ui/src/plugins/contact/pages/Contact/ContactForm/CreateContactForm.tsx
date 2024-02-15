import BackButton from 'components/BackButton'
import { ButtonPrimary } from 'components/Button/Button'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { StyledButtonWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'
import {
  StyledHeaderGroup,
  // StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import Button from 'share-ui/components/Button/Button'
import Loader from 'share-ui/components/Loader/Loader'

import { FormikProvider } from 'formik'

import { useCreateContact } from '../useCreateContract'

import ContactForm from './ContactForm'
import { StyledFormWrapper } from 'styles/formStyles.css'

const CreateContactForm = () => {
  const { formik, isLoading } = useCreateContact()

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <div>
            <StyledSectionTitle>Add Contact</StyledSectionTitle>
          </div>
        </StyledHeaderGroup>

        <StyledFormWrapper>
          <ContactForm formik={formik} />
        </StyledFormWrapper>

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
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default CreateContactForm
