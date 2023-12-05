/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface SettingsOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const SettingsOutline: React.FC<SettingsOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_718_13664)" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M30.064 25.1777V14.8238C30.064 14.6688 30.0228 14.5167 29.9447 14.3828C29.8666 14.249 29.7544 14.1383 29.6195 14.0621L20.432 8.86912C20.3007 8.79487 20.1523 8.75586 20.0015 8.75586C19.8506 8.75586 19.7023 8.79487 19.5709 8.86912L10.3834 14.0621C10.2485 14.1383 10.1363 14.249 10.0582 14.3828C9.98011 14.5167 9.93896 14.6688 9.93896 14.8238V25.1777C9.93896 25.3327 9.98011 25.4849 10.0582 25.6187C10.1363 25.7525 10.2485 25.8632 10.3834 25.9395L19.5709 31.1324C19.7023 31.2067 19.8506 31.2457 20.0015 31.2457C20.1523 31.2457 20.3007 31.2067 20.432 31.1324L29.6195 25.9395C29.7544 25.8632 29.8666 25.7525 29.9447 25.6187C30.0228 25.4849 30.064 25.3327 30.064 25.1777Z"
      />
      <path d="M19.9998 23.9366C22.1744 23.9366 23.9373 22.1737 23.9373 19.9991C23.9373 17.8244 22.1744 16.0616 19.9998 16.0616C17.8252 16.0616 16.0623 17.8244 16.0623 19.9991C16.0623 22.1737 17.8252 23.9366 19.9998 23.9366Z"
      />
    </g>
    <defs>
      <filter id="filter0_bd_718_13664" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_718_13664" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_718_13664" result="effect2_dropShadow_718_13664" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_718_13664" result="shape" />
      </filter>
    </defs>
  </svg>
);
SettingsOutline.displayName = 'SettingsOutline';
export default SettingsOutline;
/* tslint:enable */
/* eslint-enable */
