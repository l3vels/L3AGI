/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface ContrastProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Contrast: React.FC<ContrastProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <path d="M20.4229 9.1543C14.1243 9.1543 9 14.2786 9 20.5771C9 26.8757 14.1243 32 20.4229 32C26.7214 32 31.8457 26.8757 31.8457 20.5771C31.8457 14.2786 26.7214 9.1543 20.4229 9.1543ZM20.4229 29.9693C15.244 29.9693 11.0307 25.756 11.0307 20.5771C11.0307 15.3983 15.244 11.185 20.4229 11.185C25.6017 11.185 29.815 15.3983 29.815 20.5771C29.815 25.756 25.6017 29.9693 20.4229 29.9693Z"
      fill="#fff" />
    <path d="M20.4231 10.1696C14.6751 10.1696 10.0156 14.8292 10.0156 20.5771C10.0156 26.3251 14.6751 30.9846 20.4231 30.9846V10.1696Z" fill="#fff" />
  </svg>
);
Contrast.displayName = 'Contrast';
export default Contrast;
/* tslint:enable */
/* eslint-enable */
