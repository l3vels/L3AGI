/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface ExpandProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Expand: React.FC<ExpandProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_761_16563)">
      <path d="M14.3501 17.6499L10.2253 21.7747M17.6499 14.3501L21.7747 10.2253M16 23H10.2374C9.55402 23 9 22.446 9 21.7626V16M23 16V10.2374C23 9.55402 22.446 9 21.7626 9H16"
        stroke="#fff" strokeLinecap="round" />
    </g>
    <defs>
      <filter id="filter0_bd_761_16563" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_761_16563" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_761_16563" result="effect2_dropShadow_761_16563" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_761_16563" result="shape" />
      </filter>
    </defs>
  </svg>
);
Expand.displayName = 'Expand';
export default Expand;
/* tslint:enable */
/* eslint-enable */
