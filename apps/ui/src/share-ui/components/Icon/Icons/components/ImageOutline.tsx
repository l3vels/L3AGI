/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface ImageOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const ImageOutline: React.FC<ImageOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_719_20022)">
      <path d="M32.5355 26.411L25.5935 19.8973C25.0683 19.4285 24.4589 19.177 23.8324 19.177C23.19 19.177 22.6137 19.3976 22.0788 19.8759L16.7862 24.6061L14.6245 22.6554C14.1323 22.2122 13.5912 21.9895 13.0425 21.9895C12.5004 21.9895 12.0251 22.2005 11.5329 22.6437L7.11023 26.6074C7.16788 28.7665 8.17217 29.8931 10.1123 29.8931H29.1117C31.4627 29.8931 32.6346 28.68 32.5355 26.411ZM15.0785 20.1537C16.6134 20.1537 17.8788 18.8883 17.8788 17.3395C17.8788 15.8046 16.6134 14.5275 15.0785 14.5275C13.5297 14.5275 12.2644 15.8046 12.2644 17.3395C12.2644 18.8883 13.5297 20.1537 15.0785 20.1537ZM9.84421 30.878H29.9109C32.4499 30.878 33.7552 29.5823 33.7552 27.0818V12.81C33.7552 10.3073 32.4499 9.00421 29.9109 9.00421H9.84421C7.31484 9.00421 6 10.3073 6 12.81V27.0818C6 29.5823 7.31484 30.878 9.84421 30.878ZM9.97733 28.582C8.88772 28.582 8.29592 28.0179 8.29592 26.8793V13.0104C8.29592 11.8718 8.88772 11.3001 9.97733 11.3001H29.7778C30.8578 11.3001 31.4592 11.8718 31.4592 13.0104V26.8793C31.4592 28.0179 30.8578 28.582 29.7778 28.582H9.97733Z"
        fill="#fff" />
    </g>
    <defs>
      <filter id="filter0_bd_719_20022" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_719_20022" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_719_20022" result="effect2_dropShadow_719_20022" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_719_20022" result="shape" />
      </filter>
    </defs>
  </svg>
);
ImageOutline.displayName = 'ImageOutline';
export default ImageOutline;
/* tslint:enable */
/* eslint-enable */
