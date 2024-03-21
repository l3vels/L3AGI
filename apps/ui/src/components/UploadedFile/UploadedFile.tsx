import styled from 'styled-components'

import Typography from 'share-ui/components/typography/Typography'
import Doc from 'share-ui/components/Icon/Icons/components/Doc'
import IconButton from 'share-ui/components/IconButton/IconButton'

import Close from 'share-ui/components/Icon/Icons/components/Close'

type UploadedFileProps = {
  onClick?: () => void
  name: string
  onDeleteClick?: () => void
}

const UploadedFile = ({ name, onClick, onDeleteClick }: UploadedFileProps) => {
  const handleDelete = (event: any) => {
    event.stopPropagation()
    if (onDeleteClick) {
      onDeleteClick()
    }
  }

  return (
    <StyledUploadedFile
      onClick={() => {
        if (onClick) onClick()
      }}
    >
      <StyledIconWrapper>
        <StyledDocIcon />
      </StyledIconWrapper>
      <StyledTextWrapper>
        <Typography
          value={name}
          type={Typography.types.LABEL}
          size={Typography.sizes.xss}
          customColor={'#000'}
        />
      </StyledTextWrapper>
      {handleDelete && (
        <IconButton
          onClick={handleDelete}
          size={IconButton.sizes?.XS}
          icon={() => <StyledCloseIcon size='22' />}
          kind={IconButton.kinds?.TERTIARY}
          ariaLabel='Delete'
        />
      )}
    </StyledUploadedFile>
  )
}

export default UploadedFile

const StyledUploadedFile = styled.div`
  min-width: 120px;
  width: fit-content;
  height: 30px;
  background: #e6e6e6;
  border-radius: 8px;

  display: flex;
  align-items: center;
  cursor: pointer;
`

const StyledTextWrapper = styled.div`
  width: 100%;
  min-width: fit-content;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0px 5px;
`

const StyledIconWrapper = styled.div`
  background-color: #9b9b9b;
  color: #fff;
  height: 100%;
  min-width: 30px;
  width: 30px;

  border-radius: 8px 0px 0px 8px;

  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledDocIcon = styled(Doc)`
  path {
    fill: ${({ theme }) => theme.body.secondaryIconColor};
  }
`

const StyledCloseIcon = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.body.tertiaryIconColor};
  }
`
