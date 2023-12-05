/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface MinusProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Minus: React.FC<MinusProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_761_16779)">
      <path d="M10.2856 16H22.0073" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </g>
    <defs>
      <filter id="filter0_bd_761_16779" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_761_16779" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_761_16779" result="effect2_dropShadow_761_16779" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_761_16779" result="shape" />
      </filter>
    </defs>
  </svg>
);
Minus.displayName = 'Minus';
export default Minus;
/* tslint:enable */
/* eslint-enable */
