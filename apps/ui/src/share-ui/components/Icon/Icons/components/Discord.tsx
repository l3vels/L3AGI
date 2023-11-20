/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface DiscordProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Discord: React.FC<DiscordProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_718_13601)">
      <path d="M16.1356 9.00022C15.7612 9.00316 12.6938 9.09849 9.45521 11.7473C9.45521 11.7473 6 18.5892 6 27.0122C6 27.0122 8.01509 30.8152 13.3182 31C13.3182 31 14.2061 29.8384 14.9255 28.8338C11.8795 27.8291 10.7268 25.7421 10.7268 25.7421C10.7268 25.7421 10.9675 25.9269 11.3981 26.1923C11.4222 26.1923 11.4449 26.2202 11.4917 26.2451C11.5652 26.2964 11.6361 26.3243 11.7083 26.3771C12.3074 26.7467 12.9064 27.0371 13.46 27.2732C14.4441 27.7235 15.6195 28.118 16.9887 28.4084C18.7885 28.778 20.8999 28.91 23.2011 28.4363C24.3944 28.1927 25.561 27.8122 26.6818 27.3011C27.6523 26.8991 28.5774 26.376 29.439 25.7421C29.439 25.7421 28.2409 27.8804 25.0972 28.8587C25.8166 29.8355 26.6818 30.9692 26.6818 30.9692C31.9836 30.7844 34 26.9799 34 27.0092C34 18.5819 30.5448 11.7429 30.5448 11.7429C27.1137 8.92102 23.8256 9.00022 23.8256 9.00022L23.49 9.42262C27.5683 10.769 29.4644 12.7519 29.4644 12.7519C27.2265 11.4152 24.7751 10.5632 22.2437 10.2425C20.6315 10.0456 19.0036 10.0634 17.3952 10.2953C17.2522 10.2953 17.1318 10.3231 16.9861 10.3466C16.1463 10.4522 14.1072 10.769 11.5398 12.0113C10.6533 12.4337 10.1238 12.7519 10.1238 12.7519C10.1238 12.7519 12.0947 10.6649 16.4124 9.31849L16.1717 9.00022H16.1343H16.1356ZM15.5245 18.7461C16.8911 18.7461 17.9969 20.0397 17.9715 21.6516C17.9715 23.2649 16.8911 24.5585 15.5245 24.5585C14.1807 24.5585 13.0776 23.2634 13.0776 21.6516C13.0776 20.0397 14.1553 18.7461 15.5245 18.7461V18.7461ZM24.2829 18.7461C25.6254 18.7461 26.7299 20.0397 26.7299 21.6516C26.7299 23.2649 25.6481 24.5585 24.2829 24.5585C22.9377 24.5585 21.8359 23.2634 21.8359 21.6516C21.8359 20.0397 22.9137 18.7461 24.2829 18.7461V18.7461Z"
        fill="#fff" />
    </g>
    <defs>
      <filter id="filter0_bd_718_13601" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_718_13601" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_718_13601" result="effect2_dropShadow_718_13601" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_718_13601" result="shape" />
      </filter>
    </defs>
  </svg>
);
Discord.displayName = 'Discord';
export default Discord;
/* tslint:enable */
/* eslint-enable */
