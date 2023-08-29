import withRenderModal from 'hocs/withRenderModal'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Modal from '@l3-lib/ui-core/dist/Modal'
import styled from 'styled-components'
import Button from '@l3-lib/ui-core/dist/Button'
import RadioButton from '@l3-lib/ui-core/dist/RadioButton'
import Checkbox from '@l3-lib/ui-core/dist/Checkbox'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'

import Close from '@l3-lib/ui-core/dist/icons/Close'
import Code from '@l3-lib/ui-core/dist/icons/Code'
// import Copy from '@l3-lib/ui-core/dist/icons/Copy'

import Copy from './svg/copy.svg'

import { useState } from 'react'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { FormikProvider } from 'formik'
import FormikTextField from 'components/TextFieldFormik/TextFieldFormik'
import TextareaFormik from 'components/TextareaFormik'
import { useCreateWebhook } from './useCreateWebhook'
import { CODE_HIGHLIGHTER_STYLE } from 'pages/Log/Components/Details'

// import CreateWebhookForm from './CreateWebhookForm'

type CreateWebhookModalProps = {
  closeModal: () => void
}

const CreateWebhookModal = ({ closeModal }: CreateWebhookModalProps) => {
  const code = `const L3vels = require('@l3vels/sdk')
  const express = require('express');
  
  const app = express();
  
  const l3 = new L3vels()
  
  // This is your L3vels CLI webhook secret for testing your endpoint locally.
  const endpointSecret = "l3_SVMTcJWcafeef366bc598102840c1c97f225856824622d6756c6923e16550589";
  
  app.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
    const signature = request.headers['l3-signature'];
  
    let event;
  
    try {
      event = l3.webhooks.constructEvent(request.body, signature, endpointSecret);
    } catch (err) {
      return response.status(400).send(\`Webhook Error: \${err.message}\`);
    }
  
    // Handle the event
    console.log(\`Unhandled event type \${event.type}\`);
  
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  });
  
  app.listen(8000, () => console.log('Running on port 8000'));`

  const [showCode, setShowCode] = useState(false)

  const { formik } = useCreateWebhook()

  return (
    <>
      <Modal fullscreen show isClean>
        <StyledRoot>
          <LeftSection>
            <StyledHeadingWrapper>
              <Heading type={Heading.types.h1} size={Heading.sizes.sm} value='Listen to events' />
            </StyledHeadingWrapper>
            <StyledTypographyWrapper>
              <Typography
                value='Set up your webhook endpoint to receive live events from L3vels or learn more about webhooks.'
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
              />
            </StyledTypographyWrapper>
            <FormikProvider value={formik}>
              <StyledUrlTextWrapper>
                <Typography
                  value='Endpoint URL'
                  type={Typography.types.LABEL}
                  size={Typography.sizes.lg}
                />
              </StyledUrlTextWrapper>

              <StyledUrlTextFieldWrapper>
                <FormikTextField
                  field_name='url'
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                />
              </StyledUrlTextFieldWrapper>
              <StyledDescriptionTextWrapper>
                <Typography
                  value='Description'
                  type={Typography.types.LABEL}
                  size={Typography.sizes.lg}
                />
              </StyledDescriptionTextWrapper>
              <StyledDescriptionTextAreaWrapper>
                <TextareaFormik
                  color='#FFFFFF'
                  field_name='description'
                  placeholder='An optional description of what this webhook endpoint is used for.'
                />
              </StyledDescriptionTextAreaWrapper>
              <StyledListenTextWrapper>
                <Typography
                  value='Listen to'
                  type={Typography.types.LABEL}
                  size={Typography.sizes.lg}
                />
              </StyledListenTextWrapper>
              <StyledRadioButtonWrapper>
                <RadioButton kind='secondary' text='Events on your account' />
              </StyledRadioButtonWrapper>
              <StyledEventsTextWrapper>
                <Typography
                  value='Select events to listen to '
                  type={Typography.types.LABEL}
                  size={Typography.sizes.lg}
                />
              </StyledEventsTextWrapper>
              <StyledCheckboxWrapper>
                <Checkbox label='Default check' kind='secondary' />
              </StyledCheckboxWrapper>
              <StyledButtonWrapper>
                <Button
                  kind={Button.kinds.PRIMARY}
                  size={Button.sizes.LARGE}
                  onClick={() => formik.handleSubmit()}
                >
                  <Typography
                    value='Add endpoint'
                    type={Typography.types.LABEL}
                    size={Typography.sizes.md}
                  />
                </Button>
                <Button onClick={closeModal} kind={Button.kinds.TERTIARY} size={Button.sizes.LARGE}>
                  <Typography
                    value='Cancel'
                    type={Typography.types.LABEL}
                    size={Typography.sizes.md}
                  />
                </Button>
              </StyledButtonWrapper>
            </FormikProvider>
          </LeftSection>

          <RightSection>
            <StyledIconButtonWrapper>
              <StyledCodeButton
                onClick={() => {
                  setShowCode(!showCode)
                }}
              >
                <StyledIconWrapper>{<Code />}</StyledIconWrapper>
                <Typography
                  value='Received events'
                  type={Typography.types.P}
                  size={Typography.sizes.sm}
                  customColor={'#fff'}
                />
              </StyledCodeButton>

              <IconButton
                onClick={closeModal}
                icon={Close}
                kind={IconButton.kinds.TERTIARY}
                size={IconButton.sizes.LARGE}
              />
            </StyledIconButtonWrapper>
            <StyledCodeTitleWrapper>
              <Dropdown
                kind={Dropdown.kind.TERTIARY}
                placeholder='Node.js'
                size={Dropdown.size.LARGE}
              />
            </StyledCodeTitleWrapper>
            <StyledStepDetail>
              <SyntaxHighlighter
                id='code'
                language='solidity'
                style={CODE_HIGHLIGHTER_STYLE}
                showLineNumbers
              >
                {code}
              </SyntaxHighlighter>
            </StyledStepDetail>
            <StyledCopyButtonWrapper>
              <Button
                kind={Button.kinds.SECONDARY}
                size={Button.sizes.SMALL}
                leftIcon={Copy}
                onClick={() => {
                  navigator.clipboard.writeText(code)
                }}
              >
                <Typography value='Copy' type={Typography.types.LABEL} size={Typography.sizes.md} />
              </Button>
            </StyledCopyButtonWrapper>
          </RightSection>
        </StyledRoot>
      </Modal>
    </>
  )
}

const StyledRoot = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`

const LeftSection = styled.div`
  width: 50%;
  height: 100%;
  background-color: #309881;
  float: left;
`

const RightSection = styled.div`
  width: 50%;
  height: 100%;
  background-color: #287557;
  float: left;
`

const StyledIconButtonWrapper = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  top: 21.5px;
  // left: 100.59px;
  float: right;
  display: flex;
  align-items: center;
  gap: 20px;
`
const StyledStepDetail = styled.div`
  position: relative;
  display: flex;
  top: 154px;
  left: 100px;
  gap: 30px;
  // width: calc(100% - 200px); /* Adjust the left and right padding based on your needs */

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    top: 0;
    left: 0;
    padding: 20px;
  }
`
const StyledCodeButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 5px;
`
const StyledIconWrapper = styled.div`
  width: 20px;
`
const StyledHeadingWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  width: 624px;
  height: 32px;
  color: #ffffff;
  margin-top: 84px;
  left: 64px;
`
const StyledTypographyWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 624px;
  height: 40px;
  margin-top: 2px;
  left: 64px;
  color: rgba(255, 255, 255, 0.8);
  @media (max-width: 1375px) {
    width: 312px;
    top: 5px;
  }
`
const StyledUrlTextWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  width: 133px;
  height: 24px;
  margin-top: 44px;
  left: 64px;
  color: #ffffff;
`
const StyledUrlTextFieldWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 592px;
  height: 44px;
  margin-top: 14px;
  left: 64px;
  @media (max-width: 1375px) {
    width: 212px;
  }
`
const StyledDescriptionTextWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 24px;
  color: #ffffff;
  margin-top: 32px;
  left: 64px;
`
const StyledDescriptionTextAreaWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 592px;
  height: 124px;
  margin-top: 14px;
  left: 64px;
  @media (max-width: 1375px) {
    width: 212px;
  }
`
const StyledListenTextWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  width: 92px;
  height: 24px;
  color: #ffffff;
  margin-top: 32px;
  left: 64px;
`
const StyledRadioButtonWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 221px;
  height: 30px;
  color: #ffffff;
  margin-top: 32px;
  left: 82px;
`
const StyledEventsTextWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  width: 212px;
  height: 24px;
  color: #ffffff;
  margin-top: 50px;
  left: 64px;
`
const StyledCheckboxWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 171px;
  height: 30px;
  color: #ffffff;
  margin-top: 31.5px;
  left: 81.5px;
`
const StyledButtonWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 56px;
  left: 64px;
  top: 270px;
  gap: 40px;
`
const StyledCodeTitleWrapper = styled.div<{ isMulti?: boolean }>`
  width: ${p => (p.isMulti ? '350px' : '130px')};
  display: grid;
  position: relative;
  top: 41.5px;
  left: 84px;
`
const StyledCopyButtonWrapper = styled.div`
  display: flex;
  position: relative;
  margin-top: 390px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 129px;
  height: 36px;
  left: 64px;
  color: rgba(0, 0, 0, 0.7);
`

export default withRenderModal('create-webhook-modal')(CreateWebhookModal)
