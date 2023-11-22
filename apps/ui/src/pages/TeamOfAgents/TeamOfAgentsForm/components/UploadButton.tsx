import { ChangeEvent, useRef } from 'react'

import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import Typography from 'share-ui/components/typography/Typography'

import File from 'share-ui/components/Icon/Icons/components/File'
import Loader from 'share-ui/components/Loader/Loader'
import TypographySecondary from 'components/Typography/Secondary'

type UploadButtonProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  isLoading: boolean
  hasValue: boolean
}

const UploadButton = ({ onChange, isLoading, hasValue }: UploadButtonProps) => {
  const { t } = useTranslation()
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
              value={t('csv-pdf-txt-ms-excel-etc')}
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
