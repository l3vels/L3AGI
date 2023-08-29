import GetStartedCard from '../GetStarted/GetStartedCard'
import GetStartedContainer from '../GetStarted/GetStartedContainer'

import cardBg1 from '../GetStarted/assets/basicsBg.png'
import cardBg2 from '../GetStarted/assets/gameBg.png'
import cardBg3 from '../GetStarted/assets/developerBg.png'
import cardBg4 from '../GetStarted/assets/whiteBg.png'

const GetStartedComponent = () => {
  return (
    <GetStartedContainer>
      <GetStartedCard
        subTitle={'Learn'}
        title={'The Basics'}
        image={cardBg1}
        bgColor={'pink'}
        link={'https://docs.l3vels.xyz/docs/welcome-to-l3vels'}
      />
      <GetStartedCard
        subTitle={'Create your'}
        title={'First Game'}
        image={cardBg2}
        bgColor={'orange'}
        link={'https://docs.l3vels.xyz/docs/build-manage-your-game'}
      />
      <GetStartedCard
        subTitle={'Learn about'}
        title={'Developers panel'}
        image={cardBg3}
        bgColor={'blue'}
        link={'https://docs.l3vels.xyz/docs/sdks'}
      />
      <GetStartedCard
        subTitle={'Learn about'}
        title={'Assets panel'}
        image={cardBg4}
        bgColor={'red'}
        link={'https://docs.l3vels.xyz/docs/create-organize-assets'}
      />
    </GetStartedContainer>
  )
}

export default GetStartedComponent
