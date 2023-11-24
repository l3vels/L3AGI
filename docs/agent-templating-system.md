# Agent Templating System

You can reference another agent's data in agent form using template syntax

## Syntax

Syntax is following:
`{{agents.name.field}}`

## Reference agent by name

```
# References "My Agent"
{{agents.my agent.system_message}} # References whole system message
{{agents.my agent.name}}
{{agents.my agent.role}}
{{agents.my agent.description}}
{{agents.my agent.goals}}
{{agents.my agent.instructions}}
{{agents.my agent.constraints}}
{{agents.my agent.greeting}}
{{agents.my agent.text}} # Base system message
{{agents.my agent.goals[0]}} # References first goal
```

## Reference current agent

```
{{name}}
{{role}}
{{description}}
{{goals}}
{{instructions}}
{{constraints}}
{{greeting}}
{{text}} # Base system message
{{goals[0]}} # References first goal
```

## Reference inside/outside tools
```
{{tools.cal.calendarAvailabilities}}
         │          │
         │          │    ╭───────────╮
         │          ╰──▶ │ Tool Slug │
         ▼               ╰───────────╯
  ╭──────────────╮
  │ Toolkit Slug │
  ╰──────────────╯
```
