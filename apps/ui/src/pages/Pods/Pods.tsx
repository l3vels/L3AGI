import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import ListHeader from 'routes/components/ListHeader'

import {
    StyledChatWrapper,
    StyledContainer,
    StyledLeftColumn,
    StyledMainWrapper,
  } from 'routes/ChatRouteLayout'
import { useNavigate, useOutlet } from 'react-router-dom'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const cpu = [
    {  cpu: 'base:0.5.1-cpu', ram: '46 GB', running: true  },
    {  cpu: 'base:0.5.1-cpu', ram: '32 GB', running: false  },
    {  cpu: 'base:0.5.1-cpu', ram: '16 GB', running: true  },
    {  cpu: 'base:0.5.1-cpu', ram: '128 GB', running: false  },
    {  cpu: 'base:0.5.1-cpu', ram: '46 GB', running: false  },
    {  cpu: 'base:0.5.1-cpu', ram: '50 GB', running: true  },
]


const Pods = () => {
  const navigate = useNavigate()
  const outlet = useOutlet()

    return (
        <StyledAppContainer>
            <StyledContainer>
                <StyledMainWrapper>
                    <StyledLeftColumn>
                        <Box display={'flex'} flexDirection={'column'}>
                            <ListHeader
                                title={"Pods"}
                                multiOption={[
                                {
                                    label: `Create`,
                                    function: () => navigate('/pods/create-pod'),
                                },
                                ]}
                            />

                            {cpu.map((item, index) => (
                                <Box 
                                    key={index}
                                    display={'flex'}
                                    mt={1} 
                                    sx={{ 
                                        width: '100%', 
                                        background: 'rgba(217, 217, 217, 0.342)',
                                        borderStartStartRadius: '10px',
                                        borderEndStartRadius: '10px',
                                        cursor: 'pointer'
                                    }}
                                    >
                                    <Box
                                        display={'flex'}
                                        justifyContent={'space-between'}
                                        sx={{ padding: '.5rem', width: '100%' }}
                                    >
                                        <Box display={'flex'} flexDirection={'column'}>
                                            <Typography fontSize={14} fontWeight={700}>
                                                Compute
                                            </Typography>
                                            <Typography fontSize={12}>
                                                CPU: {item.cpu}
                                            </Typography>
                                            <Typography fontSize={12}>
                                                RAM: {item.ram}
                                            </Typography>
                                            
                                        </Box>

                                        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                                            <Typography fontSize={13} fontWeight={500} sx={{
                                                color: item.running ? 'green' : 'red',
                                                background: item.running ? 'rgba(0, 255, 110, 0.12)' : 'rgba(255, 0, 0, 0.12)',
                                                padding: '4px 15px',
                                                borderRadius: '8px'
                                            }}>
                                                 {item.running ? 'Running' : 'Stopped'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </StyledLeftColumn>

                    <StyledChatWrapper>
                        {outlet}
                    </StyledChatWrapper>
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