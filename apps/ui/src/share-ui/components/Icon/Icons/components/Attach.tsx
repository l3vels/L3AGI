/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface AttachProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Attach: React.FC<AttachProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_5714_42096)">
      <path d="M17 11.5128V21.5641C17 22.3571 16.3284 23 15.5 23C14.6716 23 14 22.3571 14 21.5641V11.8718C14 10.2857 15.3431 9 17 9C18.6569 9 20 10.2857 20 11.8718V18.3333"
        stroke="#fff" strokeLinecap="round" />
    </g>
    <defs>
      <filter id="filter0_bd_5714_42096" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_5714_42096" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_5714_42096" result="effect2_dropShadow_5714_42096" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_5714_42096" result="shape" />
      </filter>
    </defs>
  </svg>
);
Attach.displayName = 'Attach';
export default Attach;
/* tslint:enable */
/* eslint-enable */
