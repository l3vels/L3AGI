import Button from '@l3-lib/ui-core/dist/Button'

import styled from 'styled-components'
// import Button from 'bf-ui/dist/Button'

export const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 130px 0;
  background-color: #f0f0f0;
  border-radius: 8px;
`

export const StyledUserName = styled.span`
  font-weight: bold;
  text-transform: capitalize;
`

export const StyledSelectContainer = styled.div`
  display: flex;
  align-items: center;
`

export const StyledSelect = styled.select`
  padding: 10px 40px 10px 20px;
  font-size: 16px;
  cursor: pointer;
`

export const StyledOptions = styled.option`
  font-size: 16px;
`

export const StyledButton = styled(Button)`
  padding: 21px 30px !important;
  margin-left: 10px;
  &:hover {
    opacity: 0.9;
  }
`
