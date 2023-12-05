/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface CodeOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const CodeOutline: React.FC<CodeOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_719_20033)">
      <path d="M14 16.25L9.5 20L14 23.75M26 16.25L30.5 20L26 23.75M23 11.75L17 28.25" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <filter id="filter0_bd_719_20033" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_719_20033" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_719_20033" result="effect2_dropShadow_719_20033" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_719_20033" result="shape" />
      </filter>
    </defs>
  </svg>
);
CodeOutline.displayName = 'CodeOutline';
export default CodeOutline;
/* tslint:enable */
/* eslint-enable */
