/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface CollapseProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Collapse: React.FC<CollapseProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_761_16543)">
      <path d="M23 23L18.0503 18.0503M9 9L13.9497 13.9497M23 17L18.0607 17C17.4749 17 17 17.4749 17 18.0607L17 23M15 9L15 13.9393C15 14.5251 14.5251 15 13.9393 15H9"
        stroke="#fff" strokeLinecap="round" />
    </g>
    <defs>
      <filter id="filter0_bd_761_16543" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_761_16543" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_761_16543" result="effect2_dropShadow_761_16543" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_761_16543" result="shape" />
      </filter>
    </defs>
  </svg>
);
Collapse.displayName = 'Collapse';
export default Collapse;
/* tslint:enable */
/* eslint-enable */
