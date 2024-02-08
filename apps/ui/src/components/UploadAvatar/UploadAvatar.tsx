import { useRef } from 'react'

import Loader from 'share-ui/components/Loader/Loader'

import styled from 'styled-components'
import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'

type UploadAvatarProps = {
  onChange: (event: any) => void
  isLoading: boolean
  avatarSrc: string
  name?: string
}

const UploadAvatar = ({ onChange, isLoading, avatarSrc, name = '' }: UploadAvatarProps) => {
  const uploadRef = useRef(null as any)
  const onUploadAvatarClick = async () => {
    uploadRef.current.click()
  }

  return (
    <StyledAvatarInputWrapper onClick={onUploadAvatarClick}>
      <StyledAvatarInput
        type='file'
        ref={uploadRef}
        //  style={{ display: 'none' }}
        onChange={onChange}
      />
      {isLoading ? (
        <Loader size={48} />
      ) : (
        <AvatarGenerator name={name} size={80} avatar={avatarSrc} />
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

  border-radius: 100px;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
