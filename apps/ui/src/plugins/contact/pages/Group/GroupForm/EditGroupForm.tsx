import { FormikProvider } from 'formik'
import {
  StyledHeaderGroup,
  // StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import Button from 'share-ui/components/Button/Button'
import Loader from 'share-ui/components/Loader/Loader'

import BackButton from 'components/BackButton'
import { ButtonPrimary } from 'components/Button/Button'
import { StyledButtonWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'
import { useEditGroup } from '../useEditGroup'
import GroupForm from './GroupFrom'
import { StyledFormWrapper } from 'styles/formStyles.css'
import { t } from 'i18next'

import TabList from 'share-ui/components/Tabs/TabList/TabList'
import Tab from 'share-ui/components/Tabs/Tab/Tab'
import TabPanels from 'share-ui/components/Tabs/TabPanels/TabPanels'
import TabsContext from 'share-ui/components/Tabs/TabsContext/TabsContext'
import TabPanel from 'share-ui/components/Tabs/TabPanel/TabPanel'
import { useState } from 'react'
import Contacts from '../../Contact/Contacts'

const EditGroupForm = () => {
  const { isLoading, formik } = useEditGroup()

  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (tabId: number, tabName: string) => {
    setActiveTab(tabId)
  }

  return (
    <FormikProvider value={formik}>
      <StyledSectionWrapper>
        {/* <StyledHeaderGroup className='header_group'>
          <div>
            <StyledSectionTitle>{`${t('edit-group')}`}</StyledSectionTitle>
          </div>
        </StyledHeaderGroup> */}

        <TabList size='small' activeTabId={activeTab} noBorder>
          <Tab onClick={() => handleTabClick(0, 'contact')}>{t('contacts')}</Tab>
          <Tab onClick={() => handleTabClick(1, 'settings')}>{t('settings')}</Tab>
        </TabList>

        <TabsContext activeTabId={activeTab}>
          <TabPanels>
            <TabPanel>
              <Contacts />
            </TabPanel>

            <TabPanel>
              <StyledFormWrapper>
                <GroupForm formik={formik} />
              </StyledFormWrapper>
            </TabPanel>
          </TabPanels>
        </TabsContext>

        <StyledButtonWrapper>
          {/* <BackButton /> */}
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
