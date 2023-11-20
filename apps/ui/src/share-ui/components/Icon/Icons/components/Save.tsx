/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface SaveProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Save: React.FC<SaveProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_761_16739)">
      <path d="M11.8569 10.2142H20.1426C20.4188 10.2142 20.6426 10.4381 20.6426 10.7142V20.8304C20.6426 21.2448 20.1674 21.4793 19.8384 21.2272L16.9124 18.9839C16.374 18.5711 15.6256 18.5711 15.0871 18.9839L12.1611 21.2272C11.8322 21.4793 11.3569 21.2448 11.3569 20.8304V10.7142C11.3569 10.4381 11.5808 10.2142 11.8569 10.2142Z"
        stroke="#fff" />
    </g>
    <defs>
      <filter id="filter0_bd_761_16739" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_761_16739" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_761_16739" result="effect2_dropShadow_761_16739" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_761_16739" result="shape" />
      </filter>
    </defs>
  </svg>
);
Save.displayName = 'Save';
export default Save;
/* tslint:enable */
/* eslint-enable */
