import styled, { css } from 'styled-components'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Button from '@l3-lib/ui-core/dist/Button'
import RadioButton from '@l3-lib/ui-core/dist/RadioButton'
import Checkbox from '@l3-lib/ui-core/dist/Checkbox'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'

import Close from '@l3-lib/ui-core/dist/icons/Close'
import Code from '@l3-lib/ui-core/dist/icons/Code'
import Copy from '@l3-lib/ui-core/dist/icons/Copy'

import { useState } from 'react'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { FormikProvider } from 'formik'
import FormikTextField from 'components/TextFieldFormik/TextFieldFormik'
import TextareaFormik from 'components/TextareaFormik'
import { useCreateWebhook } from './useCreateWebhook'
import { CODE_HIGHLIGHTER_STYLE } from 'pages/Contract/ContractForm/components/StepDetails'

type CreateContractFormProps = {
  closeModal: () => void
}

const CreateContractForm = ({ closeModal }: CreateContractFormProps) => {
  const code = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import './WeaponSupply.sol';
contract Main is ERC1155, Ownable, WeaponSupply {
  constructor() ERC1155('{{token_uri}}') {}
  function setURI(string memory newuri) public onlyOwner {
    _setURI(newuri);
  }
  function mint(address account, uint256 id, uint256 amount, bytes memory data)
    public onlyOwner {
    _mint(account, id, amount, data);
  }
  function mintBatch(
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) public onlyOwner {
    _mintBatch(to, ids, amounts, data);
  }
}
`
  const [showCode, setShowCode] = useState(false)

  const { formik } = useCreateWebhook()

  return (
    <>
      <StyledContainerWrapper>
        <StyledLeftSideBox>
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
        </StyledLeftSideBox>

        <StyledRightSideBox>
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
        </StyledRightSideBox>
      </StyledContainerWrapper>
    </>
  )
}

export default CreateContractForm

const StyledRoot = styled.div`
  display: flex;
  height: 100%;
`
const StyledForm = styled.form`
  position: relative;
  display: flex;
  justify-content: flex-end;
  height: 100%;
`
const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 64px;
  height: 100%;
  width: 100%;
`
const StyledIconButtonWrapper = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  top: 21.5px;
  right: 40.59px;
  float: right;
  display: flex;
  align-items: center;
  gap: 20px;
`
const StyledStepDetailWrapper = styled.div`
  padding: 150px 60px;
  padding-bottom: 0px;
  /* height: 100%; */
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  max-height: 100vh;
  @media (max-width: 1200px) {
    display: none;
  }
`
const StyledStepDetail = styled.div`
  position: relative;
  display: flex;
  margin-top: 154px;
  left: 100px;
  gap: 30px;
  height: 100%;
  width: 100%;
  border-radius: 6px;
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

const StyledContainerWrapper = styled.div`
  display: flex;
`
const StyledLeftSideBox = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
`
const StyledRightSideBox = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  @media (max-width: 1200px) {
    display: none;
  }
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
  @media (max-width: 718px) {
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
  @media (max-width: 718px) {
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
  @media (max-width: 718px) {
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
  margin-top: 150px;
  gap: 40px;
`
const StyledCodeTitleWrapper = styled.div<{ isMulti?: boolean }>`
  width: ${p => (p.isMulti ? '350px' : '130px')};
  display: grid;
  position: relative;
  top: 41.5px;
  left: 64px;
`
const StyledCopyButtonWrapper = styled.div`
  display: flex;
  position: relative;
  margin-top: 82px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 129px;
  height: 36px;
  left: 64px;
  color: rgba(0, 0, 0, 0.7);
`
const StyledTextWrapper = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  bottom: 83px;
  right: 50px;
  width: 300px;
  height: 20px;
  gap: 16px;
  color: rgba(255, 255, 255, 0.4);
`
const StyledFormWrapper = styled.div`
  margin-top: auto;
  opacity: 1;
  transition: opacity 300ms;
`
