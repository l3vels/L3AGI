/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface LocationOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const LocationOutline: React.FC<LocationOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_719_20073)">
      <path d="M20.2564 33L19.4587 32.325C19.1168 31.9875 10 24.5625 10 16.125C10 10.5 14.5584 6 20.2564 6C25.9544 6 30.5128 10.5 30.5128 16.125C30.5128 24.5625 21.396 31.9875 21.0541 32.325L20.2564 33ZM20.2564 8.25C15.812 8.25 12.2792 11.7375 12.2792 16.125C12.2792 22.2 18.0912 27.9375 20.2564 29.9625C22.4217 27.9375 28.2336 22.2 28.2336 16.125C28.2336 11.7375 24.5869 8.25 20.2564 8.25ZM20.2564 20.625C17.7493 20.625 15.698 18.6 15.698 16.125C15.698 13.65 17.7493 11.625 20.2564 11.625C22.7635 11.625 24.8148 13.65 24.8148 16.125C24.8148 18.6 22.7635 20.625 20.2564 20.625ZM20.2564 13.875C19.0028 13.875 17.9772 14.8875 17.9772 16.125C17.9772 17.3625 19.0028 18.375 20.2564 18.375C21.51 18.375 22.5356 17.3625 22.5356 16.125C22.5356 14.8875 21.51 13.875 20.2564 13.875Z"
        fill="#fff" />
    </g>
    <defs>
      <filter id="filter0_bd_719_20073" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_719_20073" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_719_20073" result="effect2_dropShadow_719_20073" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_719_20073" result="shape" />
      </filter>
    </defs>
  </svg>
);
LocationOutline.displayName = 'LocationOutline';
export default LocationOutline;
/* tslint:enable */
/* eslint-enable */
