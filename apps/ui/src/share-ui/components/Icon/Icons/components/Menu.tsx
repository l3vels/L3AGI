/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface MenuProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Menu: React.FC<MenuProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_761_16742)">
      <path d="M11.4287 16H20.8573M11.4287 12.5714H20.8573M11.4287 19.4286H20.8573" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <filter id="filter0_bd_761_16742" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_761_16742" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_761_16742" result="effect2_dropShadow_761_16742" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_761_16742" result="shape" />
      </filter>
    </defs>
  </svg>
);
Menu.displayName = 'Menu';
export default Menu;
/* tslint:enable */
/* eslint-enable */
