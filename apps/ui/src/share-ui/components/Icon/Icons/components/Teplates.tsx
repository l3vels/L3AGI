/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface TeplatesProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Teplates: React.FC<TeplatesProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <path d="M8 29.4153C8 30.4226 8.62929 30.9802 9.55952 30.9802C9.90218 30.9802 10.2373 30.8801 10.6367 30.6608L15.3287 28.1208V8.26625C15.0713 8.36961 14.7758 8.50578 14.4699 8.6757L9.14937 11.7134C8.36398 12.1466 8 12.7702 8 13.6503V29.4153ZM17.0417 27.818L22.6611 30.9636C22.9255 31.1058 23.1615 31.2216 23.4448 31.2833V11.8545L17.9616 8.54116C17.6359 8.34476 17.3192 8.20039 17.0417 8.13031V27.818ZM25.1483 31.227C25.2781 31.1876 25.4239 31.1344 25.5526 31.0536L31.5041 27.6882C32.3148 27.2403 32.6766 26.6208 32.6766 25.7344V10.04C32.6766 8.99773 32.041 8.47086 31.0559 8.47086C30.6943 8.47086 30.3212 8.58148 29.9091 8.80719L25.1483 11.4505V31.227Z"
      fill="#fff" />
  </svg>
);
Teplates.displayName = 'Teplates';
export default Teplates;
/* tslint:enable */
/* eslint-enable */
