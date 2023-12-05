/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface ValueProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Value: React.FC<ValueProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_1413_34662)">
      <path d="M21.5005 13C21.5005 14.6569 19.0381 16 16.0005 16C12.9629 16 10.5005 14.6569 10.5005 13M21.5005 13C21.5005 11.3431 19.0381 10 16.0005 10C12.9629 10 10.5005 11.3431 10.5005 13M21.5005 13V16M10.5005 13V16M10.5005 16C10.5005 17.6569 12.9629 19 16.0005 19C19.0381 19 21.5005 17.6569 21.5005 16M10.5005 16V19C10.5005 20.6569 12.9629 22 16.0005 22C19.0381 22 21.5005 20.6569 21.5005 19V16"
        stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <filter id="filter0_bd_1413_34662" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1413_34662" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_1413_34662" result="effect2_dropShadow_1413_34662" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_1413_34662" result="shape" />
      </filter>
    </defs>
  </svg>
);
Value.displayName = 'Value';
export default Value;
/* tslint:enable */
/* eslint-enable */
