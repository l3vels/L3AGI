import React from 'react'
import styled from 'styled-components'
import { useFormik, FormikProvider } from 'formik'

import Button from '@l3-lib/ui-core/dist/Button'
import TextField from '@l3-lib/ui-core/dist/TextField'

type ViewUserProps = {
  searchValue: string
  onSubmit: (search: string) => void
}

const SearchUsers = ({ searchValue, onSubmit }: ViewUserProps) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { search: searchValue },
    onSubmit: async values => {
      onSubmit(values.search)
    },
  })

  const onReset = () => {
    formik.resetForm()
    onSubmit('')
  }

  const onKeyPressEvent = (e: any) => {
    if (e.keyCode === 13) {
      formik.handleSubmit()
    }
  }

  return (
    <Root>
      <FormikProvider value={formik}>
        <TextField
          placeholder='Search with email, name or role'
          name='search'
          onkeyDown={onKeyPressEvent}
        />
        <ButtonsContainer>
          <Button type='submit' onClick={formik.handleSubmit} disabled={formik.isSubmitting}>
            Search User
          </Button>
          <Button onClick={() => onReset()}>Reset</Button>
        </ButtonsContainer>
      </FormikProvider>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  margin-bottom: 30px;
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 30px;
  min-width: 200px;
`

export default SearchUsers
