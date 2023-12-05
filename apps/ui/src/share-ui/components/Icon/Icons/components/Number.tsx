/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface NumberProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Number: React.FC<NumberProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_1413_34660)">
      <path d="M9.97492 13.5065H22.8574M19.4282 9.14282L17.1426 22.8571M14.857 9.14282L12.5715 22.8571M9.14307 18.4935H22.0255" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"
      />
    </g>
    <defs>
      <filter id="filter0_bd_1413_34660" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1413_34660" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_1413_34660" result="effect2_dropShadow_1413_34660" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_1413_34660" result="shape" />
      </filter>
    </defs>
  </svg>
);
Number.displayName = 'Number';
export default Number;
/* tslint:enable */
/* eslint-enable */
