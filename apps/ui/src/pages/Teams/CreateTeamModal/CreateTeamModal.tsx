import { FormikProvider } from 'formik'

import styled from 'styled-components'

import withRenderModal from 'hocs/withRenderModal'

// import { useTranslation } from 'react-i18next'

import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'
import useTeams from '../useTeams'
import TeamForm from '../TeamForm'
import Modal from 'share-ui/components/Modal/Modal'
import BgWrapper from 'modals/components/BgWrapper'

// import { StyledFormSection } from 'pages/ApiKeys/ApiKeysStyle'

const CreateTeamModal = () => {
  const { formik, closeModal, assignedUserList } = useTeams()

  // const { t } = useTranslation()

  return (
    <Modal fullscreen show isClean>
      <BgWrapper>
        <StyledModalWrapper className='modal_wrapper'>
          <StyledHeader>
            <StyledCloseBtn onClick={() => closeModal('create-team-modal')}>
              <CloseIconSvg color='rgba(255, 255, 255, 0.8);' />
            </StyledCloseBtn>
          </StyledHeader>
          <StyledModalBody>
            <FormikProvider value={formik}>
              <div>
                <TeamForm
                  formik={formik}
                  assignedUserList={assignedUserList}
                  // closeModal={closeModal}
                />
              </div>
            </FormikProvider>
          </StyledModalBody>
        </StyledModalWrapper>
      </BgWrapper>
    </Modal>
  )
}

export default withRenderModal('create-team-modal')(CreateTeamModal)

const StyledModalWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  overflow: auto;
  grid-template-rows: auto 1fr auto;
`

const StyledHeader = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 40px;
  padding: 40px 41px;

  height: 100%;
`

const StyledCloseBtn = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  cursor: pointer;
`

const StyledModalBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
