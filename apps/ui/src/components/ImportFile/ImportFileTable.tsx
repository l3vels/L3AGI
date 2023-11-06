import React from 'react'

import styled from 'styled-components'

import Table from 'components/Table'

const ImportFileTable = ({ data }: { data: any[] }) => {
  const columns = [
    {
      Header: 'System',
      accessor: 'System',
      minWidth: 75,
    },
    {
      Header: 'User',
      accessor: 'User',
      minWidth: 75,
    },
    {
      Header: 'Assistant',
      accessor: 'Assistant',
      minWidth: 75,
    },
  ]
  const renderTable = React.useMemo(
    () => (
      <>
        <Table columns={columns} data={data} />
      </>
    ),
    [data],
  )

  return (
    <>
      <StyledContentWrapper>
        <StyledTableWrapper>{renderTable}</StyledTableWrapper>
      </StyledContentWrapper>
    </>
  )
}

export default ImportFileTable

const StyledTableWrapper = styled.div`
  height: 100%;
  width: 100%;
`

const StyledContentWrapper = styled.div`
  width: 100%;
  overflow: auto;

  display: flex;
  flex-direction: column;
  gap: 10px;
`
