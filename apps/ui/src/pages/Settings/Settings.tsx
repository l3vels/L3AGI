import { FormikProvider } from 'formik'

import styled, { css } from 'styled-components'

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
import { useModal } from 'hooks'
import { ButtonPrimary } from 'components/Button/Button'

const Settings = ({ isModal = false }: { isModal?: boolean }) => {
  const { formik, isLoading, handleSubmit, configsData } = useSettings()

  const { closeModal } = useModal()

  if (!configsData) return <div />

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        {!isModal && (
          <StyledHeaderGroup className='header_group'>
            <div>
              <StyledSectionTitle>Company Settings</StyledSectionTitle>
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
        )}
        <ComponentsWrapper noPadding hideBox={isModal}>
          <StyledForm isModal={isModal}>
            <StyledWrapper isModal={isModal}>
              <FormikTextField name='open_api_key' placeholder='' label='Open AI API key' />
              {/* <FormikTextField
                name='hugging_face_token'
                placeholder=''
                label='Hugging Face auth token'
              /> */}
            </StyledWrapper>
          </StyledForm>
        </ComponentsWrapper>
        {isModal && (
          <StyledModalButton>
            <ButtonPrimary
              onClick={async () => {
                await handleSubmit(formik?.values)
                closeModal('settings-modal')
              }}
              disabled={isLoading}
              size={Button.sizes.SMALL}
            >
              {isLoading ? <Loader size={32} /> : 'Save'}
            </ButtonPrimary>
          </StyledModalButton>
        )}
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default Settings

const StyledForm = styled.div<{ isModal: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 30px 20px;

  ${props =>
    props.isModal &&
    css`
      padding: 0;
    `}
`
const StyledWrapper = styled.div<{ isModal: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 15px;

  width: 100%;
  max-width: 600px;

  height: 100vh;
  max-height: calc(100vh - 370px);

  ${props =>
    props.isModal &&
    css`
      height: 100%;
      padding-top: 30px;
      justify-content: center;
    `}
`
const StyledModalButton = styled.div`
  position: absolute;

  bottom: 0px;
  right: 0px;

  padding: 8px;
`
