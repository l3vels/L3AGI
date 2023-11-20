/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface WebProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Web: React.FC<WebProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_718_13599)">
      <path d="M23.2462 24.375C22.9619 26.7357 22.4509 28.7675 21.7867 30.2288C21.4752 30.913 21.1366 31.4634 20.7639 31.8361C20.518 32.082 20.273 32.25 20 32.25C19.727 32.25 19.482 32.082 19.2361 31.8361C18.8634 31.4634 18.5248 30.913 18.2133 30.2288C17.5491 28.7675 17.0381 26.7357 16.7537 24.375H23.2462ZM17.116 8.09213C11.7444 9.38975 7.75 14.232 7.75 20C7.75 25.768 11.7444 30.6102 17.116 31.9079C16.1421 30.2664 15.3712 27.5889 14.9976 24.375H12.125C11.642 24.375 11.25 23.983 11.25 23.5C11.25 23.017 11.642 22.625 12.125 22.625H14.8375C14.7798 21.7762 14.75 20.8978 14.75 20C14.75 19.1022 14.7798 18.2238 14.8375 17.375H12.125C11.642 17.375 11.25 16.983 11.25 16.5C11.25 16.017 11.642 15.625 12.125 15.625H14.9976C15.3712 12.4111 16.1421 9.73363 17.116 8.09213V8.09213ZM22.884 8.09213C23.8579 9.73363 24.6287 12.4111 25.0024 15.625H27.875C28.358 15.625 28.75 16.017 28.75 16.5C28.75 16.983 28.358 17.375 27.875 17.375H25.1625C25.2202 18.2238 25.25 19.1022 25.25 20C25.25 20.8978 25.2202 21.7762 25.1625 22.625H27.875C28.358 22.625 28.75 23.017 28.75 23.5C28.75 23.983 28.358 24.375 27.875 24.375H25.0024C24.6287 27.5889 23.8579 30.2664 22.884 31.9079C28.2556 30.6102 32.25 25.768 32.25 20C32.25 14.232 28.2556 9.38975 22.884 8.09213V8.09213ZM23.4108 17.375C23.4694 18.222 23.5 19.1005 23.5 20C23.5 20.8995 23.4694 21.778 23.4108 22.625H16.5893C16.5306 21.778 16.5 20.8995 16.5 20C16.5 19.1005 16.5306 18.222 16.5893 17.375H23.4108V17.375ZM16.7537 15.625C17.0381 13.2643 17.5491 11.2325 18.2133 9.77125C18.5248 9.087 18.8634 8.53663 19.2361 8.16388C19.482 7.918 19.727 7.75 20 7.75C20.273 7.75 20.518 7.918 20.7639 8.16388C21.1366 8.53663 21.4752 9.087 21.7867 9.77125C22.4509 11.2325 22.9619 13.2643 23.2462 15.625H16.7537V15.625Z"
        fill="#fff" fillRule="evenodd" clipRule="evenodd" />
    </g>
    <defs>
      <filter id="filter0_bd_718_13599" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_718_13599" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_718_13599" result="effect2_dropShadow_718_13599" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_718_13599" result="shape" />
      </filter>
    </defs>
  </svg>
);
Web.displayName = 'Web';
export default Web;
/* tslint:enable */
/* eslint-enable */
