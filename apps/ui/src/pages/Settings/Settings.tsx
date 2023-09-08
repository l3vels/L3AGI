import { FormikProvider } from 'formik'

import styled from 'styled-components'

import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import {
  StyledHeaderGroup,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import { StyledButtonWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'

import Button from '@l3-lib/ui-core/dist/Button'
import Loader from '@l3-lib/ui-core/dist/Loader'

import BackButton from 'components/BackButton'

import FormikTextField from 'components/TextFieldFormik'

import { useSettings } from './useSettings'

const Settings = () => {
  const { formik, handleSubmit, isLoading } = useSettings()

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <div>
            <StyledSectionTitle>Company Settings</StyledSectionTitle>
          </div>

          <StyledButtonWrapper>
            <BackButton />
            <Button
              onClick={() => handleSubmit(formik?.values)}
              disabled={isLoading}
              size={Button.sizes.SMALL}
            >
              {isLoading ? <Loader size={32} /> : 'Save'}
            </Button>
          </StyledButtonWrapper>
        </StyledHeaderGroup>
        <ComponentsWrapper noPadding>
          <StyledForm>
            <StyledWrapper>
              <FormikTextField name='open_api_key' placeholder='' label='Open AI API key' />
              <FormikTextField
                name='hugging_face_token'
                placeholder=''
                label='Hugging Face auth token'
              />
            </StyledWrapper>
          </StyledForm>
        </ComponentsWrapper>
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default Settings

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  /* padding-top: 30px; */
`
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  width: 100%;
  max-width: 600px;

  height: 100vh;
  max-height: calc(100vh - 370px);
`
