/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface AddOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const AddOutline: React.FC<AddOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_719_20064)">
      <path d="M10 19.8072C10 20.5269 10.5944 21.1138 11.3066 21.1138H18.5027V28.3098C18.5027 29.02 19.0874 29.6144 19.8072 29.6144C20.5269 29.6144 21.1234 29.02 21.1234 28.3098V21.1138H28.3098C29.02 21.1138 29.6144 20.5269 29.6144 19.8072C29.6144 19.0874 29.02 18.4909 28.3098 18.4909H21.1234V11.3066C21.1234 10.5944 20.5269 10 19.8072 10C19.0874 10 18.5027 10.5944 18.5027 11.3066V18.4909H11.3066C10.5944 18.4909 10 19.0874 10 19.8072Z"
        fill="#fff" />
    </g>
    <defs>
      <filter id="filter0_bd_719_20064" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_719_20064" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_719_20064" result="effect2_dropShadow_719_20064" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_719_20064" result="shape" />
      </filter>
    </defs>
  </svg>
);
AddOutline.displayName = 'AddOutline';
export default AddOutline;
/* tslint:enable */
/* eslint-enable */
