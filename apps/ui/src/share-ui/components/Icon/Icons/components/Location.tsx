/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface LocationProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Location: React.FC<LocationProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_761_16782)" stroke="#fff">
      <path d="M19.75 14.4C19.75 16.1673 18.2949 17.6 16.5 17.6C14.7051 17.6 13.25 16.1673 13.25 14.4C13.25 12.6327 14.7051 11.2 16.5 11.2C18.2949 11.2 19.75 12.6327 19.75 14.4Z"
      />
      <path d="M23 14.4C23 17.9346 18.125 24 16.5 24C14.875 24 10 17.9346 10 14.4C10 10.8654 12.9101 8 16.5 8C20.0899 8 23 10.8654 23 14.4Z" />
    </g>
    <defs>
      <filter id="filter0_bd_761_16782" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_761_16782" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_761_16782" result="effect2_dropShadow_761_16782" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_761_16782" result="shape" />
      </filter>
    </defs>
  </svg>
);
Location.displayName = 'Location';
export default Location;
/* tslint:enable */
/* eslint-enable */
