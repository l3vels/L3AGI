/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface ArrowDownProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const ArrowDown: React.FC<ArrowDownProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_761_16727)">
      <path d="M10 13L15.6852 18.6854C16.1047 19.1049 16.7847 19.1049 17.2042 18.6854L22.8894 13" stroke="#fff" strokeLinecap="round" />
    </g>
    <defs>
      <filter id="filter0_bd_761_16727" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_761_16727" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_761_16727" result="effect2_dropShadow_761_16727" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_761_16727" result="shape" />
      </filter>
    </defs>
  </svg>
);
ArrowDown.displayName = 'ArrowDown';
export default ArrowDown;
/* tslint:enable */
/* eslint-enable */
