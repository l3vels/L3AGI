import { ButtonTertiary } from 'components/Button/Button'
import Table from 'components/Table'
import { useModal } from 'hooks'
import { t } from 'i18next'
import { CallContext } from 'plugins/contact/contexts'
import { useContacts } from 'plugins/contact/pages/Contact/useContacts'
import { StyledTableButtons } from 'plugins/contact/pages/Group/Groups'
import { CreateCallInput } from 'plugins/contact/services/call/useCreateCallService'
import { useContext, useMemo, useState } from 'react'
import TextField from 'share-ui/components/TextField/TextField'

const ContactListTable = ({ callType }: { callType: CreateCallInput['type'] }) => {
  const { setCallIds } = useContext(CallContext)
  const { contacts, handleCall } = useContacts()
  const [searchText, setSearchText] = useState('')
  const { closeModal } = useModal()

  const urlParams = new URLSearchParams(location.search)

  const agentId = urlParams.get('agent') || ''

  const gridData =
    contacts?.map((contact: any) => ({
      phone: contact.phone,
      id: contact.id,
      name: contact.name,
    })) || []

  const filteredData = gridData?.filter((row: { name: string; phone: string }) => {
    const includesSearchText =
      row.name.toLowerCase().includes(searchText.toLowerCase()) ||
      row.phone.toLowerCase().includes(searchText.toLowerCase())

    return includesSearchText
  })

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },

      {
        Header: 'Actions',
        accessor: 'id',
        minWidth: 50,
        width: 50,
        Cell: ({ cell }: any) => {
          return (
            <StyledTableButtons>
              <ButtonTertiary
                onClick={() => {
                  // handleCall({ agent_id: agentId, contact_id: cell.value, type: 'browser' })
                  if (callType === 'browser') {
                    setCallIds({ agentId: agentId, contactId: cell.value })
                  } else if (callType === 'outbound') {
                    handleCall({ agent_id: agentId, contact_id: cell.value, type: callType })
                  }
                  closeModal('contact-list-modal')
                }}
                size={'small'}
              >
                {t('call')}
              </ButtonTertiary>
            </StyledTableButtons>
          )
        },
      },
    ],
    [],
  )

  return (
    <>
      <TextField
        placeholder='Search contact'
        value={searchText}
        onChange={(value: string) => setSearchText(value || '')}
      />
      <Table columns={columns} data={filteredData} />
    </>
  )
}

export default ContactListTable
