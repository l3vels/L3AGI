/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface ArrowDownOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const ArrowDownOutline: React.FC<ArrowDownOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_718_13663)">
      <path d="M14 17L19.2929 22.2929C19.6834 22.6834 20.3166 22.6834 20.7071 22.2929L26 17" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </g>
    <defs>
      <filter id="filter0_bd_718_13663" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_718_13663" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_718_13663" result="effect2_dropShadow_718_13663" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_718_13663" result="shape" />
      </filter>
    </defs>
  </svg>
);
ArrowDownOutline.displayName = 'ArrowDownOutline';
export default ArrowDownOutline;
/* tslint:enable */
/* eslint-enable */
