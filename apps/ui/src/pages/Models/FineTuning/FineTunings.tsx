import { useMemo } from 'react'

import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { useTranslation } from 'react-i18next'
import {
  StyledHeaderGroup,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'

import { ButtonPrimary } from 'components/Button/Button'

import Button from 'share-ui/components/Button/Button'

import { useNavigate } from 'react-router-dom'

import { useFineTuning } from './useFineTuning'
import { useFineTuningForm } from './FineTuningForm/useFineTuningForm'

import Table from 'components/Table'

import { StyledTableWrapper } from 'plugins/contact/pages/Contact/Contacts'
import TableActionButtons from 'components/Table/components/TableActionButtons'

const FineTunings = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const handleAddFineTuning = () => {
    navigate('/models/create-fine-tuning')
  }

  const { fineTuningData, deleteFineTuningHandler } = useFineTuning()
  const { modelOptions } = useFineTuningForm()

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        width: 500,
      },
      {
        Header: 'Model',
        accessor: 'model',
        width: 370,
      },
      {
        Header: 'Status',
        accessor: 'status',
        width: 100,
      },

      {
        Header: 'Actions',
        accessor: 'id',
        width: 100,
        Cell: ({ cell }: any) => {
          return (
            <TableActionButtons
              onDeleteClick={() => deleteFineTuningHandler(cell.value)}
              onEditClick={() => navigate(`/models/${cell.value}/edit-fine-tuning`)}
            />
          )
        },
      },
    ],
    [],
  )

  const tableData =
    fineTuningData?.map((fineTuning: any) => ({
      id: fineTuning.id,
      name: fineTuning.name,
      status: fineTuning.status,
      model:
        modelOptions?.filter((model: any) => model.value === fineTuning?.model_id).length > 0
          ? modelOptions?.filter((model: any) => model.value === fineTuning?.model_id)?.[0].label
          : '',
    })) || []

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <div>
          <StyledSectionTitle>{`${t('fine-tuning')}`}</StyledSectionTitle>
          {/* <StyledSectionDescription>{t('model-description')}</StyledSectionDescription> */}
        </div>
        <ButtonPrimary size={Button.sizes?.SMALL} onClick={handleAddFineTuning}>
          {t('add-fine-tuning')}
        </ButtonPrimary>
      </StyledHeaderGroup>

      <ComponentsWrapper noPadding>
        <StyledTableWrapper>
          <Table columns={columns} data={tableData} />
        </StyledTableWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default FineTunings
