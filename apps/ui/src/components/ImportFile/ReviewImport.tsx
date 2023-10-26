import React from 'react'
// import { CustomTable } from 'oldComponents/atoms/CustomTable'
import useReviewImport from './useReviewImport'
import { FormikProvider } from 'formik'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'

import styled from 'styled-components'

import Button from '@l3-lib/ui-core/dist/Button'

import Table from 'components/Table'

// import DataGrid from 'components/DataGrid'

const SelectHeader = ({ options, item, index }: any) =>
  React.useMemo(
    () => <Dropdown options={options} name={item} placeholder={item} label={item} key={index} />,
    [options],
  )

const ReviewImport = ({ data, setStep: startOver }: { data: any[]; setStep: any }) => {
  const itemLength = 11

  const { formik, keys, options, step, response, setStep, handleDownloadTemplate } =
    useReviewImport(data)

  const columns = [
    { Header: 'System', accessor: 'system' },
    { Header: 'User', accessor: 'user' },
    { Header: 'Assistant', accessor: 'assistant' },
  ]
  const renderTable = React.useMemo(
    () => (
      <>
        {/* <DataGrid
        data={data.map((item, index) => ({ ...item, id: index + 1 })) || []}
        columnConfig={config} /> */}
        <Table columns={columns} data={data} />
      </>
    ),
    [data],
  )
  console.log('data', data)

  return (
    <>
      {!response ? (
        <>
          <StyledContentWrapper>
            <FormikProvider value={formik}>
              <StyledButtonContainer>
                <Button onClick={handleDownloadTemplate}>Download template</Button>
                <Button onClick={formik.handleSubmit}>Save</Button>
                <Button onClick={() => startOver(0)}>Start over</Button>
              </StyledButtonContainer>
              {/* <StyledHeaderContainer itemLength={itemLength}>
                {keys.map((item: any, index: number) => (
                  <SelectHeader options={options} index={index} item={item} key={index} />
                ))}
              </StyledHeaderContainer> */}
              <StyledTableWrapper>{renderTable}</StyledTableWrapper>
            </FormikProvider>
          </StyledContentWrapper>
        </>
      ) : (
        <>
          <StyledButtonContainer>
            <Button onClick={() => setStep(0)} disabled={step === 0}>
              Imported
            </Button>
            <Button onClick={() => setStep(1)} disabled={step === 1}>
              Not imported
            </Button>
            <Button onClick={() => window.open(response.error_record_download_url, '_blank')}>
              Download error record
            </Button>
            <Button onClick={() => startOver(0)}>Start over</Button>
          </StyledButtonContainer>
          <StyledButtonContainer>
            <div>Total imported: {response.total_imported}</div>
            <div>Total not imported: {response?.not_imported.length}</div>
          </StyledButtonContainer>
          <StyledContentWrapper>
            <StyledTableWrapper>
              {/* <DataGrid
                data={step === 0 ? response?.assets ?? [] : response?.not_imported ?? []}
                columnConfig={step === 0 ? importedConfig : notImportedConfig}
              /> */}
            </StyledTableWrapper>
          </StyledContentWrapper>
        </>
      )}
    </>
  )
}

export default ReviewImport

const StyledTableWrapper = styled.div`
  height: 100%;
  width: 100%;
`

const StyledHeaderWrapper = styled.div`
  width: 100%;
  position: sticky;
  padding: 20px 0;
  top: -20px;
`
const StyledHeaderContainer = styled.div<{ itemLength?: number }>`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-template-columns: ${p => p.itemLength && `repeat(${p.itemLength}, 150px)`};
  grid-column-gap: 16px;
  width: 100%;
  margin-right: 50px;

  background: red;
`
const StyledContentWrapper = styled.div`
  width: 100%;
  overflow: auto;
  padding: 10px 20px;
  margin-bottom: 10px;
  margin-top: 20px;
  /* height: 500px; */

  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const StyledButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`
