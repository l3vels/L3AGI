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
import ProgressBar from './ProsgressBar'

const cpu = [
  { name: 'llm2 Fine-tune', cpu: 'base:0.5.1-cpu', ram: '46 GB', running: true, mem: 0 },
  { name: 'Tain OpenAI', cpu: 'base:0.5.1-cpu', ram: '32 GB', running: false, mem: 40 },
  { name: 'Meta Llama', cpu: 'base:0.5.1-cpu', ram: '16 GB', running: true, mem: 10 },
  { name: 'NV-Embed', cpu: 'base:0.5.1-cpu', ram: '128 GB', running: false, mem: 50 },
  { name: 'Tele-AI', cpu: 'base:0.5.1-cpu', ram: '46 GB', running: false, mem: 90 },
  { name: 'Nitral-AI', cpu: 'base:0.5.1-cpu', ram: '50 GB', running: true, mem: 5 },
]

const Pods = () => {
  const navigate = useNavigate()
  const outlet = useOutlet()

  return (
    <StyledAppContainer>
      <StyledContainer>
        <StyledMainWrapper>
          <StyledLeftColumn customWidth={400}>
            <Box display={'flex'} flexDirection={'column'} sx={{ paddingRight: 1.5 }}>
              <ListHeader title={'Pods'} onAddClick={() => navigate('/pods/create-pod')} />

              {cpu.map((item, index) => (
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
                        {item.name}
                      </Typography>
                      <Typography fontSize={12}>CPU: {item.cpu}</Typography>
                      <Typography fontSize={12}>RAM: {item.ram}</Typography>
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
