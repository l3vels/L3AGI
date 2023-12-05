/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface DoneProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Done: React.FC<DoneProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <path d="M23 11L13.9937 20.7233C13.652 21.0922 13.098 21.0922 12.7563 20.7233L9 16.668" stroke="#fff" strokeLinecap="round" />
  </svg>
);
Done.displayName = 'Done';
export default Done;
/* tslint:enable */
/* eslint-enable */
