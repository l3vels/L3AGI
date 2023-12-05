/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface CodeProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Code: React.FC<CodeProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_761_16551)">
      <path d="M12.5714 13.8572L10 16.0001L12.5714 18.1429M19.4286 13.8572L22 16.0001L19.4286 18.1429M17.7143 11.2858L14.2857 20.7143" stroke="#fff" strokeLinecap="round"
        strokeLinejoin="round" />
    </g>
    <defs>
      <filter id="filter0_bd_761_16551" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_761_16551" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_761_16551" result="effect2_dropShadow_761_16551" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_761_16551" result="shape" />
      </filter>
    </defs>
  </svg>
);
Code.displayName = 'Code';
export default Code;
/* tslint:enable */
/* eslint-enable */
