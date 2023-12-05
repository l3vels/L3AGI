/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface ToggleProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Toggle: React.FC<ToggleProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_5377_46298)">
      <path d="M15.3 13.4H20.9C22.0598 13.4 23 14.3402 23 15.5C23 16.6598 22.0598 17.6 20.9 17.6H15.3M16 15.5C16 17.433 14.433 19 12.5 19C10.567 19 9 17.433 9 15.5C9 13.567 10.567 12 12.5 12C14.433 12 16 13.567 16 15.5Z"
        stroke="#fff" />
    </g>
    <defs>
      <filter id="filter0_bd_5377_46298" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_5377_46298" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_5377_46298" result="effect2_dropShadow_5377_46298" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_5377_46298" result="shape" />
      </filter>
    </defs>
  </svg>
);
Toggle.displayName = 'Toggle';
export default Toggle;
/* tslint:enable */
/* eslint-enable */
