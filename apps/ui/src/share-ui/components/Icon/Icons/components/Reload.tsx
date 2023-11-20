/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface ReloadProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Reload: React.FC<ReloadProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_761_16745)">
      <g clipPath="url(#clip0_761_16745)">
        <path d="M11.25 12.6291C13.0449 9.52023 17.0202 8.45505 20.1291 10.25C23.238 12.0449 24.3032 16.0202 22.5083 19.1291C20.7134 22.238 16.738 23.3032 13.6291 21.5083C12.1874 20.6759 11.1852 19.3746 10.7039 17.9083M9.2509 18.9805L10.3342 17.1041C10.5337 16.7587 10.9754 16.6403 11.3208 16.8398L13.1972 17.9231"
          stroke="#fff" strokeLinecap="round" />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_761_16745">
        <path fill="#fff" transform="translate(8 8)" d="M0 0H16V16H0z" />
      </clipPath>
      <filter id="filter0_bd_761_16745" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_761_16745" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_761_16745" result="effect2_dropShadow_761_16745" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_761_16745" result="shape" />
      </filter>
    </defs>
  </svg>
);
Reload.displayName = 'Reload';
export default Reload;
/* tslint:enable */
/* eslint-enable */
