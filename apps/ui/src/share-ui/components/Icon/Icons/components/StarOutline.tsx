/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface StarOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const StarOutline: React.FC<StarOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_1992_20857)">
      <path d="M20.4998 10.4721L18.9893 15.1209C18.5475 16.4806 17.2805 17.4012 15.8508 17.4012H10.9627L14.9173 20.2743C16.0739 21.1147 16.5578 22.6042 16.1161 23.9638L14.6056 28.6127L18.5601 25.7395C19.7167 24.8992 21.2829 24.8992 22.4395 25.7395L26.394 28.6127L24.8835 23.9638C24.4417 22.6042 24.9257 21.1147 26.0823 20.2743L30.0369 17.4012H25.1488C23.7191 17.4012 22.4521 16.4806 22.0103 15.1209L20.4998 10.4721ZM21.7362 7.80514C21.347 6.60743 19.6526 6.60744 19.2634 7.80514L17.0872 14.5029C16.9131 15.0385 16.414 15.4012 15.8508 15.4012H8.80835C7.54901 15.4012 7.0254 17.0127 8.04423 17.7529L13.7417 21.8924C14.1973 22.2234 14.388 22.8102 14.214 23.3458L12.0377 30.0436C11.6486 31.2413 13.0194 32.2373 14.0382 31.497L19.7357 27.3576C20.1913 27.0265 20.8083 27.0265 21.2639 27.3576L26.9614 31.497C27.9802 32.2373 29.351 31.2413 28.9619 30.0436L26.7856 23.3458C26.6116 22.8102 26.8023 22.2234 27.2579 21.8924L32.9554 17.7529C33.9742 17.0127 33.4506 15.4012 32.1912 15.4012H25.1488C24.5856 15.4012 24.0864 15.0385 23.9124 14.5029L21.7362 7.80514Z"
        fill="#fff" fillRule="evenodd" clipRule="evenodd" />
    </g>
    <defs>
      <filter id="filter0_bd_1992_20857" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1992_20857" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_1992_20857" result="effect2_dropShadow_1992_20857" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_1992_20857" result="shape" />
      </filter>
    </defs>
  </svg>
);
StarOutline.displayName = 'StarOutline';
export default StarOutline;
/* tslint:enable */
/* eslint-enable */
