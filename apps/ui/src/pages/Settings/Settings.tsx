import { FormikProvider } from 'formik'

import styled, { css } from 'styled-components'

import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import {
  StyledHeaderGroup,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import { StyledButtonWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'

import Button from 'share-ui/components/Button/Button'
import Loader from 'share-ui/components/Loader/Loader'

import BackButton from 'components/BackButton'

import FormikTextField from 'components/TextFieldFormik'

import { SETTINGS_FIELDS, useSettings } from './useSettings'
import { useModal } from 'hooks'
import { ButtonPrimary } from 'components/Button/Button'

const Settings = ({ isModal = false }: { isModal?: boolean }) => {
  const { formik, isLoading, handleSubmit, configsData } = useSettings()

  const { closeModal } = useModal()

  if (!configsData) return <div />

  console.log('SETTINGS_FIELDS', SETTINGS_FIELDS)

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
                size={Button.sizes?.SMALL}
              >
                {isLoading ? <Loader size={32} /> : 'Save'}
              </ButtonPrimary>
            </StyledButtonWrapper>
          </StyledHeaderGroup>
        )}
        <ComponentsWrapper noPadding hideBox={isModal}>
          <StyledForm>
            <StyledWrapper isModal={isModal}>
              {SETTINGS_FIELDS.map(({ key, label }) => (
                <FormikTextField key={key} name={key} placeholder='' label={label} />
              ))}
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
              size={Button.sizes?.SMALL}
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

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  overflow-y: auto;

  padding: 30px 10px;
  padding-bottom: 0px;
`
const StyledWrapper = styled.div<{ isModal: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 15px;

  width: 100%;
  max-width: 600px;

  height: calc(100vh - 265px);
  max-height: 1500px;

  ${props =>
    props.isModal &&
    css`
      max-height: 650px;
    `}
`
const StyledModalButton = styled.div`
  margin-left: auto;
`
