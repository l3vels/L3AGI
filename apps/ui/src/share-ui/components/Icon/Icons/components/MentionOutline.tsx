/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface MentionOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const MentionOutline: React.FC<MentionOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_1413_34451)" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 24.3746C22.4162 24.3746 24.375 22.4158 24.375 19.9996C24.375 17.5833 22.4162 15.6246 20 15.6246C17.5838 15.6246 15.625 17.5833 15.625 19.9996C15.625 22.4158 17.5838 24.3746 20 24.3746Z"
      />
      <path d="M25.8056 28.7497C23.8563 30.0435 21.5307 30.6492 19.1979 30.4707C16.8652 30.2922 14.6588 29.3398 12.9289 27.7647C11.1991 26.1895 10.0448 24.0817 9.64923 21.7758C9.25368 19.4699 9.63952 17.0979 10.7455 15.0363C11.8515 12.9746 13.6144 11.3413 15.7543 10.3956C17.8942 9.44993 20.2887 9.24595 22.5578 9.81605C24.8268 10.3862 26.8405 11.6977 28.2793 13.5425C29.7181 15.3874 30.4996 17.6599 30.4998 19.9995C30.4998 22.4158 29.6248 24.3745 27.4373 24.3745C25.2498 24.3745 24.3748 22.4158 24.3748 19.9995V15.6245"
      />
    </g>
    <defs>
      <filter id="filter0_bd_1413_34451" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1413_34451" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_1413_34451" result="effect2_dropShadow_1413_34451" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_1413_34451" result="shape" />
      </filter>
    </defs>
  </svg>
);
MentionOutline.displayName = 'MentionOutline';
export default MentionOutline;
/* tslint:enable */
/* eslint-enable */
