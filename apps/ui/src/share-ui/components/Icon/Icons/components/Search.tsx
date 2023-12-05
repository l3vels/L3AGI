/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface SearchProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Search: React.FC<SearchProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_761_16733)">
      <path d="M22.6464 23.3536C22.8417 23.5488 23.1583 23.5488 23.3536 23.3536C23.5488 23.1583 23.5488 22.8417 23.3536 22.6464L22.6464 23.3536ZM20.0294 14.7647C20.0294 17.6723 17.6723 20.0294 14.7647 20.0294V21.0294C18.2246 21.0294 21.0294 18.2246 21.0294 14.7647H20.0294ZM14.7647 20.0294C11.8571 20.0294 9.5 17.6723 9.5 14.7647H8.5C8.5 18.2246 11.3048 21.0294 14.7647 21.0294V20.0294ZM9.5 14.7647C9.5 11.8571 11.8571 9.5 14.7647 9.5V8.5C11.3048 8.5 8.5 11.3048 8.5 14.7647H9.5ZM14.7647 9.5C17.6723 9.5 20.0294 11.8571 20.0294 14.7647H21.0294C21.0294 11.3048 18.2246 8.5 14.7647 8.5V9.5ZM18.5288 19.2359L22.6464 23.3536L23.3536 22.6464L19.2359 18.5288L18.5288 19.2359Z"
        fill="#fff" />
    </g>
    <defs>
      <filter id="filter0_bd_761_16733" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_761_16733" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_761_16733" result="effect2_dropShadow_761_16733" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_761_16733" result="shape" />
      </filter>
    </defs>
  </svg>
);
Search.displayName = 'Search';
export default Search;
/* tslint:enable */
/* eslint-enable */
