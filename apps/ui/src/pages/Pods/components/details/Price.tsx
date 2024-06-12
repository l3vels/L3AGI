import Box from '@mui/material/Box'
import { borderBoxStyles } from '../../styles'
import Typography from '@mui/material/Typography'

import { ButtonPrimary } from 'components/Button/Button'
import styled from 'styled-components'
import { Resource } from 'types/resource'
import { PlanCard } from './useDetails'
import { FormikProps } from 'formik'
import Loader from 'share-ui/components/Loader/Loader'

interface PriceProps {
  selectedPlan: PlanCard
  formik: any
  resource: Resource,
  create_pod_loading: boolean
}

const Price = ({ selectedPlan, formik, resource, create_pod_loading }: PriceProps) => {
  const { max_gpu: maxGpu } = formik.values
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
          {!selectedPlan.per_mont ?
            (<>
              <Typography color='rgba(34, 51, 84, 0.7)' fontSize={14} mt={2} fontWeight={400}>
                GPU Cost: ${(selectedPlan.default_price * maxGpu).toFixed(2)} / hr
              </Typography>
              <Typography color='rgba(34, 51, 84, 0.7)' fontSize={14} fontWeight={400}>
                Running Disk Cost: $0.008 / hr
              </Typography>
              <Typography color='rgba(34, 51, 84, 0.7)' fontSize={14} fontWeight={400}>
                Exited Disk Cost: $0.006 / hr
              </Typography>

            </>)
            :
            (<>
            <Box>
              <Box>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={2}>
                  <Typography color='rgba(0, 0, 0, 0.761)' fontSize={15}  fontWeight={600}>
                    Upfront Costs
                  </Typography>
                  <Typography color='rgba(0, 0, 0, 0.761)' fontSize={15}  fontWeight={600}>
                    ${(selectedPlan.default_total_price ? selectedPlan.default_total_price * maxGpu : 0).toFixed(2)}
                  </Typography>
                </Box>
                <Typography color='rgba(34, 51, 84, 0.7)' fontSize={14} fontWeight={400}>
                  {resource.display_name} x {maxGpu}
                </Typography>
                <Typography color='rgba(34, 51, 84, 0.7)' fontSize={14} fontWeight={400}>
                  {selectedPlan.title}
                </Typography>
              </Box>

              <Box>
                <Typography color='rgba(0, 0, 0, 0.761)' fontSize={15} mt={2} fontWeight={600}>
                  Usage-Based Costs
                </Typography>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography color='rgba(34, 51, 84, 0.7)' fontSize={14} fontWeight={400}>
                    {resource.display_name}
                  </Typography>

                  <Typography color='rgba(0, 0, 0, 0.761)' fontSize={15}  fontWeight={600}>
                    $0.008 /hr
                  </Typography>
                </Box>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                  <Typography color='rgba(34, 51, 84, 0.7)' fontSize={14} fontWeight={400}>
                    {selectedPlan.title}
                  </Typography>
                  <Typography color='rgba(0, 0, 0, 0.761)' fontSize={15}  fontWeight={600}>
                    $0.014 /hr
                  </Typography>
                </Box>
              </Box>
            </Box>
            </>)
          }
        </Box>
        <Box sx={{ ...borderBoxStyles, width: '49%' }} display={'flex'} flexDirection={'column'}>
          <Typography fontSize={16} fontWeight={700}>
            Pod Summary
          </Typography>
          <Typography color='rgba(34, 51, 84, 0.7)' fontSize={14} mt={2} fontWeight={400}>
            {maxGpu}x {resource.display_name} ({resource.ram * maxGpu} GB VRAM)
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
        <StyledButton onClick={() => formik.handleSubmit()}>
          {create_pod_loading ? <Loader size={30} /> : 'Deploy On-Demand'}
        </StyledButton>
      </Box>
    </Box>
  )
}

export default Price

const StyledButton = styled(ButtonPrimary)`
  width: 100%;
  font-weight: 500;
`
