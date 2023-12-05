/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface MinusOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const MinusOutline: React.FC<MinusOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_719_20062)">
      <path d="M10 20H30.5128" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </g>
    <defs>
      <filter id="filter0_bd_719_20062" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_719_20062" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_719_20062" result="effect2_dropShadow_719_20062" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_719_20062" result="shape" />
      </filter>
    </defs>
  </svg>
);
MinusOutline.displayName = 'MinusOutline';
export default MinusOutline;
/* tslint:enable */
/* eslint-enable */
