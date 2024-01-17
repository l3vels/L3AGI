import { ButtonPrimary } from 'components/Button/Button'
import FormikTextField from 'components/TextFieldFormik/TextFieldFormik'
import { FormikProvider, useFormik } from 'formik'
import { t } from 'i18next'
import { useState } from 'react'
import { useCreateChatService } from 'services/chat/useCreateChat'
import styled from 'styled-components'

const SessionForm = ({ setSessionId }: { setSessionId: (value: string) => void }) => {
  const [isLoading, setIsLoading] = useState(false)

  const [createChat] = useCreateChatService()

  const initialValues = {
    chat_name: '',
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const { chat_name } = formik.values
    try {
      const res = await createChat({
        agent_id: '66c9972f-7e36-41b2-a202-a64d760b6092',
        name: chat_name,
      })

      setSessionId(res.id)
    } catch (e) {
      console.log(e)
    }
    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => handleSubmit(),
    // enableReinitialize: true,
  })

  return (
    <StyledFormRoot>
      <FormikProvider value={formik}>
        <FormikTextField focus name='chat_name' placeholder={t('name')} label={t('name')} />

        <ButtonPrimary onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'starting...' : 'Start'}
        </ButtonPrimary>
      </FormikProvider>
    </StyledFormRoot>
  )
}

export default SessionForm

const StyledFormRoot = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
`
