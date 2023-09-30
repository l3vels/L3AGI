import { ChangeEvent, useRef } from 'react'

import styled from 'styled-components'
import Typography from '@l3-lib/ui-core/dist/Typography'

import File from '@l3-lib/ui-core/dist/icons/File'
import Loader from '@l3-lib/ui-core/dist/Loader'
import TypographySecondary from 'components/Typography/Secondary'

type UploadButtonProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  isLoading: boolean
  hasValue: boolean
}

const UploadButton = ({ onChange, isLoading, hasValue }: UploadButtonProps) => {
  const uploadRef = useRef(null as any)
  const handleUploadButton = async () => {
    uploadRef.current.click()
  }
  return (
    <>
      <input type='file' ref={uploadRef} style={{ display: 'none' }} onChange={onChange} />

      <StyledUploadButton onClick={handleUploadButton} disabled={isLoading}>
        {isLoading ? (
          <Loader size={32} />
        ) : (
          <>
            <StyledFileIcon />
            <TypographySecondary
              value='csv, pdf, txt, ms-excel, etc.'
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
  width: 220px;
  height: 100px;
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

const StyledFileIcon = styled(File)`
  color: #fff;
`
