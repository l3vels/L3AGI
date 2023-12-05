/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface PauseProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Pause: React.FC<PauseProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_761_16756)" stroke="#fff">
      <path d="M10 10C10 8.89543 10.8954 8 12 8 13.1046 8 14 8.89543 14 10V22C14 23.1046 13.1046 24 12 24 10.8954 24 10 23.1046 10 22V10zM18 10C18 8.89543 18.8954 8 20 8 21.1046 8 22 8.89543 22 10V22C22 23.1046 21.1046 24 20 24 18.8954 24 18 23.1046 18 22V10z"
      />
    </g>
    <defs>
      <filter id="filter0_bd_761_16756" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_761_16756" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_761_16756" result="effect2_dropShadow_761_16756" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_761_16756" result="shape" />
      </filter>
    </defs>
  </svg>
);
Pause.displayName = 'Pause';
export default Pause;
/* tslint:enable */
/* eslint-enable */
