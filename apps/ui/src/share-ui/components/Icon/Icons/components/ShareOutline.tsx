/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface ShareOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const ShareOutline: React.FC<ShareOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_719_19255)">
      <path d="M20.7299 30.7959C21.3611 30.7959 21.8678 30.5426 22.4788 29.9709L31.7544 21.2552C32.2103 20.8249 32.3859 20.3248 32.3859 19.898C32.3859 19.4531 32.222 18.9731 31.7566 18.5332L22.4788 9.88476C21.805 9.25453 21.3719 9 20.7491 9C19.8276 9 19.1531 9.72258 19.1531 10.6153V14.8193H18.8617C10.7355 14.8193 7 20.0424 7 28.5591C7 29.9909 7.62062 30.7474 8.43062 30.7474C9.03038 30.7474 9.60952 30.5627 10.064 29.7157C11.9174 26.2528 14.5565 25.0052 18.8617 25.0052H19.1531V29.2308C19.1531 30.1235 19.8276 30.7959 20.7299 30.7959ZM21.4633 27.8166C21.3653 27.8166 21.2887 27.7399 21.2887 27.6281V23.2765C21.2887 23.0091 21.1736 22.894 20.9062 22.894H19.4012C14.0057 22.894 10.5751 24.623 9.16702 27.5433C9.13397 27.6232 9.10843 27.6563 9.05405 27.6563C9.00717 27.6563 8.97202 27.6211 8.97202 27.5337C9.17054 21.9645 11.7808 16.9116 19.4012 16.9116H20.9062C21.1736 16.9116 21.2887 16.7965 21.2887 16.529V12.0813C21.2887 11.9791 21.3653 11.9067 21.4729 11.9067C21.5411 11.9067 21.6093 11.9472 21.6679 11.9941L29.7037 19.6795C29.7857 19.7616 29.8188 19.8277 29.8188 19.898C29.8188 19.9662 29.7953 20.0248 29.7037 20.1164L21.6583 27.7132C21.5997 27.7814 21.5315 27.8166 21.4633 27.8166Z"
        fill="#fff" />
    </g>
    <defs>
      <filter id="filter0_bd_719_19255" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_719_19255" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_719_19255" result="effect2_dropShadow_719_19255" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_719_19255" result="shape" />
      </filter>
    </defs>
  </svg>
);
ShareOutline.displayName = 'ShareOutline';
export default ShareOutline;
/* tslint:enable */
/* eslint-enable */
