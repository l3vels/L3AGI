import Button from 'share-ui/components/Button/Button'

import styled from 'styled-components'

export const StyledRoot = styled.div`
  /* border: 1px solid red; */
`
export const StyledCardHeder = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 40px;
`

export const StyledHeaderNavFirst = styled.span`
  padding: 12px;
  border: 1px solid #dee2e6;
  white-space: nowrap;
  border-radius: 2px;
  color: #495057;
  cursor: pointer;
  border-bottom-color: #fff;
`

export const StyledBottomLine = styled.div`
  border-bottom: 1px solid #dee2e6;
  width: 100%;
`

export const StyledInputContainer = styled.div`
  display: flex;
  align-items: end;
  height: 65px;
`

export const StyledButton = styled(Button)`
  padding: 10px 12px;
  border-radius: 4px;
  margin-left: 40px;
`
