import { useMutation } from '@apollo/client'

import createTeamOfAgentsGql from '../../gql/ai/teamOfAgents/createTeamOfAgents.gql'

export type TeamOfAgentsInput = {
  name: string
  description: string
  team_type: string
  team_agents: { role: string; agent_id: string }[]
  is_memory: boolean
  greeting: string
  temperature: number
  goals: string[]
  constraints: string[]
  tools: string[]
  datasources: string[]
  instructions: string[]
  suggestions: string[]
  text: string
  model: string
}

export const useCreateTeamOfAgentsService = () => {
  const [mutation] = useMutation(createTeamOfAgentsGql)

  const createTeamOfAgentsService = async (input: TeamOfAgentsInput) => {
    const {
      name,
      description,
      team_type,
      team_agents,
      is_memory,

      constraints,
      datasources,
      goals,
      greeting,
      instructions,
      suggestions,
      temperature,
      text,
      tools,
      model,
    } = input

    const {
      data: { createTeamOfAgents },
    } = await mutation({
      variables: {
        input: {
          name,
          description,
          team_type,
          team_agents,
          is_memory,
          configs: {
            constraints,
            datasources,
            goals,
            greeting,
            instructions,
            suggestions,
            temperature,
            text,
            tools,
            model,
          },
        },
      },
    })

    return createTeamOfAgents
  }

  return [createTeamOfAgentsService]
}
