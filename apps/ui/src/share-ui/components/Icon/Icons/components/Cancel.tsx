/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface CancelProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Cancel: React.FC<CancelProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_718_13607)">
      <path d="M28.5081 28.5083C23.8536 33.1615 16.1517 33.1668 11.4904 28.5068C6.8373 23.855 6.8358 16.1485 11.4904 11.4953C16.1517 6.83529 23.8468 6.83677 28.4999 11.4885C33.1612 16.1485 33.1694 23.8483 28.5081 28.5083ZM17.5925 15.9761C17.1183 15.502 16.4452 15.5049 15.968 15.982C15.4975 16.4524 15.508 17.1118 15.9823 17.5859L18.3899 19.9929L15.9741 22.408C15.5081 22.8738 15.4989 23.5483 15.968 24.0172C16.4452 24.4943 17.1183 24.4972 17.5911 24.0245L20.0069 21.6094L22.4227 24.0245C22.8902 24.4919 23.5565 24.5092 24.027 24.0389C24.5043 23.5618 24.5005 22.8821 24.0329 22.4147L21.6171 19.9996L24.0262 17.5912C24.499 17.1185 24.5043 16.4374 24.0271 15.9603C23.558 15.4914 22.882 15.502 22.4092 15.9746L20.0001 18.383L17.5925 15.9761Z"
        fill="#fff" fillRule="evenodd" clipRule="evenodd" />
    </g>
    <defs>
      <filter id="filter0_bd_718_13607" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_718_13607" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_718_13607" result="effect2_dropShadow_718_13607" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_718_13607" result="shape" />
      </filter>
    </defs>
  </svg>
);
Cancel.displayName = 'Cancel';
export default Cancel;
/* tslint:enable */
/* eslint-enable */
