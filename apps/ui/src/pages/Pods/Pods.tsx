import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import ListHeader from 'routes/components/ListHeader'

import {
  StyledChatWrapper,
  StyledContainer,
  StyledLeftColumn,
  StyledMainWrapper,
} from 'routes/ChatRouteLayout'
import { useNavigate, useOutlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { usePod } from './usePods'
import Loader from 'share-ui/components/Loader/Loader'

const Pods = () => {
  const { pods, pods_loading } = usePod()
  const navigate = useNavigate()
  const outlet = useOutlet()

  return (
    <StyledAppContainer>
      <StyledContainer>
        <StyledMainWrapper>
          <StyledLeftColumn customWidth={400}>
            <Box display={'flex'} flexDirection={'column'} sx={{ paddingRight: 1.5 }} position={'relative'}>
              <ListHeader title={'Pods'} onAddClick={() => navigate('/pods/create-pod')} />

              {pods.map((item, index: number) => (
                <>
                  {pods_loading &&
                    <Box position={'absolute'} zIndex={5} sx={{ marginTop: '15%', marginLeft: '40%' }}>
                      <Loader size={50} />
                    </Box>
                  }
                  <Box
                    key={index}
                    display={'flex'}
                    mt={1}
                    sx={{
                      width: '100%',
                      background: 'rgb(255, 255, 255)',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
                      '&:hover': {
                        backgroundColor: 'rgb(250, 250, 250)', // Change this color as needed
                      },
                    }}
                  >
                    <Box
                      display={'flex'}
                      justifyContent={'space-between'}
                      sx={{ padding: '.5rem', width: '100%' }}
                    >
                      <Box display={'flex'} flexDirection={'column'}>
                        <Typography fontSize={14} fontWeight={700}>
                          {item.pod_name}
                        </Typography>
                        <Typography fontSize={12}>Template: {item.template_container_image}</Typography>
                        <Typography fontSize={12}>{item.resource_display_name} - RAM {item.resource_ram} GB</Typography>
                      </Box>

                      <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                        <Typography
                          fontSize={13}
                          fontWeight={500}
                          sx={{
                            color: item.running ? '#17C568' : '#EF5533',
                            background: item.running ? '#F1FEED' : '#FCEAEC',
                            padding: '4px 15px',
                            borderRadius: '8px',
                          }}
                        >
                          {item.running ? 'Running' : 'Stopped'}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </>
              ))}
            </Box>
          </StyledLeftColumn>

          <StyledChatWrapper>{outlet}</StyledChatWrapper>
        </StyledMainWrapper>
      </StyledContainer>
    </StyledAppContainer>
  )
}

export default Pods

// export const StyledContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
//   height: 100%;
//   overflow: hidden;
//   position: relative;
// `
// export const StyledMainWrapper = styled.div`
//   padding: 16px;
//   padding-right: 0;
//   margin-right: 20px;
//   border-radius: 16px;
//   background: ${({ theme }) => theme.body.componentsWrapperBg};
//   display: flex;
//   justify-content: center;
//   width: 100%;
//   height: 100%;
// `
