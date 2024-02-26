import withRenderModal from 'hocs/withRenderModal'

import Modal from 'share-ui/components/Modal/Modal'
import { useModal } from 'hooks'
import styled from 'styled-components'

import { StyledModalBody } from './IntegrationListModal'
import { StyledSectionWrapper } from 'pages/Home/homeStyle.css'
import { ButtonTertiary } from 'components/Button/Button'

import AudioPlayer from 'components/AudioPlayer'

import Table from 'components/Table/Table'
import { useState } from 'react'
import { t } from 'i18next'
import { StyledTableButtons } from 'plugins/contact/pages/Group/Groups'

import TextField from 'share-ui/components/TextField/TextField'

type VoiceOptionsModalProps = {
  data: {
    formik: any
    voiceList: any
  }
}

const VoiceOptionsModal = ({ data }: VoiceOptionsModalProps) => {
  const [searchText, setSearchText] = useState('')

  const { closeModal } = useModal()

  const { formik, voiceList } = data

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

  const filteredData = voiceList?.filter((row: { name: string; phone: string }) => {
    const includesSearchText = row.name.toLowerCase().includes(searchText.toLowerCase())

    return includesSearchText
  })

  return (
    <>
      <Modal onClose={() => closeModal('voice-options-modal')} show backgroundColor='light'>
        <StyledModalBody>
          <StyledSectionWrapper>
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
                // isLoading={optionsLoading}
              />
            </StyledTableWrapper>
          </StyledSectionWrapper>
        </StyledModalBody>
      </Modal>
    </>
  )
}

export default withRenderModal('voice-options-modal')(VoiceOptionsModal)

const StyledTableWrapper = styled.div`
  padding: 10px;
  width: 100%;
  height: calc(100% - 80px);

  margin-top: 30px;
`
