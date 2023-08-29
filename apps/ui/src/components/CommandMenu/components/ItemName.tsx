import { StyledCommandItemName } from '../CommandMenuStyles'

type CommandItemNameProps = {
  index: number
  children: any
}

const CommandItemName = ({ index, children }: CommandItemNameProps) => {
  return (
    <StyledCommandItemName>
      {children}
      <div style={{ display: 'none' }}>{index}</div>
    </StyledCommandItemName>
  )
}

export default CommandItemName
