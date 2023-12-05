/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface BurgerMenuOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const BurgerMenuOutline: React.FC<BurgerMenuOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_719_20085)">
      <path d="M8.5 15C8.5 14.1716 9.17157 13.5 10 13.5H29.25C30.0784 13.5 30.75 14.1716 30.75 15C30.75 15.8284 30.0784 16.5 29.25 16.5H10C9.17157 16.5 8.5 15.8284 8.5 15ZM8.5 20.25C8.5 19.4216 9.17157 18.75 10 18.75H24C24.8284 18.75 25.5 19.4216 25.5 20.25C25.5 21.0784 24.8284 21.75 24 21.75H10C9.17157 21.75 8.5 21.0784 8.5 20.25ZM8.5 25.5C8.5 24.6716 9.17157 24 10 24H29.2493C30.0778 24 30.7493 24.6716 30.7493 25.5C30.7493 26.3284 30.0778 27 29.2493 27H10C9.17157 27 8.5 26.3284 8.5 25.5Z"
        fill="#fff" fillRule="evenodd" clipRule="evenodd" />
    </g>
    <defs>
      <filter id="filter0_bd_719_20085" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_719_20085" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_719_20085" result="effect2_dropShadow_719_20085" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_719_20085" result="shape" />
      </filter>
    </defs>
  </svg>
);
BurgerMenuOutline.displayName = 'BurgerMenuOutline';
export default BurgerMenuOutline;
/* tslint:enable */
/* eslint-enable */
