import styled from 'styled-components'
import IconButton from 'share-ui/components/IconButton/IconButton'

import Close from 'share-ui/components/Icon/Icons/components/Close'

import Checkbox from 'share-ui/components/Checkbox/Checkbox'

import useFilter from './useFilter'
import Button from 'share-ui/components/Button/Button'
import TextFieldController from 'components/TextFieldController'
import Toggle from 'share-ui/components/Toggle/Toggle'

const AdditionalFilters = ({ onClose }: { onClose: Function }) => {
  const { control } = useFilter()
  return (
    <StyledContainer>
      <StyledHeaderContainer>
        <StyledCloseButtonContainer>
          <IconButton
            size={IconButton.sizes?.SMALL}
            icon={Close}
            kind={IconButton.kinds?.PRIMARY}
            active
            onClick={onClose}
          />
        </StyledCloseButtonContainer>
      </StyledHeaderContainer>

      <StyledTitle>Filters</StyledTitle>

      <StyledFormContainer>
        <StyledFormItem columns='130px auto 50px'>
          <StyledLabel>IP ADDRESS</StyledLabel>
          <TextFieldController field_name='search' control={control} />
        </StyledFormItem>

        <StyledFormItem columns='80px auto'>
          <Toggle kind='tertiary' isDefaultSelected={false} />
          <StyledRadioLabel>Show IP address column</StyledRadioLabel>
        </StyledFormItem>

        <StyledFormItem columns='130px auto 50px'>
          <StyledLabel>SOURCE</StyledLabel>
          <StyledRadioLabel>Dashboard</StyledRadioLabel>
          <Checkbox kind='secondary' />
        </StyledFormItem>

        <StyledFormItem columns='130px auto 50px'>
          <StyledLabel></StyledLabel>
          <StyledRadioLabel>API</StyledRadioLabel>
          <Checkbox kind='secondary' />
        </StyledFormItem>

        <StyledFormItem columns='130px auto 50px'>
          <StyledLabel>ACCOUNT</StyledLabel>
          <StyledRadioLabel>This account</StyledRadioLabel>
          <Checkbox kind='secondary' />
        </StyledFormItem>

        <StyledFormItem columns='130px auto 50px'>
          <StyledLabel></StyledLabel>
          <StyledRadioLabel>Incoming connect requests</StyledRadioLabel>
          <Checkbox kind='secondary' />
        </StyledFormItem>

        <StyledFormItem columns='130px auto 50px'>
          <StyledLabel></StyledLabel>
          <StyledRadioLabel>Outgoing connect request</StyledRadioLabel>
          <Checkbox kind='secondary' />
        </StyledFormItem>

        <StyledFormItem columns='130px auto'>
          <StyledLabel>API VERSION</StyledLabel>
          <TextFieldController field_name='search' control={control} />
        </StyledFormItem>

        <StyledFormItem columns='130px auto'>
          <StyledLabel>ERROR TYPE</StyledLabel>
          <TextFieldController field_name='search' control={control} />
        </StyledFormItem>

        <StyledFormItem columns='130px auto'>
          <StyledLabel>ERROR CODE</StyledLabel>
          <TextFieldController field_name='search' control={control} />
        </StyledFormItem>

        <StyledFormItem columns='130px auto'>
          <StyledLabel>ERROR PARAM</StyledLabel>
          <TextFieldController field_name='search' control={control} />
        </StyledFormItem>

        <StyledFormItem columns='100px auto 120px'>
          <Button kind={Button.kinds?.TERTIARY} size='small'>
            Clear
          </Button>
          <StyledLabel></StyledLabel>
          <Button size='small'>Create it</Button>
        </StyledFormItem>
      </StyledFormContainer>
    </StyledContainer>
  )
}

export default AdditionalFilters

const StyledContainer = styled.div`
  width: 581px;
  background: rgb(68 137 195);
  box-shadow: rgba(0, 0, 0, 0.8) 0px 4px 40px;
  backdrop-filter: blur(100px);
  border-radius: 16px;
  position: absolute;
  right: 38%;
  top: 140%;
  padding: 16px;
  z-index: 1;
`
const StyledHeaderContainer = styled.div`
  position: relative;
  width: 100%;
`
const StyledCloseButtonContainer = styled.div`
  position: absolute;
  right: -5.5%;
  top: -30px;
`

const StyledTitle = styled.div`
  font-size: 28px;
`

const StyledFormItem = styled.div<{ columns: string }>`
  display: grid;
  grid-template-columns: ${({ columns }) => columns};
  align-items: center;
`
const StyledFormContainer = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-row-gap: 30px;
`

const StyledLabel = styled.div`
  font-size: 15px;
  color: #50b1d7;
`

const StyledRadioLabel = styled.div`
  font-size: 15px;
  color: #f2f2f2;
`
