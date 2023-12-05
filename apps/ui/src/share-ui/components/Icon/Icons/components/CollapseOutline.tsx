/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface CollapseOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const CollapseOutline: React.FC<CollapseOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_719_20023)">
      <path d="M9 15.4568C9 16.6315 10.2682 16.9737 11.0405 16.1918L16.1897 11.0426C16.9812 10.2607 16.6294 9 15.4547 9H10.2309C9.48609 9 9 9.52125 9 10.2448V15.4568ZM12.0171 13.7215L27.0567 28.7749L28.7728 27.0801L13.7332 12.0192L12.0171 13.7215ZM31.8016 25.3469C31.8016 24.1627 30.5313 23.8301 29.7494 24.6023L24.6002 29.7516C23.8184 30.543 24.1702 31.8016 25.3448 31.8016H30.5686C31.3134 31.8016 31.8016 31.2729 31.8016 30.5569V25.3469ZM31.8016 15.4568V10.2448C31.8016 9.52125 31.3134 9 30.5686 9H25.3448C24.1702 9 23.8184 10.2607 24.6002 11.0426L29.7494 16.1918C30.5313 16.9737 31.8016 16.6315 31.8016 15.4568ZM13.7332 28.7749L28.7824 13.7215L27.0663 12.0192L12.0171 27.0705L13.7332 28.7749ZM9 25.3469V30.5569C9 31.2729 9.48609 31.8016 10.2309 31.8016H15.4547C16.6294 31.8016 16.9812 30.543 16.1897 29.7516L11.0405 24.6023C10.2682 23.8301 9 24.1627 9 25.3469Z"
        fill="#fff" />
    </g>
    <defs>
      <filter id="filter0_bd_719_20023" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_719_20023" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_719_20023" result="effect2_dropShadow_719_20023" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_719_20023" result="shape" />
      </filter>
    </defs>
  </svg>
);
CollapseOutline.displayName = 'CollapseOutline';
export default CollapseOutline;
/* tslint:enable */
/* eslint-enable */
