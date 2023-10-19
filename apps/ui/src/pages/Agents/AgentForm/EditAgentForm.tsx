import { FormikProvider } from 'formik'
import { useTranslation } from 'react-i18next'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import { useEditAgent } from '../useEditAgent'

import Button from '@l3-lib/ui-core/dist/Button'
import Loader from '@l3-lib/ui-core/dist/Loader'
import { StyledButtonWrapper, StyledFormWrapper } from './CreateAgentForm'
import AgentForm from './AgentForm'
import BackButton from 'components/BackButton'
import { ButtonPrimary } from 'components/Button/Button'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { t } from 'i18next'

const EditAgentForm = () => {
  const { t } = useTranslation()
  const { formik, isLoading, handleNavigation } = useEditAgent()

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <div>
            <StyledSectionTitle>{`${t('edit-agent')}`}</StyledSectionTitle>
            {/* <StyledSectionDescription>
              Here are all your agents, managing tasks and operations.
            </StyledSectionDescription> */}
          </div>

          <StyledButtonWrapper>
            <BackButton customOnClick={handleNavigation} />
            <ButtonPrimary
              onClick={formik?.handleSubmit}
              disabled={isLoading}
              size={Button.sizes.SMALL}
            >
              {isLoading ? <Loader size={32} /> : `${t('save')}`}
            </ButtonPrimary>
          </StyledButtonWrapper>
        </StyledHeaderGroup>

        <ComponentsWrapper noPadding>
          <StyledFormWrapper>
            <AgentForm formik={formik} />
          </StyledFormWrapper>
        </ComponentsWrapper>
      </StyledSectionWrapper>
    </FormikProvider>
  )
}

export default EditAgentForm
