import { FormikProvider } from 'formik'
import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'

import Typography from '@l3-lib/ui-core/dist/Typography'

import { useDatasource } from 'pages/Datasource/useDatasource'
import DatasourceForm from 'pages/Datasource/DatasourceForm'

import styled from 'styled-components'
import { Footer } from 'components/Layout'
import Spotlight from 'components/Spotlight'

const CreateDatasourceModal = () => {
  const { closeDatasourceModal, formik, handleSubmit, isLoading } = useDatasource()

  return (
    <Modal isClean fullscreen show onClose={closeDatasourceModal}>
      <FormikProvider value={formik}>
        <StyledFormContainer>
          <StyledHeader>
            <StyledHeaderText>Create Datasource</StyledHeaderText>
            <StyledCloseButton onClick={closeDatasourceModal}>
              <Typography
                value='Close'
                type={Typography.types.HEADING}
                size={Typography.sizes.xss}
                customColor={'color: rgba(255, 255, 255, 0.6)'}
              />
            </StyledCloseButton>
          </StyledHeader>

          <StyledBody>
            <DatasourceForm formik={formik} isLoading={isLoading} handleSubmit={handleSubmit} />
            <StyledSecondColumn />
          </StyledBody>
          <StyledFooter id='main_footer'>
            <Footer />
            <div>
              <Spotlight />
            </div>
            <div></div>
          </StyledFooter>
        </StyledFormContainer>
      </FormikProvider>
    </Modal>
  )
}

export default withRenderModal('create-datasource-modal')(CreateDatasourceModal)

export const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  min-height: 600px;
  background: #3981f6;
  overflow-x: auto;
  /* backdrop-filter: blur(100px); */
`
export const StyledHeaderText = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  color: #fff;
  flex-grow: 1;
`
export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 40px;
  height: 100%;
  max-height: 32px;
  width: 100%;
  margin-bottom: auto;
`

export const StyledCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.6);
  font-size: 20px;
`
export const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  grid-row: 3;
  min-height: 72px;
  position: sticky;
  width: 100%;
  bottom: 0;
  padding: 0 32px;
  align-items: center;
  margin-bottom: 8px;
  margin-top: auto;
`
export const StyledBody = styled.div`
  position: relative;
  display: flex;

  justify-content: space-between;
  border-radius: 26px;
  // margin-top: 20px;
  width: 97%;
  height: 100%;
  max-height: calc(100% - 200px);
  // margin-bottom: 60px;
  background: var(--basic-foreground-black-1, rgba(0, 0, 0, 0.1));
  box-shadow: 0px 14.900728225708008px 18.625911712646484px 0px rgba(0, 0, 0, 0.05),
    -0.6208637356758118px 0.6208637356758118px 0.6208637356758118px -1.2417274713516235px
      rgba(255, 255, 255, 0.35) inset;
  backdrop-filter: blur(60.844642639160156px);
`

export const StyledSecondColumn = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */
  overflow: scroll;
  height: 100%;
  width: 100%;
  /* max-width: 600px; */
  padding-top: 50px;

  background: rgba(0, 0, 0, 0.1);
`
