## Creating Teams of Agents

Teams of agents allow for collaboration among different AI agents, each potentially tailored for specific tasks or roles. This document provides a guide on how to create and manage teams of agents and interact with them.

### What is a Team Of Agents?

A team of agents consists of multiple agents that can work together. Each agent can have a specific role within the team, such as Planner, Executor, or Speaker. Teams can be public or private, active or inactive. They also come with various configuration fields to further customize the behavior and interactions.

### Types of Teams

There are different types of teams tailored to different collaborative scenarios:

1. **Plan and Execute**:
    - **Description**: This team is primarily designed to have agents that plan a task and agents that execute the given plan.
    - **Roles**: Planner, Executor.

2. **Authoritarian Speaker**:
    - **Description**: In this team, there's a directorial agent that determines the flow of the conversation, and several speaker agents that convey information based on the director's cues.
    - **Roles**: Director, Speaker.
    - **Fields**:
        - **Word limit**: Maximum number of words an agent can use in a single response.
        - **Stopping Probability**: Likelihood of the agent concluding its statement.
    - **Reference**: [LangChain Multi-agent authoritarian speaker selection](https://python.langchain.com/docs/use_cases/more/agents/agent_simulations/multiagent_authoritarian)

3. **Debates**:
    - **Description**: Simulates multi-agent dialogues where agents engage in debate or discussions.
    - **Roles**: Debater.
    - **Fields**:
        - **Word limit**: Maximum number of words an agent can use in a single response.
    - **Reference**: [LangChain Agent Debates with Tools](https://python.langchain.com/docs/use_cases/more/agents/agent_simulations/two_agent_debate_tools)

4. **Decentralized Speaker**:
    - **Description**: This is a scenario where no specific agent has control, but each agent contributes to the conversation based on its expertise or role.
    - **Roles**: Varies based on configuration.


### Creating a Team Of Agents

Follow these steps to create a team of agents:

1. Choose the desired team type based on the collaborative scenario.
2. Provide a name and description for the team.
3. Select the agents you want to include in the team and assign them roles.
4. Configure any additional fields specific to the team type.
5. Set visibility settings (public or private).
6. Activate or deactivate the team based on your requirement.

### Chatting with a Team Of Agents

When you initiate a conversation with a team of agents:

1. Direct your query or statement to the team.
2. The team processes the input based on the roles and configuration.
3. You might receive responses from multiple agents within the team, each catering to its specific role.
4. Continue the conversation, directing specific questions to roles if needed.

For instance, in a 'Plan and Execute' team, you might first receive a response from the Planner about how to approach a problem, followed by the Executor guiding on implementing the plan.

### Conclusion

Teams of agents offer an enhanced collaborative AI experience, enabling users to harness the power of multiple specialized agents in one interaction. Whether you're looking for a multi-faceted discussion, a planned approach, or authoritative speaking, teams of agents provide the flexibility and depth to cater to diverse requirements.