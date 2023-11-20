/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface ArrowLeftOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const ArrowLeftOutline: React.FC<ArrowLeftOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_718_13660)">
      <path d="M22.5858 14L17.2929 19.2929C16.9024 19.6834 16.9024 20.3166 17.2929 20.7071L22.5858 26" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </g>
    <defs>
      <filter id="filter0_bd_718_13660" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_718_13660" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_718_13660" result="effect2_dropShadow_718_13660" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_718_13660" result="shape" />
      </filter>
    </defs>
  </svg>
);
ArrowLeftOutline.displayName = 'ArrowLeftOutline';
export default ArrowLeftOutline;
/* tslint:enable */
/* eslint-enable */
