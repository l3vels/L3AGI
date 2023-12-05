/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface SendOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const SendOutline: React.FC<SendOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_719_20074)">
      <path d="M19 20.5962L23.5962 16M30.7934 8.03563L8.69135 14.2696C8.50541 14.322 8.33991 14.43 8.21696 14.579C8.09402 14.728 8.01948 14.911 8.00333 15.1035C7.98717 15.296 8.03016 15.4889 8.12654 15.6563C8.22293 15.8238 8.36812 15.9578 8.54272 16.0405L18.6978 20.8508C18.8959 20.9446 19.0554 21.1041 19.1492 21.3022L23.9595 31.4573C24.0422 31.6319 24.1762 31.7771 24.3437 31.8735C24.5111 31.9698 24.704 32.0128 24.8965 31.9967C25.089 31.9805 25.272 31.906 25.421 31.783C25.57 31.6601 25.678 31.4946 25.7304 31.3086L31.9644 9.20656C32.0102 9.04421 32.0118 8.87258 31.9693 8.70936C31.9267 8.54614 31.8413 8.39722 31.7221 8.27794C31.6028 8.15866 31.4539 8.07333 31.2906 8.03074C31.1274 7.98815 30.9558 7.98984 30.7934 8.03563Z"
        stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <filter id="filter0_bd_719_20074" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_719_20074" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_719_20074" result="effect2_dropShadow_719_20074" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_719_20074" result="shape" />
      </filter>
    </defs>
  </svg>
);
SendOutline.displayName = 'SendOutline';
export default SendOutline;
/* tslint:enable */
/* eslint-enable */
