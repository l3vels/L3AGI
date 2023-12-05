import styled from 'styled-components'

import Button from 'share-ui/components/Button/Button'
import Typography from 'share-ui/components/typography/Typography'
import Toggle from 'share-ui/components/Toggle/Toggle'
import useLog from 'pages/Log/useLog'
import TypographyPrimary from 'components/Typography/Primary'

const CreateLogMethod = ({ onClose }: { onClose: Function }) => {
  const { log_list, filter } = useLog()

  const data = log_list
  const methods = data.map((m: { method: any }) => m.method)

  //   console.log(methods)
  return (
    <>
      <StyledLogMethodContainer>
        <StyledContainerWrapper>
          <StyledTextWrapper>
            <TypographyPrimary
              value='GET'
              type={Typography.types.LABEL}
              size={Typography.sizes.md}
            />
          </StyledTextWrapper>
          <StyledCheckBoxWrapper>
            <Toggle size='small' kind='primary' isDefaultSelected={false} />
          </StyledCheckBoxWrapper>
        </StyledContainerWrapper>

        <StyledContainerWrapper>
          <StyledTextWrapper>
            <TypographyPrimary
              value='POST'
              type={Typography.types.LABEL}
              size={Typography.sizes.md}
            />
          </StyledTextWrapper>
          <StyledCheckBoxWrapper>
            <Toggle size='small' kind='primary' isDefaultSelected={false} />
          </StyledCheckBoxWrapper>
        </StyledContainerWrapper>

        <StyledContainerWrapper>
          <StyledTextWrapper>
            <TypographyPrimary
              value='DELETE'
              type={Typography.types.LABEL}
              size={Typography.sizes.md}
            />
          </StyledTextWrapper>
          <StyledCheckBoxWrapper>
            <Toggle size='small' kind='primary' isDefaultSelected={false} />
          </StyledCheckBoxWrapper>
        </StyledContainerWrapper>

        <StyledButtonContainer>
          <StyledTertiaryButton
            kind={Button.kinds?.TERTIARY}
            size={Button.sizes?.SMALL}
            onClick={onClose}
          >
            <TypographyPrimary
              value='Clear'
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
            />
          </StyledTertiaryButton>

          <StyledPrimaryButton kind={Button.kinds?.PRIMARY} size={Button.sizes?.SMALL}>
            <TypographyPrimary
              value='Apply'
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
            />
          </StyledPrimaryButton>
        </StyledButtonContainer>
      </StyledLogMethodContainer>
    </>
  )
}

export default CreateLogMethod

const StyledContainerWrapper = styled.div`
  width: 100%;
  height: 30px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 70px;
`
const StyledButtonContainer = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  position: relative;
  justify-content: flex-end;
  align-items: center;
  //   gap: 40px;
  margin-top: 10px;
  right: 10px;
`
const StyledPrimaryButton = styled(Button)`
  padding: 10px 26px;
`
const StyledTertiaryButton = styled(Button)`
  padding: 10px 26px;
`
const StyledTextWrapper = styled.div`
  width: 176px;
  height: 20px;

  display: flex;
  align-items: center;
`
const StyledCheckBoxWrapper = styled.div`
  width: 21px;
  height: 21px;
  display: flex;
  align-items: center;
`

const StyledLogMethodContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  width: 330px;
  height: 198px;
  right: 527px;
  top: 16px;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(100px);
  border-radius: 6px;
  flex: none;
  order: 3;
  flex-grow: 0;
  z-index: 3;
`
