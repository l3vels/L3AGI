/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface BulletListOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const BulletListOutline: React.FC<BulletListOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <path d="M16.1798 10.8636H32M16.1798 19.4996H31.9992M16.1798 28.1356H31.9992M11.4831 10.8636C11.4831 11.3405 11.1511 11.7272 10.7416 11.7272C10.332 11.7272 10 11.3405 10 10.8636C10 10.3866 10.332 10 10.7416 10C11.1511 10 11.4831 10.3866 11.4831 10.8636ZM11.4831 19.4996C11.4831 19.9765 11.1511 20.3632 10.7416 20.3632C10.332 20.3632 10 19.9765 10 19.4996C10 19.0226 10.332 18.636 10.7416 18.636C11.1511 18.636 11.4831 19.0226 11.4831 19.4996ZM11.4831 28.1364C11.4831 28.6134 11.1511 29 10.7416 29C10.332 29 10 28.6134 10 28.1364C10 27.6594 10.332 27.2728 10.7416 27.2728C11.1511 27.2728 11.4831 27.6594 11.4831 28.1364Z"
      stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
BulletListOutline.displayName = 'BulletListOutline';
export default BulletListOutline;
/* tslint:enable */
/* eslint-enable */
