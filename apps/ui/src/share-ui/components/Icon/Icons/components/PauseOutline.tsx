/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface PauseOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const PauseOutline: React.FC<PauseOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_718_13947)">
      <path d="M16.2787 29.7327C17.0079 29.7327 17.5671 29.197 17.5671 28.488V11.2544C17.5671 10.5454 17.0079 10 16.2787 10C15.5592 10 15 10.5454 15 11.2544V28.488C15 29.197 15.5592 29.7327 16.2787 29.7327ZM24.4256 29.7327C25.1451 29.7327 25.7139 29.197 25.7139 28.488V11.2544C25.7139 10.5454 25.1451 10 24.4256 10C23.704 10 23.1469 10.5454 23.1469 11.2544V28.488C23.1469 29.197 23.704 29.7327 24.4256 29.7327Z"
        fill="#fff" />
    </g>
    <defs>
      <filter id="filter0_bd_718_13947" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_718_13947" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_718_13947" result="effect2_dropShadow_718_13947" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_718_13947" result="shape" />
      </filter>
    </defs>
  </svg>
);
PauseOutline.displayName = 'PauseOutline';
export default PauseOutline;
/* tslint:enable */
/* eslint-enable */
