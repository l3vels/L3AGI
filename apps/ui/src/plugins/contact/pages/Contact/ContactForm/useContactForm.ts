import { useGroupsService } from 'services/group/useGroupsService'

export const useContactForm = () => {
  const { data: groups, refetch: refetchGroups } = useGroupsService()

  const groupOptions = groups?.map((group: any) => {
    return { label: group.name, value: group.id }
  })

  return {
    groupOptions,
  }
}
