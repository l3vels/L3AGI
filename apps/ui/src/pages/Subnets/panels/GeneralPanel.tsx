import ApiCard from '../ApiCard'
import { StyledCardsWrapper } from '../SubnetsStyles'

const GeneralPanel = ({ activeSubnet }: { activeSubnet: any }) => {
  return (
    <StyledCardsWrapper>
      {activeSubnet?.apis.map((api: any, index: number) => {
        return (
          <ApiCard
            key={index}
            name={api.name}
            description={api.description}
            avatar={api.logo}
            icon={api.icon}
          />
        )
      })}
    </StyledCardsWrapper>
  )
}

export default GeneralPanel
