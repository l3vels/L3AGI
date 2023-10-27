import { ChangeEvent, useRef } from 'react'
import styled from 'styled-components'

import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Button from '@l3-lib/ui-core/dist/Button'
import Loader from '@l3-lib/ui-core/dist/Loader'

import { StyledAddIcon } from 'pages/Navigation/MainNavigation'
import { ButtonSecondary, ButtonTertiary } from './Button/Button'

type UploadButtonProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  isLoading: boolean
  label?: string
}

const UploadButton = ({ onChange, isLoading, label }: UploadButtonProps) => {
  const uploadRef = useRef(null as any)

  const onAddButtonClick = async () => {
    uploadRef.current.click()
  }

  return (
    <StyledAddButtonWrapper>
      <input type='file' ref={uploadRef} style={{ display: 'none' }} onChange={onChange} />
      {isLoading ? (
        <Loader size={20} />
      ) : label ? (
        <ButtonTertiary onClick={onAddButtonClick} size={Button.sizes.SMALL}>
          {label}
        </ButtonTertiary>
      ) : (
        <IconButton
          size={IconButton.sizes.SMALL}
          icon={() => <StyledAddIcon />}
          kind={IconButton.kinds.TERTIARY}
          onClick={onAddButtonClick}
        />
      )}
    </StyledAddButtonWrapper>
  )
}

export default UploadButton

const StyledAddButtonWrapper = styled.div`
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`
