/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface SortingProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Sorting: React.FC<SortingProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_1413_34655)">
      <path d="M11.5957 9.95269L8.21763 13.4038C8.08571 13.5412 8 13.743 8 13.918C8 14.3332 8.28687 14.6201 8.69535 14.6201C8.89477 14.6201 9.05763 14.5502 9.18955 14.4159L10.5691 12.9858L11.4689 11.9451L11.4128 13.3787V21.751C11.4128 22.1649 11.7075 22.4597 12.1203 22.4597C12.5276 22.4597 12.8236 22.1649 12.8236 21.751V13.3787L12.7729 11.9451L13.666 12.9858L15.0523 14.4159C15.1842 14.5502 15.3415 14.6201 15.541 14.6201C15.9495 14.6201 16.2363 14.3332 16.2363 13.918C16.2363 13.743 16.1561 13.5412 16.0187 13.4038L12.6461 9.95269C12.3549 9.64694 11.8924 9.63595 11.5957 9.95269ZM20.3976 22.233L23.769 18.7685C23.9064 18.6366 23.9866 18.4348 23.9866 18.2543C23.9866 17.8391 23.701 17.5577 23.2913 17.5577C23.0919 17.5577 22.9345 17.6221 22.8026 17.7564L21.423 19.1865L20.5233 20.2327L20.5739 18.7991V10.4268C20.5739 10.0195 20.2791 9.71926 19.8718 9.71926C19.459 9.71926 19.1643 10.0195 19.1643 10.4268V18.7991L19.2204 20.2327L18.3207 19.1865L16.9411 17.7564C16.8091 17.6221 16.6463 17.5577 16.4523 17.5577C16.0439 17.5577 15.7515 17.8391 15.7515 18.2543C15.7515 18.4348 15.8372 18.6366 15.9746 18.7685L19.346 22.233C19.6372 22.5376 20.0955 22.5431 20.3976 22.233Z"
        fill="#fff" />
    </g>
    <defs>
      <filter id="filter0_bd_1413_34655" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1413_34655" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_1413_34655" result="effect2_dropShadow_1413_34655" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_1413_34655" result="shape" />
      </filter>
    </defs>
  </svg>
);
Sorting.displayName = 'Sorting';
export default Sorting;
/* tslint:enable */
/* eslint-enable */
