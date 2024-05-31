import Box from '@mui/material/Box'
import { borderBoxStyles } from './styles'
import Typography from '@mui/material/Typography'

import { ButtonPrimary } from 'components/Button/Button'
import styled from 'styled-components'

const Price = () => {
  return (
    <Box
      sx={{
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ ...borderBoxStyles, width: '49%' }} display={'flex'} flexDirection={'column'}>
          <Typography fontSize={16} fontWeight={700}>
            Pricing Summary
          </Typography>
          <Typography color='rgba(34, 51, 84, 0.7)' fontSize={14} mt={2} fontWeight={400}>
            GPU Cost: $0.74 / hr
          </Typography>
          <Typography color='rgba(34, 51, 84, 0.7)' fontSize={14} fontWeight={400}>
            Running Disk Cost: $0.006 / hr
          </Typography>
          <Typography color='rgba(34, 51, 84, 0.7)' fontSize={14} fontWeight={400}>
            Exited Disk Cost: $0.006 / hr
          </Typography>
        </Box>
        <Box sx={{ ...borderBoxStyles, width: '49%' }} display={'flex'} flexDirection={'column'}>
          <Typography fontSize={16} fontWeight={700}>
            Pricing Summary
          </Typography>
          <Typography color='rgba(34, 51, 84, 0.7)' fontSize={14} mt={2} fontWeight={400}>
            GPU Cost: $0.74 / hr
          </Typography>
          <Typography color='rgba(34, 51, 84, 0.7)' fontSize={14} fontWeight={400}>
            Running Disk Cost: $0.006 / hr
          </Typography>
          <Typography color='rgba(34, 51, 84, 0.7)' fontSize={14} fontWeight={400}>
            Exited Disk Cost: $0.006 / hr
          </Typography>
        </Box>
      </Box>

      <Box sx={{ marginTop: '20px', paddingBottom: '50px' }}>
        <StyledButton>Deploy On-Demand</StyledButton>
      </Box>
    </Box>
  )
}

export default Price

const StyledButton = styled(ButtonPrimary)`
  width: 100%;
  font-weight: 500;
`
