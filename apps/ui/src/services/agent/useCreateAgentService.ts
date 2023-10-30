import { useMutation } from '@apollo/client'

import createAgentGql from '../../gql/ai/agent/createAgent.gql'

type FieldInput = {
    key: string,
    label: string
    type: string,
    value: string,
    is_required: boolean
    is_secret: boolean
}

export type IntegrationInput = {
    value: string
    label: string
    fields: FieldInput[]
}

export type AgentInput = {
    name: string
    role: string
    greeting: string
    description: string
    is_template: boolean
    temperature: number
    goals: string[]
    constraints: string[]
    tools: string[]
    datasources: string[]
    instructions: string[]
    model: string
    is_memory: boolean
    suggestions: string[]
    text: string
    avatar: string
    integrations: IntegrationInput[];
}

export const useCreateAgentService = () => {
    const [mutation] = useMutation(createAgentGql)

    const createAgentService = async (input: AgentInput) => {
        const {
            name,
            role,
            description,
            is_template,
            temperature,
            goals,
            constraints,
            tools,
            datasources,
            instructions,
            model,
            is_memory,
            suggestions,
            greeting,
            text,
            avatar,
            integrations,
        } = input

        const {
            data: { createAgent },
        } = await mutation({
            variables: {
                input: {
                    agent: {
                        name: name,
                        description: description,
                        role: role,
                        is_template: is_template,
                        is_memory: is_memory,
                        avatar: avatar,
                    },
                    configs: {
                        goals: goals,
                        constraints: constraints,
                        tools: tools,
                        datasources: datasources,
                        model,
                        temperature: temperature,
                        instructions: instructions,
                        suggestions: suggestions,
                        greeting: greeting,
                        text: text,
                        integrations: integrations,
                    },
                },
            },
        })

        return createAgent
    }

    return [createAgentService]
}
