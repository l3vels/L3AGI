import { FormikProvider } from 'formik'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import Button from '@l3-lib/ui-core/dist/Button'
import Loader from '@l3-lib/ui-core/dist/Loader'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'

import BackButton from 'components/BackButton'
import { ButtonPrimary } from 'components/Button/Button'
import { StyledButtonWrapper, StyledFormWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'

import ContactForm from './ContactForm'
import { useEditContact } from '../useEditContact'

const EditContactForm = () => {
  const { isLoading, formik } = useEditContact()

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <div>
            <StyledSectionTitle>Edit Contact</StyledSectionTitle>
            {/* <StyledSectionDescription>
          Here are all your agents, managing tasks and operations.
        </StyledSectionDescription> */}
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
            <ContactForm formik={formik} />
          </StyledFormWrapper>
        </ComponentsWrapper>
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default EditContactForm
