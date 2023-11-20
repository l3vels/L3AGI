/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface NumberOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const NumberOutline: React.FC<NumberOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_1413_34450)">
      <path d="M9.45574 15.6364H32M25.999 8L21.9993 32M17.9995 8L13.9997 32M8 24.3636H30.5443" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
    </g>
    <defs>
      <filter id="filter0_bd_1413_34450" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1413_34450" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_1413_34450" result="effect2_dropShadow_1413_34450" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_1413_34450" result="shape" />
      </filter>
    </defs>
  </svg>
);
NumberOutline.displayName = 'NumberOutline';
export default NumberOutline;
/* tslint:enable */
/* eslint-enable */
