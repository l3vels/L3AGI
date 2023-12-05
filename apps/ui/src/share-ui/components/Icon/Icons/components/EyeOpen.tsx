/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface EyeOpenProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const EyeOpen: React.FC<EyeOpenProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <path d="M16 11.4995C11 11.4995 9 16 9 16C9 16 11 20.4995 16 20.4995C21 20.4995 23 16 23 16C23 16 21 11.4995 16 11.4995Z" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"
    />
    <path d="M16 18.5C17.3807 18.5 18.5 17.3807 18.5 16C18.5 14.6193 17.3807 13.5 16 13.5C14.6193 13.5 13.5 14.6193 13.5 16C13.5 17.3807 14.6193 18.5 16 18.5Z" stroke="#fff"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
EyeOpen.displayName = 'EyeOpen';
export default EyeOpen;
/* tslint:enable */
/* eslint-enable */
