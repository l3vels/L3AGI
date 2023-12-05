/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface MentionProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Mention: React.FC<MentionProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_1413_34661)">
      <path d="M18.5003 15.9998C18.5003 17.3805 17.3811 18.4998 16.0003 18.4998C14.6196 18.4998 13.5003 17.3805 13.5003 15.9998C13.5003 14.6191 14.6196 13.4998 16.0003 13.4998C17.3811 13.4998 18.5003 14.6191 18.5003 15.9998ZM18.5003 15.9998C18.5003 17.3805 19 18.4998 20.25 18.4998C21.5 18.4998 22 17.3805 22 15.9998C21.9999 14.6629 21.5534 13.3643 20.7312 12.3101C19.909 11.2559 18.7583 10.5064 17.4617 10.1806C16.1651 9.85486 14.7968 9.97142 13.574 10.5118C12.3512 11.0522 11.3439 11.9855 10.7119 13.1636C10.0799 14.3417 9.85938 15.6971 10.0854 17.0148C10.3114 18.3324 10.971 19.5369 11.9595 20.437C12.948 21.3371 14.2088 21.8813 15.5418 21.9833C16.8748 22.0853 18.2037 21.7392 19.3176 20.9999M18.5003 15.9998L18.5 13.4998"
        stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <filter id="filter0_bd_1413_34661" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1413_34661" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_1413_34661" result="effect2_dropShadow_1413_34661" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_1413_34661" result="shape" />
      </filter>
    </defs>
  </svg>
);
Mention.displayName = 'Mention';
export default Mention;
/* tslint:enable */
/* eslint-enable */
