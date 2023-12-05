/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface PersonaProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Persona: React.FC<PersonaProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <path d="M16 17.75C18.4162 17.75 20.375 15.7912 20.375 13.375C20.375 10.9588 18.4162 9 16 9C13.5838 9 11.625 10.9588 11.625 13.375C11.625 15.7912 13.5838 17.75 16 17.75ZM16 17.75C12.134 17.75 9 20.1005 9 23M16 17.75C19.866 17.75 23 20.1005 23 23"
      stroke="#fff" strokeLinecap="round" />
  </svg>
);
Persona.displayName = 'Persona';
export default Persona;
/* tslint:enable */
/* eslint-enable */
