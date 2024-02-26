import withRenderModal from 'hocs/withRenderModal'

import Modal from 'share-ui/components/Modal/Modal'
import { useModal } from 'hooks'
import styled from 'styled-components'

import { StyledModalBody } from './IntegrationListModal'
import { StyledSectionTitle, StyledSectionWrapper } from 'pages/Home/homeStyle.css'
import { ButtonTertiary } from 'components/Button/Button'

import AudioPlayer from 'components/AudioPlayer'

import Table from 'components/Table/Table'
import { useState } from 'react'
import { t } from 'i18next'
import { StyledTableButtons } from 'plugins/contact/pages/Group/Groups'
import { useVoiceOptionsService } from 'plugins/contact/services/voice/useVoiceOptionsService'
import { useAgentForm } from 'pages/Agents/AgentForm/useAgentForm'
import TextField from 'share-ui/components/TextField/TextField'

type VoiceOptionsModalProps = {
  data: {
    formik: any
  }
}

const VoiceOptionsModal = ({ data }: VoiceOptionsModalProps) => {
  const [searchText, setSearchText] = useState('')

  const [page, setPage] = useState(1)
  const { data: voiceOptions, loading: optionsLoading } = useVoiceOptionsService({
    itemsCount: 20,
    page,
  })

  const { voiceSynthesizerOptions } = useAgentForm({})

  const { closeModal } = useModal()

  const { formik } = data

  const { values } = formik

  const { agent_voice_synthesizer } = values

  const column = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Sample',
      accessor: 'sample',
      Cell: ({ cell }: any) => {
        return <>{cell.value ? <AudioPlayer audioUrl={cell.value} /> : <span>-</span>}</>
      },
      minWidth: 80,
      width: 80,
    },
    {
      Header: 'Language',
      accessor: 'language',
      minWidth: 60,
      width: 60,
    },
    {
      Header: 'Gender',
      accessor: 'gender',
      minWidth: 60,
      width: 60,
    },
    {
      Header: 'Actions',
      accessor: 'id',
      minWidth: 60,
      width: 60,
      Cell: ({ cell }: any) => {
        return (
          <StyledTableButtons>
            <ButtonTertiary
              onClick={() => {
                formik.setFieldValue('agent_voice_id', cell.value)
                closeModal('voice-options-modal')
              }}
              size={'small'}
            >
              {t('add')}
            </ButtonTertiary>
          </StyledTableButtons>
        )
      },
    },
  ]

  const pickedSynthesizer = voiceSynthesizerOptions?.find(
    (option: any) => option.value === agent_voice_synthesizer,
  )?.label

  let pickedVoiceOptions: any = []
  if (pickedSynthesizer === 'Play.HT')
    pickedVoiceOptions = voiceOptions['playHtVoices']?.map((item: any) => {
      return {
        name: item.name,
        sample: item.sample,
        language: item.language_code,
        id: item.id,
        gender: item.gender,
      }
    })

  if (pickedSynthesizer === 'ElevenLabs')
    pickedVoiceOptions = voiceOptions['elevenLabsVoices']?.voices?.map((item: any) => {
      return {
        name: item.name,
        sample: item.preview_url,
        language: item.language,
        id: item.voice_id,
        gender: item.gender,
      }
    })

  if (pickedSynthesizer === 'Azure')
    pickedVoiceOptions = voiceOptions['azureVoices']?.map((item: any) => {
      return {
        name: item.DisplayName,
        sample: '',
        language: item.language_code || '-',
        id: item.ShortName,
        gender: item.Gender,
      }
    })

  const filteredData = pickedVoiceOptions?.filter((row: { name: string; phone: string }) => {
    const includesSearchText = row.name.toLowerCase().includes(searchText.toLowerCase())

    return includesSearchText
  })

  return (
    <>
      <Modal onClose={() => closeModal('voice-options-modal')} show backgroundColor='light'>
        <StyledModalBody>
          <StyledSectionWrapper>
            {/* <StyledHeader>
              <StyledSectionTitle>Pick Voice</StyledSectionTitle>
            </StyledHeader> */}

            <StyledTableWrapper>
              <TextField
                placeholder='Search contact'
                value={searchText}
                onChange={(value: string) => setSearchText(value || '')}
              />

              <Table
                columns={column}
                data={filteredData || []}
                // setPage={setPage}
                // page={page}
                // totalPages={10}
                isLoading={optionsLoading}
              />
            </StyledTableWrapper>
          </StyledSectionWrapper>
        </StyledModalBody>
      </Modal>
    </>
  )
}

export default withRenderModal('voice-options-modal')(VoiceOptionsModal)

const StyledHeader = styled.div`
  display: flex;
  align-items: center;

  height: 50px;
  padding: 0 20px;
`
const StyledTableWrapper = styled.div`
  padding: 10px;
  width: 100%;
  height: calc(100% - 80px);

  margin-top: 30px;
`
