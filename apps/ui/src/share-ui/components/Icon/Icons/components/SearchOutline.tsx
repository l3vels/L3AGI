/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface SearchOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const SearchOutline: React.FC<SearchOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_718_13659)">
      <path d="M8 17.8022C8 23.2124 12.4372 27.6067 17.8952 27.6067C19.925 27.6067 21.7878 26.9886 23.3409 25.9453L28.9255 31.4886C29.2751 31.835 29.7383 32 30.2257 32C31.2602 32 32 31.2254 32 30.2124C32 29.7359 31.8234 29.2913 31.4894 28.9603L25.9477 23.4377C27.1079 21.8562 27.7904 19.9119 27.7904 17.8022C27.7904 12.3943 23.3532 8 17.8952 8C12.4372 8 8 12.3943 8 17.8022ZM10.5775 17.8022C10.5775 13.8018 13.8577 10.5539 17.8952 10.5539C21.9327 10.5539 25.2106 13.8018 25.2106 17.8022C25.2106 21.8049 21.9327 25.0527 17.8952 25.0527C13.8577 25.0527 10.5775 21.8049 10.5775 17.8022Z"
        fill="#fff" />
    </g>
    <defs>
      <filter id="filter0_bd_718_13659" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_718_13659" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_718_13659" result="effect2_dropShadow_718_13659" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_718_13659" result="shape" />
      </filter>
    </defs>
  </svg>
);
SearchOutline.displayName = 'SearchOutline';
export default SearchOutline;
/* tslint:enable */
/* eslint-enable */
