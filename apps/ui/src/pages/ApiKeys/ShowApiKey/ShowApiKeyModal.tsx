import React, { useState } from 'react'
import Toast from '@l3-lib/ui-core/dist/Toast'

import withRenderModal from 'hocs/withRenderModal'

import styled from 'styled-components'

import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'

import Modal from '@l3-lib/ui-core/dist/Modal'
import ModalFooter from '@l3-lib/ui-core/dist/ModalFooter'
import ModalContent from '@l3-lib/ui-core/dist/ModalContent'
import Icon from '@l3-lib/ui-core/dist/Icon'
import Warning from '@l3-lib/ui-core/dist/icons/Warning'
import Copy from '@l3-lib/ui-core/dist/icons/Copy'
import Done from '@l3-lib/ui-core/dist/icons/Check'
import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'

type ShowApiKeyModalProps = {
  closeModal: () => void
  data: {
    token: string
  }
}

const ShowApiKeyModal = ({ closeModal, data }: ShowApiKeyModalProps) => {
  const [isCopied, setIsCopied] = useState(false)

  return (
    <>
      <StyledModal
        show
        title={
          <StyledTextContainer>
            <TypographyPrimary
              value='Your new API token is displayed below. Treat this token like a password, as it can be used to access your account without a username, password, or two-factor authentication.'
              type={Typography.types.Paragraph}
              size={Typography.sizes.md}
            />
          </StyledTextContainer>
        }
        backgroundColor='dark'
        hideCloseButton={true}
      >
        <StyledTokenContainer>
          <StyledTokenTypography>
            <TypographyPrimary
              value={data.token}
              type={Typography.types.L}
              size={Typography.sizes.md}
            />
          </StyledTokenTypography>
          <StyledTokenIcon>
            {isCopied ? (
              <Icon icon={Done} iconSize={23} />
            ) : (
              <Icon
                icon={Copy}
                iconSize={23}
                onClick={() => {
                  navigator.clipboard.writeText(data.token)
                  setIsCopied(true)
                }}
              />
            )}
          </StyledTokenIcon>
        </StyledTokenContainer>
        <StyledWarningToken
          open
          autoHideDuration={5000}
          type={Toast.types.WARNING_LOW_INFORMATIONAL}
          label={
            <StyledToastLabel>
              <TypographySecondary
                value='Note'
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
              />
            </StyledToastLabel>
          }
          paragraph={
            <StyledToastParagraph>
              <TypographySecondary
                value='This token will not be displayed again, so make sure to save it to a safe place.'
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
              />
            </StyledToastParagraph>
          }
          className='l3-storybook-toast_wrapper'
          icon={
            <StyledToastIcon>
              <Warning size='65' />
            </StyledToastIcon>
          }
          hideIcon={false}
          closeable={false}
        />
        <StyledApiModalFooter>
          <Button kind={Button.kinds.PRIMARY} size={Button.sizes.LARGE} onClick={closeModal}>
            Done
          </Button>
        </StyledApiModalFooter>
      </StyledModal>
    </>
  )
}

export default withRenderModal('show-api-key-modal')(ShowApiKeyModal)

export const StyledModal = styled(Modal)`
  width: 664px;
  height: 312px;
  body::-webkit-scrollbar {
    width: 1em;
  }

  body::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  body::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
`
const StyledToastIcon = styled.div`
  display: flex;
  position: relative;
  float: left;
  right: 27px;
`
const StyledToastLabel = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  // float: left;
  right: 50px;
`
const StyledToastParagraph = styled.div`
  display: flex;
  position: relative;
  width: 567px;
  right: 50px;
`

export const StyledApiModalFooter = styled(ModalFooter)`
  display: flex;
  position: relative;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  float: right;
  bottom: 70px;
`
export const StyledTextContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  width: 632px;
  height: 75px;
  margin-top: 16px;
`
export const StyledTokenContainer = styled.div`
  width: 662px;
  height: 44px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  margin-top: 34px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`
export const StyledTokenTypography = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  margin-left: 15px;
  overflow-x: auto;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 600px;
`

export const StyledTokenIcon = styled.div`
  display: flex;
  position: relative;
  // position: absolute;
  // right: 0;
  // bottom: 0;
`

export const StyledWarningToken = styled(Toast)`
  width: 662px;
  height: 56px;
  display: flex;
  position: relative;
  left: 0px;
  margin-top: 66px;
`

export const StyledIcon = styled.div`
  margin-top: 12px;
  margin-left: 18px;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  gap: 10px;
`
export const StyledIconText = styled.div`
  margin-top: 2px;
`
export const StyledTypography = styled.div`
  display: contents;
  color: black;
  font-weight: 600 !important;
  line-height: 32px;
`
