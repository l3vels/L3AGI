import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box'

export default function ActionAreaCard({ item, selected, selectCard }: any) {
    const color = 'rgba(34, 51, 84, 0.7)'
    const isSelected = selected && selected === item.id
  return (
    <Card sx={{ width: '100%', border: 'none', boxShadow: 'none', background: 'transparent' }} onClick={() => selectCard(item.id)}>
      <CardActionArea sx={{ 
        border: isSelected ? '1px solid rgba(22, 22, 22, 0.8)' : '1px solid rgba(22, 22, 22, 0.2)', 
        boxShadow: 'none', 
        borderRadius: '10px',
        ...(isSelected ? { backgroundColor: 'rgba(50, 50, 50, 0.1)' } : {})
    }}>
        <CardContent
            sx={{
                border: 'none',
             }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography gutterBottom component="div" fontSize={16}>
                        {item.name}
                    </Typography>
                    <Typography gutterBottom component="div" fontSize={14}>
                        {item.price}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                    mt={2}
                >
                    <Typography gutterBottom component="div" fontSize={13} color={color}>
                        {item.ram}
                    </Typography>
                    <Typography gutterBottom component="div" fontSize={11} color={color}>
                        8 max
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography gutterBottom component="div" fontSize={13} color={color}>
                        {item.vram} *  {item.cram}
                    </Typography>
                    <Typography gutterBottom component="div" fontSize={11} color={'rgb(124, 179, 66)'}>
                        High
                    </Typography>
                </Box>
            </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}