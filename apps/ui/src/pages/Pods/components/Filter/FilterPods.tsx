import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
// import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
// import IconButton from '@mui/material/IconButton'
// import Fingerprint from '@mui/icons-material/Fingerprint'
import { black, white } from '../../styles'
// eslint-disable-next-line import/no-named-as-default
import Cloud from 'share-ui/components/Icon/Icons/components/Cloud'
import FineTuning from 'share-ui/components/Icon/Icons/components/FineTuning'
import Globe from 'share-ui/components/Icon/Icons/components/Globe'
import { DropDownMenu, DropDownItem } from 'components/DropDownMenu/DropDownMenu'
import useFilter from './useFilter'
import React from 'react'

const sliderMarks = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 8, label: '8' },
  { value: 10, label: '10' },
]

const buttonStyles = {
  color: black,
  textTransform: 'capitalize',
  fontSize: '0.8125rem',
  fontWeight: 'bold',
}

const FilterPods = () => {
  const { filter, setFilter, regions, cudaVersions } = useFilter()
  const [hideMenu, setHideMenu] = React.useState(false)
  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Box display={'flex'} alignItems={'center'}>
        <ToggleButtonGroup
          color='primary'
          value={''}
          exclusive
          onChange={() => {}}
          aria-label='Platform'
        >
          <ToggleButton
            value='gpu'
            size='small'
            sx={{
              background: black,
              // border: '1px solid rgba(0, 0, 0, 0.12)',
              borderTopLeftRadius: '10px',
              borderBottomLeftRadius: '10px',
              fontWeight: 600,
              color: white,
              '&:hover': {
                backgroundColor: black,
              },
            }}
          >
            GPU
          </ToggleButton>

          <ToggleButton
            value='cpu'
            size='small'
            sx={{
              color: black,
              background: 'transparent',
              border: '1px solid rgba(0, 0, 0, 0.12)',
              borderTopRightRadius: '10px',
              borderBottomRightRadius: '10px',
              fontWeight: 600,
              '&:hover': {
                background: black,
                color: white,
              },
            }}
          >
            CPU
          </ToggleButton>
        </ToggleButtonGroup>

        <Box ml={2} display={'flex'} alignItems={'center'}>

          <DropDownMenu
            buttonContent={() => (
              <Box display={'flex'} alignItems={'center'}>
                <Cloud size={20} /> 
                <Typography ml={1} sx={buttonStyles}>
                  {filter.cloud}
                </Typography>
              </Box>
            )}
          >
            <DropDownItem handleSelect={() => setFilter({ ...filter, cloud: 'Secure Cloud' })}>Secure Cloud</DropDownItem>
            <DropDownItem handleSelect={() => setFilter({ ...filter, cloud: 'Community Cloud' })}>Community Cloud</DropDownItem>
          </DropDownMenu>

          <Button color='primary' size='small' sx={buttonStyles}>
             <Box display={'flex'} alignItems={'center'}>
               <FineTuning size={30} />
              <Typography ml={0.5} sx={buttonStyles}>
                Network Volume
              </Typography>
            </Box>
          </Button>

          <DropDownMenu
            buttonContent={() => (
              <Box display={'flex'} alignItems={'center'}>
                <Globe size={20} />
                <Typography ml={0.5} sx={buttonStyles}>
                  {filter.region}
                </Typography>
              </Box>
            )}
          >
            {regions.map((region: string, index: number) => (
              <DropDownItem 
                handleSelect={() => setFilter({ ...filter, region: region })}
                key={index}
              >
                 {region}
              </DropDownItem>
            ))}
          </DropDownMenu>

          <Button color='primary' size='small' sx={buttonStyles} onClick={() => setHideMenu((i) => !i)}>
            Menu
          </Button>
        </Box>
        
      </Box>

        <Box sx={{ height: hideMenu ? '100px' : '0px', transition: '0.3s', overflow: 'hidden' }}>
          <Box mt={2} display={'flex'} alignItems={'center'}>
            <DropDownMenu
              buttonContent={() => (
                <Box display={'flex'} flexDirection={'column'}>
                  <Typography fontSize={10}>
                    CUDA Versions
                  </Typography>
                  <Typography ml={0.5} sx={buttonStyles}>
                    {filter.cudaVersion}
                  </Typography>
                </Box>
              )}
            >
              {cudaVersions.map((cuda: string, index: number) => (
                <DropDownItem 
                  handleSelect={() => setFilter({ ...filter, cudaVersion: cuda })}
                  key={index}
                >
                  {cuda}
                </DropDownItem>
              ))}
            </DropDownMenu>
          </Box>
        </Box>


      <Box
        mt={2}
        p={2}
        display={'flex'}
        flexDirection={'column'}
        sx={{
          width: '100%',
          borderRadius: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        }}
      >
        <Typography color='rgba(34, 51, 84, 0.7)' fontSize={14}>
          Filter GPUs by VRAM
        </Typography>
        <Slider
          aria-label='Custom marks'
          defaultValue={3}
          getAriaValueText={value => `${value}`}
          valueLabelDisplay='auto'
          step={1}
          max={10}
          min={1}
          marks={sliderMarks}
          sx={{ color: black }}
          size='small'
        />
      </Box>
    </Box>
  )
}

export default FilterPods
