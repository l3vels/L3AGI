import styled from 'styled-components'
import DiscoverTeamAgents from './components/DiscoverTeamAgents'
import DiscoverTemplateAgents from './components/DiscoverTemplateAgents'
import HeadingPrimary from 'components/Heading/Primary'
const Discover = () => {

  return (
    <StyledRoot>
      
      {/* {<DiscoverSystemAgents />} */}

      <DiscoverTemplateAgents/>

      <DiscoverTeamAgents />


      {/* {!user && <Toolkit isPublic />} */}
    </StyledRoot>
  )
}

export default Discover




export const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
`

const StyledHeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 16px 10px;
`
const StyledHeadingPrimary = styled(HeadingPrimary)`
  font-size: 40px;
`

