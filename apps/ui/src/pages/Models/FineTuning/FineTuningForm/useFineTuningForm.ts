import { useModelsService } from 'services'

export const useFineTuningForm = () => {
  const { data: models } = useModelsService()

  const modelOptions = models
    ?.filter((model: any) => model.fine_tuning === true)
    ?.map(({ id, name, provider }) => ({
      value: id,
      label: `${name} (${provider})`,
    }))

  return {
    modelOptions,
  }
}
