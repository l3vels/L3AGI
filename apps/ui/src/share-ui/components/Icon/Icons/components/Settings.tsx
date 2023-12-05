/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface SettingsProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Settings: React.FC<SettingsProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_761_16736)">
      <path d="M13.1429 22.2632L13.1429 13.4211M13.1429 13.4211C14.3263 13.4211 15.2857 12.4314 15.2857 11.2105C15.2857 9.98969 14.3263 9 13.1429 9C11.9594 9 11 9.98969 11 11.2105C11 12.4314 11.9594 13.4211 13.1429 13.4211ZM18.8571 18.5789L18.8571 10.4737M18.8571 18.5789C20.0406 18.5789 21 19.5686 21 20.7895C21 22.0103 20.0406 23 18.8571 23C17.6737 23 16.7143 22.0103 16.7143 20.7895C16.7143 19.5686 17.6737 18.5789 18.8571 18.5789Z"
        stroke="#fff" strokeLinecap="round" />
    </g>
    <defs>
      <filter id="filter0_bd_761_16736" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_761_16736" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_761_16736" result="effect2_dropShadow_761_16736" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_761_16736" result="shape" />
      </filter>
    </defs>
  </svg>
);
Settings.displayName = 'Settings';
export default Settings;
/* tslint:enable */
/* eslint-enable */
