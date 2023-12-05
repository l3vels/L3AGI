/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface MenuDotsProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const MenuDots: React.FC<MenuDotsProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_761_16578)">
      <path d="M16.3751 15.6248L16.3751 16.3748M15.6251 15.6248V16.3748M16.3751 8.62476L16.3751 9.37476M15.6251 8.62476V9.37476M16.3751 22.6248L16.3751 23.3748M15.6251 22.6248V23.3748M16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16C17 16.5523 16.5523 17 16 17ZM16 10C15.4477 10 15 9.55229 15 9C15 8.44772 15.4477 8 16 8C16.5523 8 17 8.44772 17 9C17 9.55229 16.5523 10 16 10ZM16 24C15.4477 24 15 23.5523 15 23C15 22.4477 15.4477 22 16 22C16.5523 22 17 22.4477 17 23C17 23.5523 16.5523 24 16 24Z"
        stroke="#fff" strokeLinecap="round" />
    </g>
    <defs>
      <filter id="filter0_bd_761_16578" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_761_16578" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_761_16578" result="effect2_dropShadow_761_16578" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_761_16578" result="shape" />
      </filter>
    </defs>
  </svg>
);
MenuDots.displayName = 'MenuDots';
export default MenuDots;
/* tslint:enable */
/* eslint-enable */
