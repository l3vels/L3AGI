import GetStartedCard from '../GetStarted/GetStartedCard'
import GetStartedContainer from '../GetStarted/GetStartedContainer'

import cardBg1 from 'assets/images/basicsBg.png'
import cardBg2 from 'assets/images/gameBg.png'
import cardBg3 from 'assets/images/developerBg.png'
import cardBg4 from 'assets/images/whiteBg.png'

const GetStartedComponent = () => {
  return (
    <GetStartedContainer>
      <GetStartedCard
        subTitle={'Learn'}
        title={'The Basics'}
        image={cardBg1}
        bgColor={'pink'}
        link={import.meta.env.REACT_APP_BASICS_LINK}
      />
      <GetStartedCard
        subTitle={'Create your'}
        title={'First Agent'}
        image={cardBg2}
        bgColor={'orange'}
        link={import.meta.env.REACT_APP_AGENTS_LINK}
      />
      <GetStartedCard
        subTitle={'Learn about'}
        title={'Team Of Agents'}
        image={cardBg3}
        bgColor={'blue'}
        link={import.meta.env.REACT_APP_TEAM_LINK}
      />
      <GetStartedCard
        subTitle={'Learn about'}
        title={'Datasources'}
        image={cardBg4}
        bgColor={'red'}
        link={import.meta.env.REACT_APP_DATASOURCES_LINK}
      />
    </GetStartedContainer>
  )
}

export default GetStartedComponent
