/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface DuplicateProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Duplicate: React.FC<DuplicateProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <path d="M18.5 18.4995H20.5C21.0523 18.4995 21.5 18.0518 21.5 17.4995V11.4995C21.5 10.9472 21.0523 10.4995 20.5 10.4995H14.5C13.9477 10.4995 13.5 10.9472 13.5 11.4995V13.4995"
      stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.5 13.4996H11.5C10.9477 13.4996 10.5 13.9473 10.5 14.4996V20.4996C10.5 21.0519 10.9477 21.4996 11.5 21.4996H17.5C18.0523 21.4996 18.5 21.0519 18.5 20.4996V14.4996C18.5 13.9473 18.0523 13.4996 17.5 13.4996Z"
      stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
Duplicate.displayName = 'Duplicate';
export default Duplicate;
/* tslint:enable */
/* eslint-enable */
