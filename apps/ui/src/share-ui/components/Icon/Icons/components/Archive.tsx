/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface ArchiveProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Archive: React.FC<ArchiveProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_5378_46297)">
      <path d="M9.77778 12.5L10.4367 21.3953C10.5039 22.3023 11.1778 23 11.9869 23H20.0131C20.8222 23 21.4961 22.3023 21.5633 21.3953L22.2222 12.5M16 15V18.8143M18 17.2289L16.2357 18.9071C16.1055 19.031 15.8945 19.031 15.7643 18.9071L14 17.2289M10.2444 12.5H21.7556C22.1912 12.5 22.409 12.5 22.5753 12.4046C22.7217 12.3207 22.8407 12.1869 22.9152 12.0222C23 11.8351 23 11.59 23 11.1V10.4C23 9.90995 23 9.66493 22.9152 9.47776C22.8407 9.31312 22.7217 9.17926 22.5753 9.09537C22.409 9 22.1912 9 21.7556 9H10.2444C9.80885 9 9.59105 9 9.42467 9.09537C9.27833 9.17926 9.15934 9.31312 9.08477 9.47776C9 9.66493 9 9.90995 9 10.4V11.1C9 11.59 9 11.8351 9.08477 12.0222C9.15934 12.1869 9.27833 12.3207 9.42467 12.4046C9.59105 12.5 9.80885 12.5 10.2444 12.5Z"
        stroke="#fff" strokeLinecap="round" />
    </g>
    <defs>
      <filter id="filter0_bd_5378_46297" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_5378_46297" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_5378_46297" result="effect2_dropShadow_5378_46297" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_5378_46297" result="shape" />
      </filter>
    </defs>
  </svg>
);
Archive.displayName = 'Archive';
export default Archive;
/* tslint:enable */
/* eslint-enable */
