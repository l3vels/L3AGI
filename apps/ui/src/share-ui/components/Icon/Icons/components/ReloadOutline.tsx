/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface ReloadOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const ReloadOutline: React.FC<ReloadOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_718_13814)">
      <path d="M30.5199 14.499C27.5228 8.49727 19.6855 6.31481 13.579 9.38205C13.0991 9.63766 12.8898 10.198 13.1553 10.7092C13.4208 11.1713 14.0028 11.3728 14.5338 11.1172C19.6344 8.56117 26.1443 10.3848 28.6614 15.3592C32.0006 21.9607 27.6913 26.9941 24.199 28.8571C19.4455 31.3984 13.4157 29.7124 10.536 25.3819L14.0743 26.0946C14.6053 26.1978 15.1873 25.8882 15.2946 25.3278C15.4018 24.8166 15.0801 24.2562 14.4981 24.153L8.22822 22.9241C7.17643 22.8258 6.95178 23.7401 7.00795 24.0498L7.80444 30.1351C7.8555 30.6463 8.28438 31.0051 8.81538 31.0051C9.46891 31.0051 9.87737 30.3907 9.82631 29.8304L9.51997 27.348C12.4507 30.8282 18.215 33.7971 25.215 30.7004C28.1815 29.2257 34.9925 23.4403 30.5199 14.499Z"
        fill="#fff" />
    </g>
    <defs>
      <filter id="filter0_bd_718_13814" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_718_13814" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_718_13814" result="effect2_dropShadow_718_13814" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_718_13814" result="shape" />
      </filter>
    </defs>
  </svg>
);
ReloadOutline.displayName = 'ReloadOutline';
export default ReloadOutline;
/* tslint:enable */
/* eslint-enable */
