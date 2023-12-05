/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface MenuDotsOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const MenuDotsOutline: React.FC<MenuDotsOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_719_20080)">
      <path d="M23 9.5C23 10.8807 21.8807 12 20.5 12C19.1193 12 18 10.8807 18 9.5C18 8.11929 19.1193 7 20.5 7C21.8807 7 23 8.11929 23 9.5ZM23 19.5C23 20.8807 21.8807 22 20.5 22C19.1193 22 18 20.8807 18 19.5C18 18.1193 19.1193 17 20.5 17C21.8807 17 23 18.1193 23 19.5ZM23 30.5C23 31.8807 21.8807 33 20.5 33C19.1193 33 18 31.8807 18 30.5C18 29.1193 19.1193 28 20.5 28C21.8807 28 23 29.1193 23 30.5Z"
        stroke="#fff" strokeWidth="2" />
    </g>
    <defs>
      <filter id="filter0_bd_719_20080" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_719_20080" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_719_20080" result="effect2_dropShadow_719_20080" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_719_20080" result="shape" />
      </filter>
    </defs>
  </svg>
);
MenuDotsOutline.displayName = 'MenuDotsOutline';
export default MenuDotsOutline;
/* tslint:enable */
/* eslint-enable */
