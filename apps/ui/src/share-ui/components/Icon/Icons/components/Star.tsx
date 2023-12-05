/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface StarProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Star: React.FC<StarProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_1992_20865)">
      <path d="M16.4969 11.7826L15.7417 14.107C15.5208 14.7869 14.8873 15.2472 14.1725 15.2472H11.7284L13.7057 16.6837C14.284 17.1039 14.526 17.8487 14.3051 18.5285L13.5498 20.8529L15.5271 19.4163C16.1054 18.9962 16.8885 18.9962 17.4668 19.4163L19.4441 20.8529L18.6888 18.5285C18.4679 17.8487 18.7099 17.1039 19.2882 16.6837L21.2655 15.2472H18.8214C18.1066 15.2472 17.4731 14.7869 17.2522 14.107L16.4969 11.7826ZM17.1151 10.4491C16.9206 9.85029 16.0733 9.85029 15.8788 10.4491L14.7906 13.798C14.7036 14.0658 14.4541 14.2472 14.1725 14.2472H10.6512C10.0216 14.2472 9.75977 15.0529 10.2692 15.423L13.1179 17.4928C13.3457 17.6583 13.4411 17.9517 13.354 18.2195L12.2659 21.5684C12.0713 22.1672 12.7568 22.6652 13.2662 22.2951L16.1149 20.2254C16.3427 20.0598 16.6512 20.0598 16.879 20.2254L19.7277 22.2951C20.2371 22.6652 20.9226 22.1672 20.728 21.5684L19.6399 18.2195C19.5528 17.9517 19.6482 17.6583 19.876 17.4928L22.7247 15.423C23.2341 15.0529 22.9723 14.2472 22.3427 14.2472H18.8214C18.5398 14.2472 18.2903 14.0658 18.2032 13.798L17.1151 10.4491Z"
        fill="#fff" fillRule="evenodd" clipRule="evenodd" />
    </g>
    <defs>
      <filter id="filter0_bd_1992_20865" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1992_20865" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_1992_20865" result="effect2_dropShadow_1992_20865" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_1992_20865" result="shape" />
      </filter>
    </defs>
  </svg>
);
Star.displayName = 'Star';
export default Star;
/* tslint:enable */
/* eslint-enable */
