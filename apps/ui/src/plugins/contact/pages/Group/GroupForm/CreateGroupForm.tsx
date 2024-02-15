import BackButton from 'components/BackButton'
import { ButtonPrimary } from 'components/Button/Button'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { StyledButtonWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'
import {
  StyledHeaderGroup,
  // StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import Button from 'share-ui/components/Button/Button'
import Loader from 'share-ui/components/Loader/Loader'

import { useCreateGroup } from '../useCreateGroup'
import { FormikProvider } from 'formik'

import GroupForm from './GroupFrom'
import { StyledFormWrapper } from 'styles/formStyles.css'
import { t } from 'i18next'

const CreateGroupForm = () => {
  const { formik, isLoading } = useCreateGroup()

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <div>
            <StyledSectionTitle>{`${t('add-group')}`}</StyledSectionTitle>
          </div>
        </StyledHeaderGroup>

        <StyledFormWrapper>
          <GroupForm formik={formik} />
        </StyledFormWrapper>

        <StyledButtonWrapper>
          <BackButton />
          <ButtonPrimary
            onClick={formik?.handleSubmit}
            size={Button.sizes?.MEDIUM}
            disabled={isLoading}
          >
            {isLoading ? <Loader size={32} /> : 'Save'}
          </ButtonPrimary>
        </StyledButtonWrapper>
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default CreateGroupForm
