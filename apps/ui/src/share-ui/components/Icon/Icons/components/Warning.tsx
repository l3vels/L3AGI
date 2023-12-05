/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface WarningProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Warning: React.FC<WarningProps> = ({size, ...props}) => (
  <svg viewBox="0 0 72 72" fill="currentColor" width={ size || "72" } height={ size || "72" } {...props}>
    <path d="M17.2395 51.2061L35.2616 19.9678C35.5619 19.41 36.3772 19.41 36.7205 19.9678L54.7855 51.2061C55.0859 51.7639 54.6997 52.4505 54.0561 52.4505H17.926C17.2824 52.4505 16.8962 51.7639 17.2395 51.2061Z"
      fill="#fff" />
    <path d="M22.2598 49.1465L35.9909 25.3745L49.722 49.1465H22.2598Z" fill="#000" />
    <path d="M35.9909 43.3963C36.3342 43.3963 36.6345 43.5251 36.892 43.7825C37.1495 44.04 37.2782 44.3404 37.2782 44.6836C37.2782 45.0269 37.1495 45.3273 36.892 45.5847C36.6345 45.8422 36.3342 45.9709 35.9909 45.9709C35.6476 45.9709 35.3043 45.8422 35.0898 45.5847C34.8323 45.3273 34.7036 45.0269 34.7036 44.6836C34.7036 44.3404 34.8323 44.04 35.0898 43.7825C35.3473 43.5251 35.6476 43.3963 35.9909 43.3963ZM35.004 42.2807L34.8323 33.0551H37.1924L36.9778 42.2807H35.004Z"
      fill="#fff" />
  </svg>
);
Warning.displayName = 'Warning';
export default Warning;
/* tslint:enable */
/* eslint-enable */
