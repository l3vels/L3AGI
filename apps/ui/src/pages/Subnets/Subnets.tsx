import MiniToolCard from 'components/ChatCards/MiniToolCard'
import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import {
  StyledChatWrapper,
  StyledContainer,
  StyledHorizontalDivider,
  StyledLeftColumn,
  StyledMainWrapper,
} from 'routes/ChatRouteLayout'
import { SUBNETS } from './constants'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import ApiCard from './ApiCard'
import ListHeader from 'routes/components/ListHeader'
import TabList from 'share-ui/components/Tabs/TabList/TabList'
import Tab from 'share-ui/components/Tabs/Tab/Tab'
import TabsContext from 'share-ui/components/Tabs/TabsContext/TabsContext'
import TabPanels from 'share-ui/components/Tabs/TabPanels/TabPanels'
import TabPanel from 'share-ui/components/Tabs/TabPanel/TabPanel'
import TypographyPrimary from 'components/Typography/Primary'
import Typography from 'share-ui/components/typography/Typography'
import ApiKeys from 'pages/ApiKeys'
import CreateApiKeyForm from 'pages/ApiKeys/CreateApiKey/CreateApikeysForm'
import TextField from 'share-ui/components/TextField/TextField'
import TypographySecondary from 'components/Typography/Secondary'
import { fontSize, fontWeight } from '@mui/system'

const Subnets = () => {
  const [activeSubnet, setActiveSubnet] = useState(SUBNETS[0])

  const [activeTab, setActiveTab] = useState(0)
  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId)
  }

  return (
    <StyledAppContainer>
      <StyledContainer>
        <StyledMainWrapper>
          <StyledLeftColumn>
            <ListHeader title={'Subnet APIs'} />
            {SUBNETS.map(subnet => {
              return (
                <MiniToolCard
                  key={subnet.name}
                  onClick={() => {
                    setActiveTab(0)
                    setActiveSubnet(subnet)
                  }}
                  name={subnet.name}
                  logo={subnet.logo}
                  picked={activeSubnet === subnet}
                />
              )
            })}
          </StyledLeftColumn>
          <StyledChatWrapper>
            <TabList size='small' activeTabId={activeTab} noBorder>
              <Tab onClick={() => handleTabClick(0)}>General</Tab>
              <Tab onClick={() => handleTabClick(1)}>Api keys</Tab>
            </TabList>

            <StyledHorizontalDivider />

            <TabsContext activeTabId={activeTab}>
              <TabPanels noAnimation>
                <TabPanel>
                  <StyledCardsWrapper>
                    {activeSubnet?.apis.map((api: any, index: number) => {
                      return (
                        <ApiCard
                          key={index}
                          name={api.name}
                          description={api.description}
                          avatar={api.logo}
                          icon={api.icon}
                        />
                      )
                    })}
                  </StyledCardsWrapper>
                </TabPanel>

                <TabPanel>
                  <StyledWrapper>
                    <StyledTextWrapper>
                      <TypographyPrimary
                        value={`Manage your APY keys`}
                        type={Typography.types.LABEL}
                        size={Typography.sizes.lg}
                        style={{ fontWeight: '500' }}
                      />
                      <TypographySecondary
                        value={`These keys will allow you to authenticate API request.`}
                        type={Typography.types.LABEL}
                        size={Typography.sizes.sm}
                      />
                    </StyledTextWrapper>

                    <StyledHorizontalDivider />

                    <StyledForm>
                      <StyledTextFieldWrapper>
                        <TypographyPrimary
                          value={`App ID`}
                          type={Typography.types.LABEL}
                          size={Typography.sizes.sm}
                        />
                        <TextField
                          value={'5d6bb880-954e-4a8e-a353-89875fff1dee'}
                          placeholder={''}
                          onChange={() => {}}
                          disabled
                        />
                      </StyledTextFieldWrapper>
                      <StyledTextFieldWrapper>
                        <TypographyPrimary
                          value={`APY key`}
                          type={Typography.types.LABEL}
                          size={Typography.sizes.sm}
                        />
                        <TextField
                          value={'value template for api key value template for api key'}
                          placeholder={''}
                          onChange={() => {}}
                          type='password'
                          disabled
                        />
                      </StyledTextFieldWrapper>
                    </StyledForm>
                  </StyledWrapper>
                </TabPanel>
              </TabPanels>
            </TabsContext>
          </StyledChatWrapper>
        </StyledMainWrapper>
      </StyledContainer>
    </StyledAppContainer>
  )
}

export default Subnets

const StyledCardsWrapper = styled.div`
  /* width: 100%;
  height: 100%; */
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 2px;
  margin-top: 20px;
`
const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
`

const StyledForm = styled.div`
  width: 100%;
  max-width: 800px;

  margin-top: 20px;

  background: ${({ theme }) => theme.body.cardBgColor};
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  padding: 10px;

  border-radius: 22px;

  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 16px;
  /* justify-content: center; */
`

const StyledTextWrapper = styled.div`
  padding: 20px;
  padding-left: 0;

  display: flex;
  flex-direction: column;
  gap: 10px;
`

const StyledTextFieldWrapper = styled.div`
  width: 100%;
  max-width: 800px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  font-weight: 500;
`
