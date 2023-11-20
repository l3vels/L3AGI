/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface AddProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Add: React.FC<AddProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_761_16599)">
      <path d="M9 16C9 16.5137 9.42424 16.9326 9.93262 16.9326H15.0689V22.0688C15.0689 22.5757 15.4862 23 16 23C16.5137 23 16.9395 22.5757 16.9395 22.0688V16.9326H22.0688C22.5757 16.9326 23 16.5137 23 16C23 15.4862 22.5757 15.0605 22.0688 15.0605H16.9395V9.93262C16.9395 9.42424 16.5137 9 16 9C15.4862 9 15.0689 9.42424 15.0689 9.93262V15.0605H9.93262C9.42424 15.0605 9 15.4862 9 16Z"
        fill="#fff" />
    </g>
    <defs>
      <filter id="filter0_bd_761_16599" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_761_16599" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_761_16599" result="effect2_dropShadow_761_16599" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_761_16599" result="shape" />
      </filter>
    </defs>
  </svg>
);
Add.displayName = 'Add';
export default Add;
/* tslint:enable */
/* eslint-enable */
