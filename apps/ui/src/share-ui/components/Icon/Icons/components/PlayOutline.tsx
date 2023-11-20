/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface PlayOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const PlayOutline: React.FC<PlayOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_718_13946)">
      <path d="M32.5 19.134C33.1667 19.5189 33.1667 20.4811 32.5 20.866L14.5 31.2583C13.8333 31.6432 13 31.1621 13 30.3923L13 9.60769C13 8.83789 13.8333 8.35677 14.5 8.74167L32.5 19.134Z"
        stroke="#fff" strokeWidth="2" />
    </g>
    <defs>
      <filter id="filter0_bd_718_13946" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_718_13946" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_718_13946" result="effect2_dropShadow_718_13946" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_718_13946" result="shape" />
      </filter>
    </defs>
  </svg>
);
PlayOutline.displayName = 'PlayOutline';
export default PlayOutline;
/* tslint:enable */
/* eslint-enable */
