import styled from 'styled-components'
// import IconButton from 'share-ui/components/IconButton/IconButton'

// import Close from 'share-ui/components/Icon/Icons/components/Close'
import Toggle from 'share-ui/components/Toggle/Toggle'
import Checkbox from 'share-ui/components/Checkbox/Checkbox'

import Heading from 'share-ui/components/Heading/Heading'
import Typography from 'share-ui/components/typography/Typography'
import TextField from 'share-ui/components/TextField/TextField'

// import useFilter from '../useFilter'
import Button from 'share-ui/components/Button/Button'
// import useFilter from '../Components/useFilter'

import Modal from 'share-ui/components/Modal/Modal'
import ModalFooter from 'share-ui/components/ModalFooter/ModalFooter'
import withRenderModal from 'hocs/withRenderModal'
import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'
import TypographyTertiary from 'components/Typography/Tertiary'
import HeadingPrimary from 'components/Heading/Primary'

type CreateLogModalProps = {
  closeModal: () => void
}

const CreateLogModal = ({ closeModal }: CreateLogModalProps) => {
  return (
    <>
      <StyledCreateLogModal
        onClose={closeModal}
        show
        backgroundColor='dark'
        title={
          <HeadingPrimary type={Heading.types?.h1} size={Heading.sizes?.SMALL} value='Filer' />
        }
      >
        <StyledApiAddressContainerWrapper>
          <StyledIPAddressContainer>
            <TypographyPrimary
              value='IP address'
              type={Typography.types.LABEL}
              size={Typography.sizes.lg}
            />
          </StyledIPAddressContainer>
          <StyledIPAdressFieldContainer>
            <TextField placeholder='Label' />
          </StyledIPAdressFieldContainer>
        </StyledApiAddressContainerWrapper>

        <StyledSwitchContainerWrapper>
          <StyledSwitchContainer>
            <Toggle size='small' kind='primary' />
          </StyledSwitchContainer>
          <StyledSwitchTextContainer>
            <TypographySecondary
              value='Show IP address column'
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
            />
          </StyledSwitchTextContainer>
        </StyledSwitchContainerWrapper>

        <StyledSourceContainerWrapper>
          <StyledSourceTextWrapper>
            <TypographyPrimary
              value='Source'
              type={Typography.types.LABEL}
              size={Typography.sizes.lg}
            />
          </StyledSourceTextWrapper>
          <StyledCheckBoxWrapper>
            <StyledDashboardCheckboxContainer>
              <StyledDashboardText>
                <TypographyTertiary
                  value='Dashboard'
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                />
              </StyledDashboardText>
              <StyledDashboardCheckbox>
                <Checkbox kind='secondary' size='small' />
              </StyledDashboardCheckbox>
            </StyledDashboardCheckboxContainer>
            <StyledAPICheckboxContainer>
              <StyledDashboardText>
                <Typography value='API' type={Typography.types.LABEL} size={Typography.sizes.md} />
              </StyledDashboardText>
              <StyledDashboardCheckbox>
                <Checkbox kind='secondary' size='small' />
              </StyledDashboardCheckbox>
            </StyledAPICheckboxContainer>
          </StyledCheckBoxWrapper>
        </StyledSourceContainerWrapper>

        <StyledAccountContainerWrapper>
          <StyledAccountTextWrapper>
            <TypographyTertiary
              value='Account'
              type={Typography.types.LABEL}
              size={Typography.sizes.lg}
            />
          </StyledAccountTextWrapper>
          <StyledCheckBoxWrapper>
            <StyledCheckboxContainer_1>
              <StyledAccountText>
                <TypographyTertiary
                  value='This account'
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                />
              </StyledAccountText>
              <StyledAccountCheckbox>
                <Checkbox kind='secondary' size='small' />
              </StyledAccountCheckbox>
            </StyledCheckboxContainer_1>
            <StyledCheckboxContainer_2>
              <StyledConnectText>
                <TypographyTertiary
                  value='Incoming connect requests'
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                />
              </StyledConnectText>
              <StyledContentCheckbox>
                <Checkbox kind='secondary' size='small' />
              </StyledContentCheckbox>
            </StyledCheckboxContainer_2>
            <StyledCheckboxContainer_3>
              <StyledRequestText>
                <TypographyTertiary
                  value='Outgoing connect request'
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                />
              </StyledRequestText>
              <StyledRequestCheckbox>
                <Checkbox kind='secondary' size='small' />
              </StyledRequestCheckbox>
            </StyledCheckboxContainer_3>
          </StyledCheckBoxWrapper>
        </StyledAccountContainerWrapper>

        <StyledApiVersionContainerWrapper>
          <StyledIPAddressContainer>
            <TypographyTertiary
              value='API version '
              type={Typography.types.LABEL}
              size={Typography.sizes.lg}
            />
          </StyledIPAddressContainer>
          <StyledIPAdressFieldContainer>
            <TextField placeholder='Label' />
          </StyledIPAdressFieldContainer>
        </StyledApiVersionContainerWrapper>

        <StyledApiVersionContainerWrapper>
          <StyledIPAddressContainer>
            <TypographyTertiary
              value='Error type'
              type={Typography.types.LABEL}
              size={Typography.sizes.lg}
            />
          </StyledIPAddressContainer>
          <StyledIPAdressFieldContainer>
            <TextField placeholder='Label' />
          </StyledIPAdressFieldContainer>
        </StyledApiVersionContainerWrapper>

        <StyledApiVersionContainerWrapper>
          <StyledIPAddressContainer>
            <TypographyTertiary
              value='Error code'
              type={Typography.types.LABEL}
              size={Typography.sizes.lg}
            />
          </StyledIPAddressContainer>
          <StyledIPAdressFieldContainer>
            <TextField placeholder='Label' />
          </StyledIPAdressFieldContainer>
        </StyledApiVersionContainerWrapper>

        <StyledApiVersionContainerWrapper>
          <StyledIPAddressContainer>
            <TypographyTertiary
              value='Error param'
              type={Typography.types.LABEL}
              size={Typography.sizes.lg}
            />
          </StyledIPAddressContainer>
          <StyledIPAdressFieldContainer>
            <TextField placeholder='Label' />
          </StyledIPAdressFieldContainer>
        </StyledApiVersionContainerWrapper>
        <StyledModalFooter>
          <StyledActionsContainer>
            <Button onClick={closeModal} kind={Button.kinds?.TERTIARY} size={Button.sizes?.LARGE}>
              <Typography value='Clear' type={Typography.types.LABEL} size={Typography.sizes.md} />
            </Button>

            <Button kind={Button.kinds?.PRIMARY} size={Button.sizes?.LARGE}>
              <StyledLabelTypography
                value='Create'
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
              />
            </Button>
          </StyledActionsContainer>
        </StyledModalFooter>
      </StyledCreateLogModal>
    </>
  )
}

export default withRenderModal('add-log-modal')(CreateLogModal)

const StyledCreateLogModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  padding: 32px;
  gap: 16px;
  isolation: isolate;
  width: 756px;
  height: 825px;
`
const StyledApiAddressContainerWrapper = styled.div`
  display: flex;
  width: 692px;
  height: 52px;
  align-items: center;
`
const StyledIPAddressContainer = styled.div`
  width: 296px;
  height: 24px;
`
const StyledIPAdressFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 459px;
  height: 44px;
  color: #ffffff;
`
const StyledSwitchContainerWrapper = styled.div`
  display: flex;
  width: 300px;
  height: 40px;
  align-items: center;
  margin-top: 8px;
`
const StyledSwitchContainer = styled.div`
  justify-content: flex-start;
`
const StyledSwitchTextContainer = styled.div`
  width: fit-content;
  height: 30px;
`
const StyledSourceContainerWrapper = styled.div`
  display: flex;
  width: 692px;
  height: 80px;
  margin-top: 25px;
`
const StyledSourceTextWrapper = styled.div`
  width: 58px;
  height: 24px;
`
const StyledCheckBoxWrapper = styled.div`
  display: grid;
  margin-left: 170px;
  gap: 10px;
`
const StyledDashboardCheckboxContainer = styled.div`
  width: 400px;
  height: 30px;
  margin-left: 60px;
  display: flex;
  align-items: center;
`
const StyledAPICheckboxContainer = styled.div`
  width: 400px;
  height: 30px;
  margin-left: 60px;
  display: flex;
  align-items: center;
`
const StyledDashboardText = styled.div`
  width: 80px;
  height: 25px;

  align-items: center;
`
const StyledDashboardCheckbox = styled.div`
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  margin-left: 250px;
`

const StyledAccountContainerWrapper = styled.div`
  display: flex;
  width: 692px;
  height: 100px;
  margin-top: 25px;
`
const StyledAccountTextWrapper = styled.div`
  width: 58px;
  height: 24px;
  color: #ffffff;
`
const StyledCheckboxContainer_1 = styled.div`
  width: 400px;
  height: 20px;
  margin-left: 60px;
  display: flex;
  align-items: center;
`
const StyledCheckboxContainer_2 = styled.div`
  width: 400px;
  height: 20px;
  margin-left: 60px;
  display: flex;
  align-items: center;
`
const StyledCheckboxContainer_3 = styled.div`
  width: 400px;
  height: 20px;
  margin-left: 60px;
  display: flex;
  align-items: center;
`
const StyledAccountText = styled.div`
  width: 104px;
  height: 30px;
`
const StyledConnectText = styled.div`
  width: fit-content;
  height: 30px;
`
const StyledRequestText = styled.div`
  width: fit-content;
  height: 30px;
`
const StyledAccountCheckbox = styled.div`
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  margin-left: 227px;
`
const StyledContentCheckbox = styled.div`
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  margin-left: 132px;
`
const StyledRequestCheckbox = styled.div`
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  margin-left: 139px;
`
const StyledApiVersionContainerWrapper = styled.div`
  display: flex;
  width: 692px;
  height: 52px;
  margin-top: 25px;
  align-items: center;
`
export const StyledModalFooter = styled(ModalFooter)`
  display: grid;
  position: relative;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
`
const StyledActionsContainer = styled.div`
  display: flex;
  position: relative;
  justify-items: flex-end;
  gap: 42px;
`
const StyledLabelTypography = styled(Typography)`
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
`
