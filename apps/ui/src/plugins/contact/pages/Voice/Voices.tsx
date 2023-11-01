import { useVoicesService } from 'plugins/contact/services/voice/useVoicesService'

const Voices = () => {
  const { data: voicesData } = useVoicesService()
  console.log('voicesData', voicesData)

  return <div>voices</div>
}

export default Voices
