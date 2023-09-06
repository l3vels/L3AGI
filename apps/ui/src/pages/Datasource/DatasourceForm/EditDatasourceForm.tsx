import { FormikProvider } from 'formik'

import DatasourceForm from './DatasourceForm'
import { useEditDatasource } from '../useEditDatasource'

import Button from '@l3-lib/ui-core/dist/Button'
import Loader from '@l3-lib/ui-core/dist/Loader'

import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { StyledButtonWrapper, StyledFormWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'
import BackButton from 'components/BackButton'

const EditDatasourceForm = () => {
  const { formik, handleSubmit, isLoading } = useEditDatasource()

  return (
    <>
      <FormikProvider value={formik}>
        <StyledSectionWrapper>
          <StyledHeaderGroup className='header_group'>
            <div>
              <StyledSectionTitle>Edit Datasource</StyledSectionTitle>
              <StyledSectionDescription>
                Here is your datasource, a collection of databases, APIs, files, and more.
              </StyledSectionDescription>
            </div>

            <StyledButtonWrapper>
              <BackButton />
              <Button
                onClick={() => handleSubmit(formik?.values)}
                size={Button.sizes.SMALL}
                disabled={isLoading}
              >
                {isLoading ? <Loader size={32} /> : 'Save'}
              </Button>
            </StyledButtonWrapper>
          </StyledHeaderGroup>

          <ComponentsWrapper noPadding>
            <StyledFormWrapper>
              <DatasourceForm formik={formik} isLoading={isLoading} isEdit />
            </StyledFormWrapper>
          </ComponentsWrapper>
        </StyledSectionWrapper>
      </FormikProvider>
    </>
  )
}

export default EditDatasourceForm
