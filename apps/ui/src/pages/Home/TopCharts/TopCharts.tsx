import styled from 'styled-components'
import { StyledInnerGroup, StyledMainWrapper, StyledSectionTitle } from '../homeStyle.css'
import Avatar from '@l3-lib/ui-core/dist/Avatar'
import defaultAvatar from 'assets/images/defaultAvatar.png'
import azuki_2 from 'assets/avatars/azuki_2.jpg'
import azuki_3 from 'assets/avatars/azuki_3.jpg'
import starIcon from '../assets/star_icon.svg'

import artworkImg from '../assets/artwork.png'
import artwork1Img from '../assets/artwork-1.png'
import artwork2Img from '../assets/artwork-2.png'
import artwork3Img from '../assets/artwork-3.png'

const playerData = [
  {
    name: 'VictoryRoyale22',
    star_count: 200,
    avatar_src: defaultAvatar,
  },
  {
    name: 'VictoryRoyale22',
    star_count: 200,
    avatar_src: azuki_2,
  },
  {
    name: 'VictoryRoyale22',
    star_count: 200,
    avatar_src: azuki_2,
  },
  {
    name: 'VictoryRoyale22',
    star_count: 200,
    avatar_src: defaultAvatar,
  },
  {
    name: 'VictoryRoyale22',
    star_count: 200,
    avatar_src: azuki_2,
  },
  {
    name: 'VictoryRoyale22',
    star_count: 200,
    avatar_src: azuki_2,
  },
  {
    name: 'VictoryRoyale22',
    star_count: 200,
    avatar_src: defaultAvatar,
  },
  {
    name: 'VictoryRoyale22',
    star_count: 200,
    avatar_src: azuki_2,
  },
  {
    name: 'VictoryRoyale22',
    star_count: 200,
    avatar_src: azuki_2,
  },
  {
    name: 'VictoryRoyale22',
    star_count: 200,
    avatar_src: azuki_3,
  },
]
const assets_trade = [
  {
    name: 'VictoryRoyale22',
    avatar_src: artworkImg,
  },
  {
    name: 'VictoryRoyale22',
    avatar_src: artwork1Img,
  },
  {
    name: 'VictoryRoyale22',
    avatar_src: artwork2Img,
  },
  {
    name: 'VictoryRoyale22',
    avatar_src: artwork3Img,
  },
  {
    name: 'VictoryRoyale22',
    avatar_src: artwork2Img,
  },
  {
    name: 'VictoryRoyale22',
    avatar_src: artwork3Img,
  },
  {
    name: 'VictoryRoyale22',
    avatar_src: artwork1Img,
  },
  {
    name: 'VictoryRoyale22',
    avatar_src: artworkImg,
  },
  {
    name: 'VictoryRoyale22',
    avatar_src: artwork3Img,
  },
  {
    name: 'VictoryRoyale22',
    avatar_src: artwork2Img,
  },
]

const ChartCard = ({ title, data, img_type }: any) => {
  return (
    <StyledCardBody>
      <StyledCardHeaderValue>{title}</StyledCardHeaderValue>
      <StyledInnerBody>
        {data.map((item: any, index: any) => (
          <StyledBodyColumn key={index}>
            <StyledIndex>{index + 1}</StyledIndex>
            {img_type === 'avatar' ? (
              <Avatar
                size={Avatar.sizes.SMALL}
                src={item.avatar_src}
                type={Avatar.types.IMG}
                rectangle
              />
            ) : (
              <Avatar
                size={Avatar.sizes.SMALL}
                src={item.avatar_src}
                type={Avatar.types.IMG}
                square
                className='square_avatar'
              />
            )}

            <StyledName>{item.name}</StyledName>
            {item.star_count && (
              <StyledStarContainer className='start_container'>
                <img src={starIcon} alt='star' />
                <span>{item.star_count}</span>
              </StyledStarContainer>
            )}
          </StyledBodyColumn>
        ))}
      </StyledInnerBody>
    </StyledCardBody>
  )
}

const TopCharts = () => {
  return (
    <StyledMainWrapper>
      <StyledSectionTitle>Reports Overview</StyledSectionTitle>
      <StyledInnerGroup>
        <ChartCard title='Top 10 Players' data={playerData} img_type='avatar' />
        <ChartCard title='Top Assets Trade' data={assets_trade} img_type='default' />
        <ChartCard title='Top Performing Collection' data={assets_trade} img_type='default' />
        {/* <ChartCard title='Top Assets Trade' />
        <ChartCard title='Top Performing Collection' /> */}
      </StyledInnerGroup>
    </StyledMainWrapper>
  )
}

export default TopCharts

const StyledCardBody = styled.div`
  padding-top: 22px;
  padding-right: 20px;
  padding-left: 16px;
  padding-bottom: 16px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  max-height: 244px;
`

const StyledCardHeaderValue = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: rgba(255, 255, 255, 0.8);
`

const StyledInnerBody = styled.div`
  margin-top: 21px;
  display: flex;
  flex-direction: column;
  gap: 23px;
  height: 75%;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`
const StyledBodyColumn = styled.div`
  display: grid;
  grid-template-columns: 23px 32px 1fr 60px;
  align-items: center;
  gap: 5px;
  .square_avatar .l3-style-avatar_circle {
    border: none;
  }
`

const StyledIndex = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
  text-align: center;
`
const StyledName = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
  margin-left: 10px;
`

const StyledStarContainer = styled.div`
  border: 1px solid #ffffff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(100px);
  border-radius: 4px;
  height: 20px;
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  span {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    text-decoration-line: underline;
    color: #ffffff;
  }
`
