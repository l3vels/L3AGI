/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface LinkOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const LinkOutline: React.FC<LinkOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_719_20075)">
      <path d="M20.1148 14.6762L18.3348 16.4713C19.7403 16.6023 20.7355 17.0509 21.4487 17.7641C23.4425 19.7558 23.435 22.565 21.4646 24.5354L17.5693 28.419C15.5872 30.399 12.7993 30.4065 10.8097 28.4244C8.81587 26.4231 8.82337 23.6352 10.8034 21.6531L12.8155 19.643C12.441 18.7972 12.3189 17.7495 12.5258 16.8465L9.15853 20.1957C6.28393 23.0694 6.27315 27.155 9.17025 30.0521C12.0791 32.9631 16.1584 32.9438 19.0266 30.0756L23.102 25.9927C25.9798 23.1149 25.997 19.0335 23.0881 16.1363C22.4026 15.4487 21.4756 14.9256 20.1148 14.6762ZM19.0836 24.5518L20.8637 22.7567C19.4581 22.6353 18.463 22.1792 17.7498 21.466C15.7581 19.4722 15.7635 16.6651 17.7359 14.6947L21.6216 10.8111C23.6113 8.82899 26.3992 8.82149 28.3909 10.8132C30.3826 12.8049 30.3655 15.6045 28.3951 17.5749L26.3851 19.585C26.7575 20.4425 26.87 21.4785 26.6748 22.3836L30.042 19.0323C32.9145 16.1586 32.9274 12.0826 30.0303 9.17588C27.1194 6.26705 23.0401 6.28627 20.1622 9.16416L16.0986 13.2352C13.2207 16.1131 13.2036 20.1945 16.1103 23.0916C16.798 23.7793 17.7228 24.3024 19.0836 24.5518Z"
        fill="#fff" />
    </g>
    <defs>
      <filter id="filter0_bd_719_20075" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_719_20075" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_719_20075" result="effect2_dropShadow_719_20075" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_719_20075" result="shape" />
      </filter>
    </defs>
  </svg>
);
LinkOutline.displayName = 'LinkOutline';
export default LinkOutline;
/* tslint:enable */
/* eslint-enable */
