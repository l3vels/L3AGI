import { ChangeEvent, useRef } from 'react'

import styled from 'styled-components'
import Typography from '@l3-lib/ui-core/dist/Typography'

import File from '@l3-lib/ui-core/dist/icons/File'
import Loader from '@l3-lib/ui-core/dist/Loader'
import { FILE_TYPES } from 'modals/AIChatModal/fileTypes'
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
        accept='.txt .pdf, .csv, .docx, .pptx, .md, .jpg, .png, .jpeg, .epub, .mbox, .ipynb, .mp3, .mp4'
      />

      <StyledUploadButton onClick={handleUploadButton} disabled={isLoading}>
        {isLoading ? (
          <Loader size={32} />
        ) : (
          <>
            <StyledFileIcon />
            <TypographySecondary
              value='txt, pdf, csv, docx, pptx, md, jpg, png, jpeg, epub, mbox, ipynb, mp3, mp4'
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
  // Use the default value for disabled if it's not provided
  pointer-events: ${props => (props.disabled === true ? 'none' : 'auto')};
`

const StyledInput = styled.input`
  display: none;
`

const StyledFileIcon = styled(File)`
  color: #fff;
`
