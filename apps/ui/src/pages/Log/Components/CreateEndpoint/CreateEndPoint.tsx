import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import Button from 'share-ui/components/Button/Button'
import Typography from 'share-ui/components/typography/Typography'
import TextField from 'share-ui/components/TextField/TextField'
import outsideClick from 'helpers/outsideClick'
import useLog from 'pages/Log/useLog'
// import LogList from '../LogList'

import TypographyPrimary from 'components/Typography/Primary'
import { ButtonPrimary } from 'components/Button/Button'

const CreateEndPoint = ({ onClose }: { onClose: Function }) => {
  const { log_list } = useLog()
  const [is_open, setIsOpen] = React.useState(false)
  const ref = useRef(null)
  const [gqlName, setGqlName] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filteredLogs, setFilteredLogs] = useState([])

  const handleFilter = () => {
    // Apply the filter based on gqlName
    const filteredLogs = log_list.filter((item: { gql_name: string }) => item.gql_name === gqlName)
    setFilteredLogs(filteredLogs)
  }

  const handleOnChange = (value: string) => {
    setGqlName(value)
  }

  outsideClick(ref, () => {
    if (is_open) setIsOpen(false)
  })

  return (
    <StyledEndPointContainer ref={ref}>
      <StyledFieldWrapper>
        <TextField
          placeholder='e.g/ v1/checkout/sessions'
          value={gqlName}
          onChange={(value: string) => handleOnChange(value)}
        />
      </StyledFieldWrapper>
      <StyledButtonContainer>
        <StyledTertiaryButton size={Button.sizes?.SMALL} onClick={onClose}>
          <TypographyPrimary
            value='Clear'
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
          />
        </StyledTertiaryButton>

        <StyledPrimaryButton size={Button.sizes?.SMALL} onClick={handleFilter}>
          <TypographyPrimary
            value='Apply'
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
          />
        </StyledPrimaryButton>
      </StyledButtonContainer>
    </StyledEndPointContainer>
  )
}

export default CreateEndPoint

// Rest of the code...

const StyledEndPointContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 16px;
  position: absolute;
  width: 319px;
  height: 144px;
  right: 0px;
  top: 181px;
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(100px);
  border-radius: 16px;
  flex: none;
  order: 3;
  flex-grow: 0;
  z-index: 3;
`
const StyledFieldWrapper = styled.div`
  width: 287px;
  height: 44px;
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: flex-start;
`
const StyledButtonContainer = styled.div`
  width: 287px;
  height: 44px;
  display: flex;
  position: relative;
  justify-content: flex-end;
  align-items: center;
  color: #ffffff;
  //   gap: 90px;
`
const StyledPrimaryButton = styled(ButtonPrimary)`
  padding: 10px 26px;
`
const StyledTertiaryButton = styled(ButtonPrimary)`
  padding: 10px 26px;
`
