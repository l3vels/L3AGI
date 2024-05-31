import Box from '@mui/material/Box';
import { borderBoxStyles, buttonStyles } from './styles'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'


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
                    justifyContent: 'space-between'
                }}
            >
                <Box
                    sx={{ ...borderBoxStyles, width: '49%' }}
                    display={'flex'}
                    flexDirection={'column'}
                >
                    <Typography fontSize={16} fontWeight={700}>
                        Pricing Summary
                    </Typography>
                    <Typography color="rgba(34, 51, 84, 0.7)" fontSize={14} mt={2} fontWeight={400}>
                        GPU Cost: $0.74 / hr
                    </Typography>
                    <Typography color="rgba(34, 51, 84, 0.7)" fontSize={14} fontWeight={400}>
                        Running Disk Cost: $0.006 / hr
                    </Typography>
                    <Typography color="rgba(34, 51, 84, 0.7)" fontSize={14} fontWeight={400}>
                        Exited Disk Cost: $0.006 / hr
                    </Typography>
                </Box>
                <Box
                    sx={{ ...borderBoxStyles, width: '49%' }}
                    display={'flex'}
                    flexDirection={'column'}
                >
                    <Typography fontSize={16} fontWeight={700}>
                        Pricing Summary
                    </Typography>
                    <Typography color="rgba(34, 51, 84, 0.7)" fontSize={14} mt={2} fontWeight={400}>
                        GPU Cost: $0.74 / hr
                    </Typography>
                    <Typography color="rgba(34, 51, 84, 0.7)" fontSize={14} fontWeight={400}>
                        Running Disk Cost: $0.006 / hr
                    </Typography>
                    <Typography color="rgba(34, 51, 84, 0.7)" fontSize={14} fontWeight={400}>
                        Exited Disk Cost: $0.006 / hr
                    </Typography>
                </Box>
                
            </Box>

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
        </Box>
        
    )
}

export default Price