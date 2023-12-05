import { ChangeEvent, useRef } from 'react'

import styled from 'styled-components'
import Typography from 'share-ui/components/typography/Typography'

import File from 'share-ui/components/Icon/Icons/components/File'
import Loader from 'share-ui/components/Loader/Loader'
import { SUPPORTED_FILE_EXTENSIONS } from 'modals/AIChatModal/fileTypes'
import TypographySecondary from 'components/Typography/Secondary'

type UploadButtonProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  isLoading: boolean
}

const UploadButton = ({ onChange, isLoading }: UploadButtonProps) => {
  const uploadRef = useRef<HTMLInputElement>(null)

  const handleUploadButton = async () => {
    uploadRef.current?.click()
  }

  return (
    <>
      <StyledInput
        type='file'
        ref={uploadRef}
        onChange={onChange}
        multiple
        accept={SUPPORTED_FILE_EXTENSIONS.join(', ')}
      />

      <StyledUploadButton onClick={handleUploadButton} disabled={isLoading}>
        {isLoading ? (
          <Loader size={32} />
        ) : (
          <>
            <StyledFileIcon />
            <TypographySecondary
              value={SUPPORTED_FILE_EXTENSIONS.join(', ')}
              type={Typography.types.LABEL}
              size={Typography.sizes.xss}
            />
          </>
        )}
      </StyledUploadButton>
    </>
  )
}

export default UploadButton

const StyledUploadButton = styled.div<{ disabled?: boolean }>`
  width: 100%;
  height: 120px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 13px;
  cursor: pointer;
  border: ${({ theme }) => theme.body.border};
  background: ${({ theme }) => theme.body.textAreaBgColor};
  pointer-events: ${props => (props.disabled === true ? 'none' : 'auto')};
`

const StyledInput = styled.input`
  display: none;
`

const StyledFileIcon = styled(File)`
  color: ${({ theme }) => theme.body.iconColor};
`
