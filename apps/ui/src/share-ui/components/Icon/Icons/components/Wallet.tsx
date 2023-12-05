/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface WalletProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Wallet: React.FC<WalletProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <path d="M26.8146 22.8515C25.3307 22.8515 24.1168 21.5684 24.1168 20C24.1168 18.4316 25.3307 17.1485 26.8146 17.1485H31.9996V12.6844C31.9996 11.7543 31.2863 11 30.4061 11H9.5935C8.71366 11 8 11.7539 8 12.6844V27.3156C8 28.2457 8.71324 29 9.5935 29H30.4065C31.2863 29 32 28.2461 32 27.3156V22.8515H26.8146Z"
      fill="#fff" />
    <path d="M27.1698 18.6179C26.4507 18.6179 25.8623 19.2399 25.8623 20C25.8623 20.7601 26.4507 21.3821 27.1698 21.3821H31.9993V18.6179H27.1698ZM27.0838 20.5604C26.8101 20.5604 26.5882 20.3259 26.5882 20.0366C26.5882 19.7472 26.8101 19.5127 27.0838 19.5127C27.3575 19.5127 27.5794 19.7472 27.5794 20.0366C27.5794 20.3259 27.3575 20.5604 27.0838 20.5604Z"
      fill="#fff" />
  </svg>
);
Wallet.displayName = 'Wallet';
export default Wallet;
/* tslint:enable */
/* eslint-enable */
