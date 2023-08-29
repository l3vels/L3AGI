import GetStartedComponent from './HomeComponents/GetStartedComponent'
import { ReportsOverview } from './ReportsOverview/ReportsOverview'

import TopCharts from './TopCharts/TopCharts'
import Documentation from './Documentation/Documentation'

import { StyledInnerWrapper } from 'components/Layout/LayoutStyle'
import { SectionDivider } from 'styles/globalStyle.css'
import styled from 'styled-components'

import Agents from 'pages/Agents'
import Datasource from 'pages/Datasource'

const Home = () => {
  const isProduction = import.meta.env.REACT_APP_ENV === 'production'

  return (
    <>
      <StyledInnerWrapperEdit>
        <GetStartedComponent />

        <SectionDivider />

        {!isProduction && (
          <>
            <StyledDivider />
            <Agents />
            <StyledDivider />
            <Datasource />
          </>
        )}
        <ReportsOverview />

        {/* 
        <TopCharts />
        <Documentation /> */}
      </StyledInnerWrapperEdit>
    </>
  )
}

export default Home

const StyledInnerWrapperEdit = styled(StyledInnerWrapper)`
  display: grid;
  grid-auto-rows: max-content;
  gap: 20px;
`
const StyledDivider = styled.div`
  height: 40px;
  width: 100%;
`
