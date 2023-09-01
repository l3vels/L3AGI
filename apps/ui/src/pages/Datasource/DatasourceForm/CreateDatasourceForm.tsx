import { FormikProvider } from 'formik'
import { useDatasource } from '../useDatasource'
import DatasourceForm from './DatasourceForm'

import Button from '@l3-lib/ui-core/dist/Button'
import Loader from '@l3-lib/ui-core/dist/Loader'

import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { StyledFormWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'

const CreateDatasourceForm = () => {
  const { formik, handleSubmit, isLoading } = useDatasource()

  return (
    <>
      <FormikProvider value={formik}>
        <StyledSectionWrapper>
          <StyledHeaderGroup className='header_group'>
            <div>
              <StyledSectionTitle secondary>Create Datasource</StyledSectionTitle>
              <StyledSectionDescription secondary>
                Here are all of your games, etc
              </StyledSectionDescription>
            </div>

            <div>
              <Button onClick={() => handleSubmit(formik?.values)} disabled={isLoading}>
                {isLoading ? <Loader size={32} /> : 'Save'}
              </Button>
            </div>
          </StyledHeaderGroup>

          <ComponentsWrapper noPadding>
            <StyledFormWrapper>
              <DatasourceForm formik={formik} isLoading={isLoading} />
            </StyledFormWrapper>
          </ComponentsWrapper>
        </StyledSectionWrapper>
      </FormikProvider>
    </>
  )
}

export default CreateDatasourceForm
