import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { StyledTableWrapper } from 'plugins/contact/pages/Contact/Contacts'
import Table from 'components/Table'
import useSharedAccess from './useSharedAccess'
import { StyledSectionWrapper } from 'pages/Home/homeStyle.css'

const SharedAccess = () => {
  const { columns, data, fetch_data_loading } = useSharedAccess()
  return (
    <StyledSectionWrapper>
      <ComponentsWrapper noPadding>
        <StyledTableWrapper>
          <Table columns={columns} data={data} isLoading={fetch_data_loading} />
        </StyledTableWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default SharedAccess
