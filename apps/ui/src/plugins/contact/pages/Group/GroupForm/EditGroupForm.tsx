import { FormikProvider } from 'formik'
import {
  StyledHeaderGroup,
  // StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import Button from 'share-ui/components/Button/Button'
import Loader from 'share-ui/components/Loader/Loader'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'

import BackButton from 'components/BackButton'
import { ButtonPrimary } from 'components/Button/Button'
import { StyledButtonWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'
import { useEditGroup } from '../useEditGroup'
import GroupForm from './GroupFrom'
import { StyledFormWrapper } from 'styles/formStyles.css'
import { t } from 'i18next'

const EditGroupForm = () => {
  const { isLoading, formik } = useEditGroup()

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <div>
            <StyledSectionTitle>{`${t('edit-group')}`}</StyledSectionTitle>
          </div>
        </StyledHeaderGroup>

        <StyledFormWrapper>
          <GroupForm formik={formik} />
        </StyledFormWrapper>

        <StyledButtonWrapper>
          <BackButton />
          <ButtonPrimary
            onClick={formik?.handleSubmit}
            disabled={isLoading}
            size={Button.sizes?.MEDIUM}
          >
            {isLoading ? <Loader size={32} /> : 'Save'}
          </ButtonPrimary>
        </StyledButtonWrapper>
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default EditGroupForm
