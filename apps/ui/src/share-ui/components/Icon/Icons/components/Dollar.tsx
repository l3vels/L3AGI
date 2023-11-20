/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface DollarProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Dollar: React.FC<DollarProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_1410_36278)">
      <path d="M15.7701 22.0991C18.1854 22.0991 20.1235 20.8651 20.1235 18.677C20.1235 16.9724 19.0401 15.9892 16.657 15.4272L15.3847 15.1319C13.9312 14.7927 13.2499 14.2278 13.2499 13.3079C13.2499 12.3313 14.1765 11.5189 15.7731 11.5189C17.0713 11.5189 17.9523 12.1106 18.3193 13.1936C18.4795 13.5864 18.7506 13.784 19.1408 13.784C19.6191 13.784 19.8955 13.4958 19.8955 13.052C19.8955 12.9244 19.8773 12.7924 19.8366 12.6562C19.4264 11.1564 17.8546 10.1143 15.7634 10.1143C13.3463 10.1143 11.6114 11.4509 11.6114 13.4305C11.6114 15.0819 12.6994 16.0851 14.9596 16.6203L16.2319 16.9156C17.8511 17.2981 18.4886 17.8077 18.4886 18.8213C18.4886 20.0113 17.48 20.6945 15.7908 20.6945C14.2825 20.6945 13.3239 20.0772 13.0085 18.954C12.8561 18.5605 12.5966 18.3495 12.1991 18.3495C11.7094 18.3495 11.4287 18.6601 11.4287 19.1263C11.4287 19.2424 11.4481 19.378 11.4949 19.5202C11.9192 21.0853 13.6238 22.0991 15.7701 22.0991ZM15.7644 23.6732C16.0372 23.6732 16.2468 23.4612 16.2468 23.1848V9.05436C16.2468 8.77793 16.0372 8.57141 15.7644 8.57141C15.4916 8.57141 15.2875 8.77793 15.2875 9.05436V23.1848C15.2875 23.4612 15.4916 23.6732 15.7644 23.6732Z"
        fill="#fff" />
    </g>
    <defs>
      <filter id="filter0_bd_1410_36278" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1410_36278" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_1410_36278" result="effect2_dropShadow_1410_36278" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_1410_36278" result="shape" />
      </filter>
    </defs>
  </svg>
);
Dollar.displayName = 'Dollar';
export default Dollar;
/* tslint:enable */
/* eslint-enable */
