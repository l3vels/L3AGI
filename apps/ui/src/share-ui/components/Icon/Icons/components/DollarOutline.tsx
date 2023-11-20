/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface DollarOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const DollarOutline: React.FC<DollarOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_1410_36261)">
      <path d="M19.5975 30.6735C23.8242 30.6735 27.2158 28.514 27.2158 24.6848C27.2158 21.7017 25.32 19.9811 21.1495 18.9977L18.9229 18.4809C16.3793 17.8872 15.187 16.8986 15.187 15.2889C15.187 13.5798 16.8087 12.1581 19.6027 12.1581C21.8745 12.1581 23.4162 13.1936 24.0586 15.0887C24.3389 15.7762 24.8133 16.1221 25.4962 16.1221C26.3332 16.1221 26.8169 15.6177 26.8169 14.841C26.8169 14.6177 26.7851 14.3868 26.7138 14.1484C25.9959 11.5237 23.2453 9.7 19.5858 9.7C15.3558 9.7 12.3197 12.0391 12.3197 15.5033C12.3197 18.3934 14.2237 20.1489 18.1791 21.0855L20.4056 21.6023C23.2392 22.2717 24.3548 23.1635 24.3548 24.9374C24.3548 27.0199 22.5898 28.2154 19.6336 28.2154C16.9941 28.2154 15.3166 27.1352 14.7647 25.1695C14.4979 24.4809 14.0437 24.1117 13.3481 24.1117C12.4912 24.1117 12 24.6553 12 25.4711C12 25.6743 12.034 25.9115 12.1158 26.1604C12.8583 28.8993 15.8414 30.6735 19.5975 30.6735ZM19.5874 33.4281C20.0648 33.4281 20.4316 33.0571 20.4316 32.5734V7.84516C20.4316 7.36141 20.0648 7 19.5874 7C19.11 7 18.7528 7.36141 18.7528 7.84516V32.5734C18.7528 33.0571 19.11 33.4281 19.5874 33.4281Z"
        fill="#fff" />
    </g>
    <defs>
      <filter id="filter0_bd_1410_36261" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1410_36261" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_1410_36261" result="effect2_dropShadow_1410_36261" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_1410_36261" result="shape" />
      </filter>
    </defs>
  </svg>
);
DollarOutline.displayName = 'DollarOutline';
export default DollarOutline;
/* tslint:enable */
/* eslint-enable */
