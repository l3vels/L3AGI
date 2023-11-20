/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface ArrowUpProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const ArrowUp: React.FC<ArrowUpProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_761_16724)">
      <path d="M10 19L15.6852 13.3146C16.1047 12.8951 16.7847 12.8951 17.2042 13.3146L22.8894 19" stroke="#fff" strokeLinecap="round" />
    </g>
    <defs>
      <filter id="filter0_bd_761_16724" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_761_16724" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_761_16724" result="effect2_dropShadow_761_16724" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_761_16724" result="shape" />
      </filter>
    </defs>
  </svg>
);
ArrowUp.displayName = 'ArrowUp';
export default ArrowUp;
/* tslint:enable */
/* eslint-enable */
