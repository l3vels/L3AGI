/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface SortingOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const SortingOutline: React.FC<SortingOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_1413_34445)">
      <path d="M12.2925 9.41715L6.38086 15.4565C6.15 15.697 6 16.0502 6 16.3565C6 17.0831 6.50203 17.5851 7.21687 17.5851C7.56585 17.5851 7.85085 17.4628 8.08171 17.2277L10.496 14.725L12.0705 12.9039L11.9723 15.4127V30.0642C11.9723 30.7886 12.4882 31.3045 13.2105 31.3045C13.9233 31.3045 14.4412 30.7886 14.4412 30.0642V15.4127L14.3526 12.9039L15.9155 14.725L18.3415 17.2277C18.5723 17.4628 18.8477 17.5851 19.1967 17.5851C19.9116 17.5851 20.4136 17.0831 20.4136 16.3565C20.4136 16.0502 20.2732 15.697 20.0327 15.4565L14.1307 9.41715C13.6212 8.88208 12.8116 8.86286 12.2925 9.41715ZM27.6958 30.9077L33.5958 24.8449C33.8362 24.614 33.9766 24.2608 33.9766 23.9449C33.9766 23.2183 33.4767 22.7259 32.7598 22.7259C32.4108 22.7259 32.1354 22.8387 31.9045 23.0737L29.4902 25.5764L27.9157 27.4071L28.0043 24.8983V10.2468C28.0043 9.5341 27.4884 9.00864 26.7757 9.00864C26.0533 9.00864 25.5375 9.5341 25.5375 10.2468V24.8983L25.6357 27.4071L24.0612 25.5764L21.6469 23.0737C21.416 22.8387 21.131 22.7259 20.7916 22.7259C20.0768 22.7259 19.5651 23.2183 19.5651 23.9449C19.5651 24.2608 19.7151 24.614 19.9556 24.8449L25.8555 30.9077C26.3651 31.4407 27.1671 31.4503 27.6958 30.9077Z"
        fill="#fff" />
    </g>
    <defs>
      <filter id="filter0_bd_1413_34445" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1413_34445" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_1413_34445" result="effect2_dropShadow_1413_34445" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_1413_34445" result="shape" />
      </filter>
    </defs>
  </svg>
);
SortingOutline.displayName = 'SortingOutline';
export default SortingOutline;
/* tslint:enable */
/* eslint-enable */
