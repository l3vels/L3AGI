import styled from 'styled-components'
import { buttonStyles } from './styles'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'


const MainPod = () => {
  const navigate = useNavigate()

    return (
        <StyledContainer>
            <Button 
                onClick={() => navigate('/pods/create-pod')}
                variant="contained"
                sx={{
                    ...buttonStyles,
                    width: '400px',
                    height: '150px'
                }}
                size='small'
            >
                Add new pod
            </Button>
        </StyledContainer>
    )
}

export default MainPod

const StyledContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`