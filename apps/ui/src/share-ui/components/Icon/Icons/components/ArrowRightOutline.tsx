/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface ArrowRightOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const ArrowRightOutline: React.FC<ArrowRightOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_718_13661)">
      <path d="M17 14L22.2929 19.2929C22.6834 19.6834 22.6834 20.3166 22.2929 20.7071L17 26" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </g>
    <defs>
      <filter id="filter0_bd_718_13661" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_718_13661" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_718_13661" result="effect2_dropShadow_718_13661" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_718_13661" result="shape" />
      </filter>
    </defs>
  </svg>
);
ArrowRightOutline.displayName = 'ArrowRightOutline';
export default ArrowRightOutline;
/* tslint:enable */
/* eslint-enable */
