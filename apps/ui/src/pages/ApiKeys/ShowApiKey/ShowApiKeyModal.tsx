import React, { useState } from 'react'

import withRenderModal from 'hocs/withRenderModal'

import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import Button from 'share-ui/components/Button/Button'
import Typography from 'share-ui/components/typography/Typography'

import Modal from 'share-ui/components/Modal/Modal'
import ModalFooter from 'share-ui/components/ModalFooter/ModalFooter'

import Warning from 'share-ui/components/Icon/Icons/components/Warning'
import Copy from 'share-ui/components/Icon/Icons/components/Copy'
import Done from 'share-ui/components/Icon/Icons/components/Check'
import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'
import Toast from 'share-ui/components/Toast/Toast'
import Icon from 'share-ui/components/Icon/Icon'

type ShowApiKeyModalProps = {
  closeModal: () => void
  data: {
    token: string
  }
}

const ShowApiKeyModal = ({ closeModal, data }: ShowApiKeyModalProps) => {
  const { t } = useTranslation()
  const [isCopied, setIsCopied] = useState(false)

  return (
    <>
      <StyledModal show backgroundColor='light' hideCloseButton onClose={closeModal}>
        <StyledTextContainer>
          <TypographyPrimary
            value={t('show-api-key-description')}
            type={Typography.types.Paragraph}
            size={Typography.sizes.md}
          />
        </StyledTextContainer>
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

        <StyledFooter>
          <Button kind={Button.kinds?.PRIMARY} size={Button.sizes?.MEDIUM} onClick={closeModal}>
            {t('done')}
          </Button>
        </StyledFooter>
      </StyledModal>
    </>
  )
}

export default withRenderModal('show-api-key-modal')(ShowApiKeyModal)

export const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;

  justify-content: space-between;

  padding: 10px 20px;

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

  font-weight: 500;
`
export const StyledTokenContainer = styled.div`
  font-size: 14px;
  width: 662px;
  height: 44px;
  background: rgba(255, 255, 255, 0.699);
  border-radius: 6px;
  margin-top: 34px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  margin-bottom: 50px;
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

  ${() =>
    `
    path {
    fill: #575757;
    }
    `}
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
const StyledFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`
