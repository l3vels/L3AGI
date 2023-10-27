import { useModelsService } from 'services'

export const useFineTuningForm = () => {
  const { data: models } = useModelsService()

  const modelOptions = models?.map(({ id, name, provider }) => ({
    value: id,
    label: `${name} (${provider})`,
  }))

  return {
    modelOptions,
  }
}
