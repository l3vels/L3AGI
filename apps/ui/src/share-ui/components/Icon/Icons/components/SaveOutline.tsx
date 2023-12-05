/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface SaveOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const SaveOutline: React.FC<SaveOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_718_13802)">
      <path d="M12 10H28L28 29.9733L21.2169 24.7729C20.499 24.2225 19.501 24.2225 18.7831 24.7729L12 29.9733L12 10Z" stroke="#fff" strokeWidth="2" />
    </g>
    <defs>
      <filter id="filter0_bd_718_13802" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_718_13802" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_718_13802" result="effect2_dropShadow_718_13802" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_718_13802" result="shape" />
      </filter>
    </defs>
  </svg>
);
SaveOutline.displayName = 'SaveOutline';
export default SaveOutline;
/* tslint:enable */
/* eslint-enable */
