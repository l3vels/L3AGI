/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface SpeacialCheckProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const SpeacialCheck: React.FC<SpeacialCheckProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <path d="M20.0002 38.8891C30.4323 38.8891 38.8891 30.4323 38.8891 20.0002C38.8891 9.56817 30.4323 1.11133 20.0002 1.11133C9.56817 1.11133 1.11133 9.56817 1.11133 20.0002C1.11133 30.4323 9.56817 38.8891 20.0002 38.8891Z"
      fill="#fff" />
    <path d="M20.0004 36.3152C29.0108 36.3152 36.3152 29.0108 36.3152 20.0004C36.3152 10.9899 29.0108 3.68555 20.0004 3.68555C10.9899 3.68555 3.68555 10.9899 3.68555 20.0004C3.68555 29.0108 10.9899 36.3152 20.0004 36.3152Z"
      fill="#000" />
    <path d="M17.9268 25.9725L12.8657 20.9114L14.6875 19.0897L17.9268 22.329L25.3163 14.9395L27.1381 16.7612L17.9268 25.9725Z" fill="#fff" />
  </svg>
);
SpeacialCheck.displayName = 'SpeacialCheck';
export default SpeacialCheck;
/* tslint:enable */
/* eslint-enable */
