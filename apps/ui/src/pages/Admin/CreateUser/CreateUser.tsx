import React from 'react'
import {
  StyledContent,
  StyledFormContainer,
  StyledRole,
  StyledButtonContainer,
} from './CreateUserStyle'
import { FormikProvider } from 'formik'
import useCreateUser from './useCreateUser'

import { COMPANY_ROLE_OPTIONS, COMPANY_SIZE_OPTIONS } from 'utils/constants'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'

import TextField from '@l3-lib/ui-core/dist/TextField'

import Button from '@l3-lib/ui-core/dist/Button'

import Loader from '@l3-lib/ui-core/dist/Loader'

// import FormikErrorFocus from 'helpers/FormikErrorFocus'
// import SpinnerLoader from 'bf-ui/dist/SpinnerLoader'

const CreateUser = () => {
  const {
    formik,
    alertMessage,
    countries,
    loading: createUserLoading,
    handleCloseAlert,
  } = useCreateUser()

  const isUser = formik.values.role === 'user'

  return (
    <>
      <StyledContent>
        <StyledFormContainer>
          <span>Create user</span>
          <FormikProvider value={formik}>
            {createUserLoading ? (
              <Loader />
            ) : (
              <>
                <StyledRole>
                  <span>Choose the user role: </span>
                  <Dropdown
                    name='role'
                    placeholder='Choose a role'
                    options={[
                      { label: 'User', value: 'user' },
                      { label: 'Admin', value: 'admin' },
                    ]}
                  />
                </StyledRole>
                <TextField name='first_name' placeholder='First name' label='First name' />
                <TextField
                  name='last_name'
                  placeholder='Last name'
                  label='Last name'

                  // useField={useField}
                />
                {isUser && (
                  <>
                    <TextField
                      name='company_name'
                      placeholder='Company name'
                      label='Company name'
                      // useField={useField}
                    />
                    <Dropdown
                      name='company_role'
                      placeholder='Please select'
                      label='Role'
                      options={COMPANY_ROLE_OPTIONS}

                      // useField={useField}
                    />
                    <Dropdown
                      name='company_size'
                      placeholder='Please select'
                      label='Company size'
                      options={COMPANY_SIZE_OPTIONS}

                      // useField={useField}
                    />
                  </>
                )}
                <Dropdown
                  name='location'
                  placeholder='Please select'
                  label='Location'
                  options={countries}

                  // useField={useField}
                />
                <TextField
                  name='contact_number'
                  placeholder='Contact number'
                  label='Contact number'

                  // useField={useField}
                />
                <TextField
                  name='email'
                  placeholder='Email'
                  label='Email'

                  // useField={useField}
                />
              </>
            )}
          </FormikProvider>
          <StyledButtonContainer>
            <Button onClick={formik.handleSubmit}>Create user</Button>
          </StyledButtonContainer>
        </StyledFormContainer>
      </StyledContent>
    </>
  )
}

export default CreateUser
