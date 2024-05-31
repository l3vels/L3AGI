import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { borderBoxStyles, chipStyles, buttonStyles } from './styles'
import styled from 'styled-components';
import Slider from '@mui/material/Slider'
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const sliderMarks = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
]

const Details = () => {
    return (
        <Box 
            sx={{  
                width: 'calc(100% + 18px)',
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'start'
            }}
        >
            <Box
                sx={borderBoxStyles}
            >
                <Stack sx={chipStyles}>
                    Configure Deployment
                </Stack>

                <TextField 
                    id="filled-basic" 
                    label="Filled" 
                    variant="standard" 
                    size='small'
                    sx={{
                        width: '100%',
                        marginTop: '1rem',
                        backgroundColor: 'transparent',
                        '.css-v4u5dn-MuiInputBase-root-MuiInput-root:after': {
                            borderBottom: '1px solid rgba(22, 22, 22, 0.8)',
                        },
                        '.css-1c2i806-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                            color: 'rgba(22, 22, 22, 0.2)',
                        }
                    }}
                />

                <Box
                    mt={2}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Typography color="rgba(34, 51, 84, 0.7)" fontSize={14}>
                        Pod Template
                    </Typography>

                    <StyledPodTemplate>
                        <Box display={'flex'}>
                            <img src="https://cdn.worldvectorlogo.com/logos/elastic-cloud.svg" alt="" width={85} />
                            <Box
                                display={'flex'}
                                flexDirection={'column'}
                                justifyContent={'center'}
                                ml={3}
                            >
                                <Typography color="rgba(34, 51, 84, 0.7)" fontSize={14}>
                                    Pytorch 2.0.1
                                </Typography>
                                <Typography color="rgba(34, 51, 84, 0.7)" fontSize={12}>
                                    pytorch:2.0.1-py3.10-cuda11.8.0-devel-ubuntu22.04
                                </Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Button variant="contained"
                                sx={buttonStyles}
                                size='small'
                            >
                                Contained
                            </Button>
                        </Box>
                    </StyledPodTemplate>

                    <Box mt={2}>
                        <Button variant="contained"
                            sx={buttonStyles}
                            size='small'
                        >
                            Edit template
                        </Button>
                    </Box>

                    <Box 
                        display="flex"
                        flexDirection={'column'}
                        mt={2} 
                        sx={{ width: '100%' }}
                    >
                         <Typography color="rgba(34, 51, 84, 0.7)" fontSize={14}>
                            GPU Count
                        </Typography>
                        <Slider
                            aria-label="Custom marks"
                            defaultValue={3}
                            getAriaValueText={(value) => `${value}`}
                            valueLabelDisplay="auto"
                            step={1}
                            max={5}
                            min={1}
                            marks={sliderMarks}
                            sx={{ color: '#000000' }}
                        />
                    </Box>

                    <Box mt={2} display={'flex'} flexDirection={'column'}>
                        <Typography color="rgba(34, 51, 84, 0.7)" fontSize={14}>
                            Instance Pricing
                        </Typography>

                        <Box mt={2} display={'flex'}>
                            <Box>
                                <Card sx={{ width: '230px', border: 'none', boxShadow: 'none' }}>
                                    <CardActionArea sx={{ 
                                        // border: 'none', 
                                        boxShadow: 'none', 
                                        borderRadius: '10px',
                                        background: 'rgba(50, 50, 50, 0.1)',
                                        border: '1px solid rgba(22, 22, 22, 0.8)',
                                    }}>
                                        <Box p={2}>
                                            <Typography fontSize={16}>
                                                On-Demand
                                            </Typography>
                                            <Typography color="rgba(34, 51, 84, 0.7)" fontSize={12}>
                                                Non-Interruptible
                                            </Typography>
                                            <Typography fontSize={18} mt={1}>
                                                $0.74/hr
                                            </Typography>
                                            <Typography color="rgba(34, 51, 84, 0.7)" fontSize={12} mt={1}>
                                                Pay as you go, with costs based on actual usage time.
                                            </Typography>
                                        </Box>
                                    </CardActionArea>
                                </Card>
                            </Box>

                            <Box ml={2}>
                                <Card sx={{ width: '230px', border: 'none', boxShadow: 'none' }}>
                                    <CardActionArea sx={{ 
                                        border: 'none', 
                                        boxShadow: 'none', 
                                        borderRadius: '10px',
                                        background: '#ffffff',
                                    }}>
                                        <Box p={2}>
                                            <Typography fontSize={16}>
                                                On-Demand
                                            </Typography>
                                            <Typography color="rgba(34, 51, 84, 0.7)" fontSize={12}>
                                                Non-Interruptible
                                            </Typography>
                                            <Typography fontSize={18} mt={1}>
                                                $0.74/hr
                                            </Typography>
                                            <Typography color="rgba(34, 51, 84, 0.7)" fontSize={12} mt={1}>
                                                Pay as you go, with costs based on actual usage time.
                                            </Typography>
                                        </Box>
                                    </CardActionArea>
                                </Card>

                            </Box>

                        </Box>
                    </Box>

                    <Box display={'flex'} flexDirection={'column'} mt={2}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Encrypt Volume" />
                            <FormControlLabel disabled control={<Checkbox />} label="SSH Terminal Access" />
                            <FormControlLabel  control={<Checkbox />} label="Start Jupyter Notebook" />
                        </FormGroup>
                    </Box>

                </Box>

            </Box>
        </Box>
    )
}

export default Details


const StyledPodTemplate = styled.div`
    width: 100%;
    background: #ffffff;
    border-radius: 10px;
    padding: 5px 2rem 5px 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`