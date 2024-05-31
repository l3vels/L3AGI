import Box from '@mui/material/Box';
import { borderBoxStyles } from './styles'
import Typography from '@mui/material/Typography';


const Price = () => {
    return (
        
        <Box 
            sx={{  
                width: 'calc(100% + 18px)',
                boxSizing: 'border-box',
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
    )
}

export default Price