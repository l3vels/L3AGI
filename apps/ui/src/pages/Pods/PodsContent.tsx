import styled from 'styled-components'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import ActionAreaCard from './Card'
import Details from './Details'
import FilterPods from './FilterPods'
import Price from './Price'

import { chipStyles, borderBoxStyles, buttonStyles } from './styles'
import React from 'react';
import Button from '@mui/material/Button'

const Line = ({ label }: { label: string }) => {
    return (
        <StyledLineContainer>
            <Stack
                sx={{

                }}
            >
                <Chip label={label} sx={{ borderRadius: '10px' }} size='small'  />
            </Stack>
            <StyledLine />
        </StyledLineContainer>
    )
}

const temp_data = {
    'NVIDIA': [
        { name: 'RTX 4090', price: '$0.74/hr', ram: '48 GB RAM', vram: '125 GB RAM', cram: '28 vCPU', id: 1 },
        { name: 'H100 SXM', price: '$1/hr', ram: '23 GB RAM', vram: '90 GB RAM', cram: '24 vCPU', id: 2 },
        { name: 'H100 PCIe', price: '$0.32/hr', ram: '44 GB RAM', vram: '140 GB RAM', cram: '32 vCPU', id: 3 },
        { name: 'L40', price: '$0.74/hr', ram: '55 GB RAM', vram: '130 GB RAM', cram: '22 vCPU', id: 4 },
        { name: 'RTX 6000 Ada', price: '$2.01/hr', ram: '32 GB RAM', vram: '150 GB RAM', cram: '32 vCPU', id: 5 },
        { name: 'RTX 4000 Ada', price: '$1.4/hr', ram: '16 GB RAM', vram: '100 GB RAM', cram: '64 vCPU', id: 6 },
        { name: 'RTX 3090', price: '$0.20/hr', ram: '12 GB RAM', vram: '250 GB RAM', cram: '56 vCPU', id: 7 },
        { name: 'RTX A4500', price: '$0.32/hr', ram: '8 GB RAM', vram: '300 GB RAM', cram: '12 vCPU', id: 8 },
    ],
    'AMD': [
        { name: 'RTX', price: '$0.74/hr', ram: '48 GB RAM', vram: '125 GB RAM', cram: '32 vCPU', id: 9 },
        { name: 'RTX A4000', price: '$0.74/hr', ram: '48 GB RAM', vram: '125 GB RAM', cram: '32 vCPU', id: 10 },
        { name: 'A100 SXM', price: '$0.74/hr', ram: '48 GB RAM', vram: '125 GB RAM', cram: '32 vCPU', id: 11 },
        { name: 'RTX 6000 Ada', price: '$0.74/hr', ram: '48 GB RAM', vram: '125 GB RAM', cram: '32 vCPU', id: 12 },
        { name: 'A100 PCIe', price: '$0.74/hr', ram: '48 GB RAM', vram: '125 GB RAM', cram: '32 vCPU', id: 13 },
        { name: 'H100 PCIe', price: '$0.74/hr', ram: '48 GB RAM', vram: '125 GB RAM', cram: '32 vCPU', id: 14 },
        { name: 'RTX', price: '$0.74/hr', ram: '48 GB RAM', vram: '125 GB RAM', cram: '32 vCPU', id: 15 },
    ]
}


const PodsContent = () => {
    const [selectPod, setSelectPod] = React.useState<null | number>(null) 

    const data_keys = Object.keys(temp_data)
    return (
        <StyledBox>
            <StyledContainer>
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
                            Select an Instance
                        </Stack>

                        

                        <Box>
                            <FilterPods />
                        </Box>

                        {data_keys.map((key: string, index: number) => (
                            <Box mt={2} key={index}>
                                <Line label={key} />
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 2 }} mt={2} rowGap={1}>
                                    {temp_data[key].map((item, i) => (
                                        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                                            <ActionAreaCard 
                                                item={item} 
                                                selected={selectPod}
                                                selectCard={setSelectPod} 
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {selectPod &&
                    <>
                        <Details />
                        <Price />
                        <Box>

                            <Button 
                                variant="contained"
                                sx={{
                                    ...buttonStyles,
                                    width: '100%',
                                }}
                            >
                                Deploy On-Demand
                            </Button>
                        </Box>
                    </>
                }



            </StyledContainer>
        </StyledBox>
    )
}

export default PodsContent

const StyledBox = styled.div`
    width: 100%;
    overflow-y: auto;
`

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 27px;
    max-width: 80rem;
    margin-left: auto;
    margin-right: auto;
    @media (min-width: 960px) {
        padding-left: 36px;
        padding-right: 36px;
    }
`

const StyledLineContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const StyledLine = styled.div`
    width: 94%;
    height: 1px;
    background: rgba(34, 51, 84, 0.1);
`