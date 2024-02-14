import { useGroupsService } from 'plugins/contact/services/group/useGroupsService'
import { useAgentsService } from 'services/agent/useAgentsService'
import { useCampaignsService } from 'plugins/contact/services/campaign/useCampaignsService'
import { useDeleteCampaignByIdService } from 'plugins/contact/services/campaign/useDeleteCampaignService'
import { ToastContext } from 'contexts'
import { useContext } from 'react'
import { useModal } from 'hooks'
import moment from 'moment'

export const useCampaigns = () => {
  const { setToast } = useContext(ToastContext)
  const { openModal, closeModal } = useModal()

  const { deleteCampaignById } = useDeleteCampaignByIdService()

  const { data: campaignsData, refetch: refetchCampaigns } = useCampaignsService()

  const { data: groupsData } = useGroupsService()
  const { data: agentData } = useAgentsService()

  const tableData =
    campaignsData?.map((campaign: any) => {
      const callStatuses = campaign.call_statuses || {}

      return {
        id: campaign.id,
        name: campaign.name,
        agent: agentData?.find(({ agent }) => agent.id === campaign.agent_id)?.agent.name,
        agentId: campaign.agent_id,
        groupId: groupsData?.find(({ id }: { id: string }) => id === campaign.group_id)?.name,
        type: campaign.type,
        status: campaign.status,
        startDate: moment(campaign.start_date).format('MMM DD, YYYY, HH:mm'),
        totalCalls: campaign.total_calls,
        busyCalls: (callStatuses.Busy || 0) + (callStatuses['No Answer'] || 0),
        completedCalls: callStatuses.Completed || 0,
      }
    }) || []

  const deleteCampaignHandler = (id: string) => {
    openModal({
      name: 'delete-confirmation-modal',
      data: {
        deleteItem: async () => {
          try {
            const res = await deleteCampaignById(id)
            await refetchCampaigns()
            closeModal('delete-confirmation-modal')
            setToast({
              message: res.message,
              type: 'positive',
              open: true,
            })
          } catch (e) {
            setToast({
              message: 'Failed to delete Campaign!',
              type: 'negative',
              open: true,
            })
            closeModal('delete-confirmation-modal')
          }
        },
        label: 'Delete Campaign?',
      },
    })
  }

  return {
    tableData,
    deleteCampaignHandler,
  }
}
