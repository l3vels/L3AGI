import { useRef, useState } from 'react'

import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { StyledLoaderWrapper, StyledUploadDiv } from './MediasRenderer'

import Typography from 'share-ui/components/typography/Typography'
import Loader from 'share-ui/components/Loader/Loader'

import Attach from 'share-ui/components/Icon/Icons/components/Attach'
import TypographySecondary from 'components/Typography/Secondary'

const ImageRenderer = (p: any) => {
  const { t } = useTranslation()
  const [item, setItem] = useState<string | null>(null)
  const uploadRef = useRef<HTMLInputElement>(null)

  const onButtonClick = async () => {
    await setItem(p.data)
    uploadRef?.current?.click()
  }

  return (
    <>
      <input
        type='file'
        ref={uploadRef}
        style={{ display: 'none' }}
        onChange={e => {
          p.handleUpdateMedia(e, item)
        }}
      />

      {p.isLoading && p.data === item ? (
        <StyledLoaderWrapper>
          <Loader size={Loader.sizes?.XS} />
        </StyledLoaderWrapper>
      ) : p.value?.length > 0 ? (
        p.isThumbnail ? (
          <StyledImageWrapper>
            {/* <Avatar
              size={Avatar.sizes.SMALL}
              src={p.value}
              type={Avatar.types.IMG}
              rectangle
              onClick={onButtonClick}
            /> */}
          </StyledImageWrapper>
        ) : (
          <StyledImageWrapper>
            <StyledImage src={p.value} alt='' onClick={onButtonClick} />
          </StyledImageWrapper>
        )
      ) : (
        <StyledUploadDiv onClick={onButtonClick}>
          <StyledWrapper className='attach'>
            <StyledOutlineIcon>
              <Attach />
            </StyledOutlineIcon>

            <TypographySecondary
              value={t('upload')}
              type={Typography.types.LABEL}
              size={Typography.sizes.lg}
            />
          </StyledWrapper>
        </StyledUploadDiv>
      )}
    </>
  )
}

export default ImageRenderer

const StyledImageWrapper = styled.div`
  width: 100%;
  height: 100%;

  border-radius: 2px;

  margin-top: 5px;

  display: flex;
  justify-content: center;
`
const StyledImage = styled.img`
  width: 28px;
  height: 28px;

  border-radius: 2px;

  cursor: pointer;
`
const StyledOutlineIcon = styled.div`
  color: transparent;
`
const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
`
