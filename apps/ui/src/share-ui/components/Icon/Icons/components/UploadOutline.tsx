/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface UploadOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const UploadOutline: React.FC<UploadOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_719_20039)">
      <path d="M19.9845 32.0103C20.7394 32.0103 21.2637 31.4776 21.2637 30.7079V19.7979L21.1522 17.3302L24.283 20.7722L26.6928 23.1469C26.9225 23.3766 27.2481 23.5285 27.6116 23.5285C28.3177 23.5285 28.8462 22.9988 28.8462 22.2631C28.8462 21.9355 28.7059 21.6144 28.4251 21.3303L20.9384 13.9184C20.6799 13.6545 20.3417 13.4961 19.9845 13.4961C19.6198 13.4961 19.2891 13.6545 19.0306 13.9184L11.5365 21.3303C11.2674 21.6144 11.127 21.9355 11.127 22.2631C11.127 22.9988 11.6459 23.5285 12.3617 23.5285C12.7252 23.5285 13.0369 23.3808 13.2805 23.1469L15.6882 20.7722L18.8169 17.3206L18.6978 19.7979V30.7079C18.6978 31.4776 19.22 32.0103 19.9845 32.0103ZM12.2272 13.5216H27.7131C28.4363 13.5216 28.9616 12.9847 28.9616 12.2656C28.9616 11.5444 28.4363 11 27.7131 11H12.2272C11.5135 11 11 11.5444 11 12.2656C11 12.9847 11.5135 13.5216 12.2272 13.5216Z"
        fill="#fff" />
    </g>
    <defs>
      <filter id="filter0_bd_719_20039" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_719_20039" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_719_20039" result="effect2_dropShadow_719_20039" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_719_20039" result="shape" />
      </filter>
    </defs>
  </svg>
);
UploadOutline.displayName = 'UploadOutline';
export default UploadOutline;
/* tslint:enable */
/* eslint-enable */
