/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface SendProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Send: React.FC<SendProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_761_16785)">
      <path d="M22.2962 9.02079L9.40329 12.6572C9.29482 12.6878 9.19828 12.7508 9.12656 12.8377C9.05484 12.9247 9.01136 13.0314 9.00194 13.1437C8.99251 13.256 9.01759 13.3685 9.07382 13.4662C9.13004 13.5639 9.21474 13.642 9.31659 13.6903L15.2404 16.4963C15.3559 16.551 15.449 16.6441 15.5037 16.7596L18.3097 22.6834C18.358 22.7853 18.4361 22.87 18.5338 22.9262C18.6315 22.9824 18.744 23.0075 18.8563 22.9981C18.9686 22.9886 19.0753 22.9452 19.1623 22.8734C19.2492 22.8017 19.3122 22.7052 19.3428 22.5967L22.9792 9.70383C23.0059 9.60912 23.0069 9.50901 22.9821 9.41379C22.9572 9.31858 22.9074 9.23171 22.8379 9.16213C22.7683 9.09255 22.6814 9.04278 22.5862 9.01793C22.491 8.99309 22.3909 8.99407 22.2962 9.02079Z"
        stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <filter id="filter0_bd_761_16785" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_761_16785" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_761_16785" result="effect2_dropShadow_761_16785" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_761_16785" result="shape" />
      </filter>
    </defs>
  </svg>
);
Send.displayName = 'Send';
export default Send;
/* tslint:enable */
/* eslint-enable */
