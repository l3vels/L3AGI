import { useState } from 'react'
import styled from 'styled-components'

import Check from 'share-ui/components/Icon/Icons/components/Check'
import Copy from 'share-ui/components/Icon/Icons/components/Copy'

type CopyButtonProps = {
  onCopyClick: () => void
}

const CopyButton = ({ onCopyClick }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopyClick = () => {
    onCopyClick()
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <StyledActionButton onClick={handleCopyClick}>
      {copied ? <StyledCheckIcon size={20} /> : <StyledCopyIcon size={20} />}
    </StyledActionButton>
  )
}

export default CopyButton

export const StyledActionButton = styled.div`
  opacity: 0.5;
  :hover {
    opacity: 1;
    cursor: pointer;
  }
`

const StyledCopyIcon = styled(Copy)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`
const StyledCheckIcon = styled(Check)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }
`
