import { useParams } from 'react-router-dom'
import { useTeamOfAgentsByIdService } from 'services/team/useTeamOfAgentsByIdService'

const TeamOfAgentView = () => {
  const { teamId } = useParams()
  const { data } = useTeamOfAgentsByIdService({ id: teamId })

  if (!data) return <div />

  const { name, description, team_type } = data

  return (
    <div>
      <h1>Name: {name}</h1>
      <p>Type: {team_type}</p>
      <p>Description: {description}</p>
    </div>
  )
}

export default TeamOfAgentView
