import { ReactNode, useState } from 'react'
import { CallContext } from '../contexts'
import styled from 'styled-components'
import { ButtonPrimary } from 'components/Button/Button'
import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'
import TypographySecondary from 'components/Typography/Secondary'
import {
  TypographySizes,
  TypographyTypes,
} from 'share-ui/components/typography/TypographyConstants'
import TypographyQuaternary from 'components/Typography/Quaternary'
import { Mute, Sound } from 'share-ui/components/Icon/Icons'
import IconButton from 'share-ui/components/IconButton/IconButton'

const CallProvider = ({ children }: { children: ReactNode }) => {
  const [shoWCall, setShowCall] = useState(true)
  const [mute, setMute] = useState(true)

  const contextValue = {
    shoWCall,
    setShowCall,
  }

  return (
    <CallContext.Provider value={contextValue}>
      {children}
      {shoWCall && (
        <StyledCallWindow>
          <StyledWindowHeader>
            <TypographyQuaternary value={'title placeholder'} size={'large'} />
          </StyledWindowHeader>
          <StyledWindowBody>
            <StyledAvatarWrapper>
              <AvatarGenerator name={'Test Person'} size={50} />
              <TypographyQuaternary value={'Test Person'} size={'small'} />
            </StyledAvatarWrapper>

            <StyledAvatarWrapper>
              <AvatarGenerator name={'Test Agent'} size={50} />
              <TypographyQuaternary value={'Test Agent'} size={'small'} />
            </StyledAvatarWrapper>
          </StyledWindowBody>

          <StyledWindowFooter>
            <IconButton
              onClick={() => setMute(!mute)}
              size={'small'}
              ariaLabel={mute ? 'Unmute' : 'Mute'}
              icon={() => {
                return <>{mute ? <Mute /> : <Sound />}</>
              }}
            />

            <ButtonPrimary onClick={() => setShowCall(false)} size={'small'}>
              Hung up
            </ButtonPrimary>
          </StyledWindowFooter>
        </StyledCallWindow>
      )}
    </CallContext.Provider>
  )
}

export default CallProvider

const StyledCallWindow = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;

  width: 350px;
  height: 200px;

  border-radius: 10px;

  background-color: #000;

  z-index: 10000000;

  display: flex;
  flex-direction: column;
`

const StyledWindowHeader = styled.div`
  height: 40px;
  /* background-color: red; */
  background-color: rgba(255, 255, 255, 0.1);
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.4); */

  width: 100%;

  padding: 12px 16px;

  border-radius: 10px 10px 0 0;

  display: flex;
  align-items: center;
`

const StyledWindowBody = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  justify-content: space-around;
  align-items: center;

  padding: 8px;
`

const StyledWindowFooter = styled.div`
  height: 100px;
  width: 100%;

  background-color: rgba(255, 255, 255, 0.1);

  display: flex;
  justify-content: center;
  gap: 4px;

  padding: 4px;

  border-radius: 0 0 10px 10px;
`
const StyledAvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`
