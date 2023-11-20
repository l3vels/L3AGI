/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface ArrowLeftProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const ArrowLeft: React.FC<ArrowLeftProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_761_16718)">
      <path d="M18.8818 9.55505L13.1964 15.2404C12.777 15.6599 12.777 16.34 13.1964 16.7595L18.8818 22.4449" stroke="#fff" strokeLinecap="round" />
    </g>
    <defs>
      <filter id="filter0_bd_761_16718" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_761_16718" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_761_16718" result="effect2_dropShadow_761_16718" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_761_16718" result="shape" />
      </filter>
    </defs>
  </svg>
);
ArrowLeft.displayName = 'ArrowLeft';
export default ArrowLeft;
/* tslint:enable */
/* eslint-enable */
