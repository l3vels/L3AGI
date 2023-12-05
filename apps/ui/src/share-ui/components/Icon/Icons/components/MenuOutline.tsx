/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface MenuOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const MenuOutline: React.FC<MenuOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_718_13807)">
      <path d="M12 20H28.5M12 14H28.5M12 26H28.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <filter id="filter0_bd_718_13807" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_718_13807" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_718_13807" result="effect2_dropShadow_718_13807" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_718_13807" result="shape" />
      </filter>
    </defs>
  </svg>
);
MenuOutline.displayName = 'MenuOutline';
export default MenuOutline;
/* tslint:enable */
/* eslint-enable */
