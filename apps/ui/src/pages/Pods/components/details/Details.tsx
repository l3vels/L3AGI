import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { borderBoxStyles, chipStyles, buttonStyles } from '../../styles'
import styled from 'styled-components';
import Slider from '@mui/material/Slider'
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Resource } from 'types/resource';
import useDetails, { PlanCard } from './useDetails'
import Price from './Price'


interface DetailsProps {
    resource: Resource
}

interface PlanCardItemProps {
    plan: PlanCard
    selectedPlan: PlanCard
    handleSelectPlan: (plan: PlanCard) => void
} 

const sliderMarks = (max_gpu: number) => Array.from({ length: max_gpu }, (_, index) => ({
    value: index,
    label: index
}))

const PlanCardItem = ({ plan, selectedPlan, handleSelectPlan }: PlanCardItemProps) => {
    const is_selected = plan.id === selectedPlan.id
    return (
        <Card 
            sx={{ width: '230px', border: 'none', boxShadow: 'none' }} 
            onClick={() => handleSelectPlan(plan)}
        >
            <CardActionArea sx={{ 
                boxShadow: 'none', 
                borderRadius: '10px',
                background: is_selected ? 'rgba(50, 50, 50, 0.341)' : 'rgba(50, 50, 50, 0.1)',
                border: '1px solid rgba(22, 22, 22, 0.8)',
                height: '160px'
                
            }}>
                <Box p={2}>
                    <Typography fontSize={16}>
                        {plan.title}
                    </Typography>
                    <Typography color="rgba(34, 51, 84, 0.7)" fontSize={12}>
                        {plan.sub_title}
                    </Typography>
                    <Box display={'flex'} alignItems={'center'} mt={1}>
                        <Typography fontSize={18}>
                            ${plan.price.toFixed(2)}/hr
                        </Typography>
                        {plan.total_price &&
                            <Typography fontSize={13} ml={1} color="rgba(34, 51, 84, 0.7)">
                                ${plan.total_price.toFixed(2)}
                            </Typography>
                        }
                    </Box>
                    <Typography color="rgba(34, 51, 84, 0.7)" fontSize={12} mt={1}>
                        {plan.description}
                    </Typography>
                </Box>
            </CardActionArea>
        </Card>
    )
}

const Details = ({ resource }: DetailsProps) => {
    const { 
        formik, 
        plan_cards, 
        selectedPlan, 
        handleSelectPlan, 
        handleOpenChangeTemplateModal,
        selectedTemplate,
        create_pod_loading
    } = useDetails(resource)

    return (
        <>
            <Box 
                sx={{  
                    width: '100%',
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
                        label="Pod Name" 
                        variant="standard" 
                        size='small'
                        onChange={(e) => formik.setFieldValue('pod_name', e.target.value)}
                        value={formik.values.pod_name}
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
                                        {selectedTemplate?.name ?? ''}
                                    </Typography>
                                    <Typography color="rgba(34, 51, 84, 0.7)" fontSize={12}>
                                        {selectedTemplate?.container_image ?? ''}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Button 
                                    variant="contained"
                                    sx={buttonStyles}
                                    size='small'
                                    onClick={handleOpenChangeTemplateModal}
                                >
                                    Change Template
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
                                defaultValue={1}
                                onChange={(e, value) => formik.setFieldValue('max_gpu', value)}
                                value={formik.values.max_gpu}
                                getAriaValueText={(value) => `${value}`}
                                valueLabelDisplay="auto"
                                step={1}
                                max={resource.max_gpu}
                                min={1}
                                marks={sliderMarks(resource.max_gpu + 1)}
                                sx={{ color: '#000000' }}
                            />
                        </Box>

                        <Box mt={2} display={'flex'} flexDirection={'column'}>
                            <Typography color="rgba(34, 51, 84, 0.7)" fontSize={14}>
                                Instance Pricing
                            </Typography>

                            <Box mt={2} display={'flex'}>
                                {plan_cards.map((plan, index) => (
                                    <Box key={index} ml={index > 0 ? 2 : 0}>
                                        <PlanCardItem 
                                            plan={plan} 
                                            selectedPlan={selectedPlan} 
                                            handleSelectPlan={handleSelectPlan} 
                                        />
                                    </Box>
                                ))}
                            </Box>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Encrypt Volume" />
                                <FormControlLabel disabled control={<Checkbox />} label="SSH Terminal Access" />
                                <FormControlLabel  control={<Checkbox />} label="Start Jupyter Notebook" />
                            </FormGroup>
                        </Box>

                    </Box>

                </Box>
            </Box>
            <Price 
                selectedPlan={selectedPlan}
                formik={formik}
                create_pod_loading={create_pod_loading}
                resource={resource}
            />
        </>
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