import styled from 'styled-components'
import withRenderModal from 'hocs/withRenderModal'
import Modal from 'share-ui/components/Modal/Modal'
import { useModal } from 'hooks'
import IconButton from 'share-ui/components/IconButton/IconButton'

import Close from 'share-ui/components/Icon/Icons/components/Close'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'
import useChangeTemplate from './useChangeTemplate'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { CardActionArea } from '@mui/material'
import { ChangeTemplateModalProps, Template, TemplateCardProps } from 'types/template'
import Loader from 'share-ui/components/Loader/Loader'


const TemplateCard = ({ template, handleSelectTemplate }: TemplateCardProps) => {
    return (
        <Card
            sx={{
                width: '100%',
                border: 'none',
                boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
                background: '#d3d3d3',
                borderRadius: '10px',
                borderLeft: '5px solid black'
            }}
            >
                <CardActionArea
                    sx={{
                    boxShadow: 'none',
                    borderRadius: '10px',
                    }}
                >
                    <CardContent
                        sx={{
                            border: 'none',
                        }}
                    >
                        <Box display={'flex'} onClick={() => handleSelectTemplate(template)}>
                            <img src="https://cdn.worldvectorlogo.com/logos/elastic-cloud.svg" alt="" width={70} />
                            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                                <Typography fontSize={15} fontWeight={600}>
                                    {template.name}
                                </Typography>
                                <Typography fontSize={13}>
                                    {template.container_image}
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>

                </CardActionArea>
        </Card>
    )
}


const ChangeTemplateModal = ({ data: { handleSelectTemplate } }: ChangeTemplateModalProps ) => {
    const { closeModal } = useModal()
    const { templates, searchText, setSearchText, templates_loading } = useChangeTemplate()

    return (
        <StyledModal
            onClose={() => closeModal('change-pod-template-modal')}
            show
            backgroundColor='light'
            hideCloseButton
            >
            <StyledModalBody>
               <Box display={'flex'} flexDirection={'column'} position={'relative'}>
                    <Typography fontSize={24}>
                        Templates
                    </Typography>

                    <TextField 
                        id="filled-basic" 
                        label="Find something to deploy..." 
                        variant="standard" 
                        size='small'
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
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

                    {templates_loading && 
                        <Box position={'absolute'} sx={{ marginTop: '15%', marginLeft: '47%' }}>
                            <Loader size={40} />
                        </Box>
                    }

                    {templates && templates.length > 0 ? 
                        <Box mt={5} display={'flex'} flexDirection={'column'}>
                            <Box display={'flex'} flexDirection={'column'}>
                                <Typography fontSize={15}>
                                    Your Pod Templates
                                </Typography>

                                <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={2} mt={2}>
                                    {templates.map((template: Template, index: number) => (
                                        <TemplateCard key={index} template={template} handleSelectTemplate={handleSelectTemplate} />
                                    ))}
                                </Box>
                            </Box>

                        </Box>
                        :
                        <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} mt={8}>
                           <Typography fontSize={25} fontWeight={700}>
                                No results found
                            </Typography>
                           <Typography fontSize={13} mt={2}>
                                Try searching for something else, or create your own template.
                            </Typography>

                        </Box>
                    }

               </Box>
            </StyledModalBody>

            <StyledButtonWrapper>
                <IconButton
                size={IconButton.sizes?.XS}
                icon={() => <Close />}
                kind={IconButton.kinds?.TERTIARY}
                onClick={() => closeModal('change-pod-template-modal')}
                />
            </StyledButtonWrapper>
        </StyledModal>
    )
}

export default withRenderModal('change-pod-template-modal')(ChangeTemplateModal)

const StyledModal = styled(Modal)`
  .components-Modal-Modal-module__overlay--OO00T {
    backdrop-filter: unset;
  }

  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  color: ${({ theme }) => theme.body.textColorPrimary} !important;
  min-width: 970px;
  min-height: 330px;
  max-height: 90vh;
`

const StyledModalBody = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 32px;
`
export const StyledButtonWrapper = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
`

const StyledButton = styled(Button)`
  width: 100%;
  font-weight: 500;
  .css-1e6y48t-MuiButtonBase-root-MuiButton-root {
      color: black;
  }
`