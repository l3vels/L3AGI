/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface StatusProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Status: React.FC<StatusProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <path d="M15.75 9V12M20.5229 10.977L18.4016 13.0983M22.5 15.7502H19.5M20.523 20.5229L18.4016 18.4016M15.75 19.5V22.5M13.0983 18.4017L10.977 20.523M12 15.7501H9M13.0984 13.0984L10.977 10.9771"
      stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
Status.displayName = 'Status';
export default Status;
/* tslint:enable */
/* eslint-enable */
