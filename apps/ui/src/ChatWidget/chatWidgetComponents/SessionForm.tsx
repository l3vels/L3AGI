import { ButtonPrimary } from 'components/Button/Button'
import FormikTextField from 'components/TextFieldFormik/TextFieldFormik'
import { FormikProvider, useFormik } from 'formik'
import { t } from 'i18next'
import { useState } from 'react'
import { useCreateChatWidgetService } from 'services/chat/useCreateChatWidgetService'
import Loader from 'share-ui/components/Loader/Loader'

import styled from 'styled-components'

const SessionForm = ({ setSessionId }: { setSessionId: (value: string) => void }) => {
  const scriptElement = document.getElementById('myWidgetScript') as HTMLScriptElement
  const scriptURL = new URL(scriptElement.src)
  const widgetId = scriptURL.searchParams.get('widgetId') || '66c9972f-7e36-41b2-a202-a64d760b6092'

  const [isLoading, setIsLoading] = useState(false)

  const [createChatWidget] = useCreateChatWidgetService()

  const initialValues = {
    chat_name: '',
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const { chat_name } = formik.values
    try {
      const res = await createChatWidget({
        agent_id: widgetId,
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
          {isLoading ? <Loader size={30} /> : 'Start'}
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
