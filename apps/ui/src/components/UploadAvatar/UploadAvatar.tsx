import { useRef } from 'react'

import Loader from '@l3-lib/ui-core/dist/Loader'

import styled from 'styled-components'

type UploadAvatarProps = {
  onChange: (event: any) => void
  isLoading: boolean
  avatarSrc: string
}

const UploadAvatar = ({ onChange, isLoading, avatarSrc }: UploadAvatarProps) => {
  const uploadRef = useRef(null as any)
  const onUploadAvatarClick = async () => {
    uploadRef.current.click()
  }

  return (
    <StyledAvatarInputWrapper>
      <StyledAvatarInput
        type='file'
        ref={uploadRef}
        //  style={{ display: 'none' }}
        onChange={onChange}
      />
      {isLoading ? (
        <Loader size={48} />
      ) : (
        <>
          <StyledImage src={avatarSrc} onClick={onUploadAvatarClick} />
        </>
      )}
    </StyledAvatarInputWrapper>
  )
}

export default UploadAvatar

const StyledAvatarInput = styled.input`
  display: none;
`

const StyledAvatarInputWrapper = styled.div`
  width: 64px;
  height: 64px;

  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledImage = styled.img`
  width: 64px;
  height: 64px;

  background: black;
  border-radius: 100px;

  cursor: pointer;
`
