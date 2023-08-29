import React, { useState } from 'react'
import styled from 'styled-components'
import { FormikProvider } from 'formik'

import Button from '@l3-lib/ui-core/dist/Button'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import FormikTextField from 'components/TextFieldFormik'
import useTeams from './useTeams'

type TeamFormProps = {
  formik: any
  assignedUserList: any
}

const TeamForm = ({ formik, assignedUserList }: TeamFormProps) => {
  const { closeModal } = useTeams()
  const [error, setError] = useState<string>('')
  const [emailExists, setEmailExists] = useState<boolean>(false)

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const sharedEmail = event.target.value
    const emailExists = assignedUserList.some(
      (user: { email: string }) => user.email === sharedEmail,
    )
    setEmailExists(emailExists)
    if (emailExists) {
      setError('This email is already added.')
    } else {
      setError('')
    }
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sharedEmail = event.target.value
    const emailExists = assignedUserList.some(
      (user: { email: string }) => user.email === sharedEmail,
    )
    setEmailExists(emailExists)
    if (emailExists) {
      setError('This email is already added.')
    } else {
      setError('')
    }
  }

  const handleSubmit = async () => {
    const sharedEmail = formik.values.shared_email

    const emailExists = assignedUserList.some(
      (user: { assigned_user_email: string }) => user.assigned_user_email === sharedEmail,
    )
    if (emailExists) {
      setError('This email is already added.')
    } else {
      setError('')
      await formik.handleSubmit()
      closeModal('create-team-modal')
    }
  }

  return (
    <StyledContainer>
      <FormikProvider value={formik}>
        <StyledHeaderWrapper>
          <StyledHeading type={Heading.types.h1} size={Heading.sizes.sm} value='Add member' />
        </StyledHeaderWrapper>
        <StyledEmailWrapper>
          <Typography value='Email' type={Typography.types.LABEL} size={Typography.sizes.md} />
        </StyledEmailWrapper>
        <StyledEmailFieldWrapper>
          <FormikTextField
            field_name='shared_email'
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
            onBlur={handleBlur}
            onChange={handleEmailChange}
          />
        </StyledEmailFieldWrapper>
        {error && <StyledError>{error}</StyledError>}
        <StyledButtonsWrapper>
          <Button
            onClick={() => closeModal('create-team-modal')}
            kind={Button.kinds.TERTIARY}
            size={Button.sizes.LARGE}
          >
            <Typography value='Cancel' type={Typography.types.LABEL} size={Typography.sizes.md} />
          </Button>

          <Button
            type={Button.types.SUBMIT}
            onClick={handleSubmit}
            kind={Button.kinds.PRIMARY}
            size={Button.sizes.LARGE}
          >
            <Typography value='Add' type={Typography.types.LABEL} size={Typography.sizes.md} />
          </Button>
        </StyledButtonsWrapper>
      </FormikProvider>
    </StyledContainer>
  )
}

export default TeamForm

const StyledHeading = styled(Heading)`
  font-size: 24px !important;
  line-height: 32px !important;
  font-weight: 500 !important;
  color: #ffffff;
`
// const StyledHeading = styled(Heading)`
//   font-size: 24px !important;
//   line-height: ;
// `
const StyledHeaderWrapper = styled.div`
  display: flex;
  position: Relative;
  width: 420px;
  margin-top: 12px;
  height: 32px;
`
const StyledEmailWrapper = styled.div`
  display: flex;
  position: Relative;
  width: 41px;
  height: 20px;
  color: #ffffff;
  margin-top: 34px;
`
const StyledEmailFieldWrapper = styled.div`
  display: flex;
  position: Relative;
  width: 436px;
  height: 56px;
  margin-top: 12px;
`

const StyledRoleWrapper = styled.div`
  display: flex;
  position: Relative;
  width: 41px;
  height: 20px;
  color: #ffffff;
  margin-top: 16px;
  margin-bottom: 12px;
`
const StyledButtonsWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 60px;
  margin-top: 30px;
  gap: 40px;
  //   top: 15px;
  bottom: 2px;
`
const StyledContainer = styled.div`
  display: grid;
  position: relative;
  width: 500px;
  height: fit-content;
  bottom: 140px;
  background: rgba(0, 0, 0, 0.5);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 6px;
  mix-blend-mode: normal;
  backdrop-filter: blur(100px);
  padding: 32px;
  border-radius: 16px;
  overflow: auto;
  //   top: 140px;
`
const StyledError = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 8px;
`
