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
        link={'https://docs.l3agi.com/docs/welcome-to-l3vels'}
      />
      <GetStartedCard
        subTitle={'Create your'}
        title={'First Agent'}
        image={cardBg2}
        bgColor={'orange'}
        link={'https://docs.l3agi.com/docs/build-manage-your-game'}
      />
      <GetStartedCard
        subTitle={'Learn about'}
        title={'Datasources'}
        image={cardBg3}
        bgColor={'blue'}
        link={'https://docs.l3agi.com/docs/sdks'}
      />
      <GetStartedCard
        subTitle={'Learn about'}
        title={'Tools'}
        image={cardBg4}
        bgColor={'red'}
        link={'https://docs.l3agi.com/docs/create-organize-assets'}
      />
    </GetStartedContainer>
  )
}

export default GetStartedComponent
