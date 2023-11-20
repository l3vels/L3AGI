/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface ValueOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const ValueOutline: React.FC<ValueOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_1413_34452)" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 20C25.3157 20 29.625 17.6495 29.625 14.75C29.625 11.8505 25.3157 9.5 20 9.5C14.6843 9.5 10.375 11.8505 10.375 14.75C10.375 17.6495 14.6843 20 20 20Z"
      />
      <path d="M10.375 14.75V20C10.375 22.8995 14.6843 25.25 20 25.25C25.3157 25.25 29.625 22.8995 29.625 20V14.75" />
      <path d="M10.375 20V25.25C10.375 28.1495 14.6843 30.5 20 30.5C25.3157 30.5 29.625 28.1495 29.625 25.25V20" />
    </g>
    <defs>
      <filter id="filter0_bd_1413_34452" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1413_34452" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_1413_34452" result="effect2_dropShadow_1413_34452" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_1413_34452" result="shape" />
      </filter>
    </defs>
  </svg>
);
ValueOutline.displayName = 'ValueOutline';
export default ValueOutline;
/* tslint:enable */
/* eslint-enable */
