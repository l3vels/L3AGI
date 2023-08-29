import { ChangeEvent, useRef } from 'react'
import styled from 'styled-components'

import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Loader from '@l3-lib/ui-core/dist/Loader'
import Add from '@l3-lib/ui-core/dist/icons/Add'

type UploadButtonProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  isLoading: boolean
}

const UploadButton = ({ onChange, isLoading }: UploadButtonProps) => {
  const uploadRef = useRef(null as any)

  const onAddButtonClick = async () => {
    uploadRef.current.click()
  }

  return (
    <StyledAddButtonWrapper>
      <input type='file' ref={uploadRef} style={{ display: 'none' }} onChange={onChange} />
      {isLoading ? (
        <Loader size={20} />
      ) : (
        <IconButton
          size={IconButton.sizes.SMALL}
          icon={Add}
          kind={IconButton.kinds.TERTIARY}
          onClick={onAddButtonClick}
        />
      )}
    </StyledAddButtonWrapper>
  )
}

export default UploadButton

const StyledAddButtonWrapper = styled.div`
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`
