/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface HistoryProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const History: React.FC<HistoryProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_5460_34023)">
      <path d="M12.2303 21.2252C15.1438 23.7977 19.6111 23.5437 22.2082 20.6579C24.8054 17.7721 24.5489 13.3472 21.6354 10.7748C18.7219 8.20229 14.2547 8.45629 11.6575 11.3421C10.4531 12.6804 9.86241 14.3496 9.86577 16.0116M8 15.4062L9.75845 16.9588C10.0822 17.2446 10.5785 17.2164 10.8671 16.8958L12.4346 15.154M16.9329 12.8889V16.5272C16.9329 16.6554 16.9966 16.7754 17.1033 16.8479L19.2886 18.3333"
        stroke="#fff" strokeLinecap="round" />
    </g>
    <defs>
      <filter id="filter0_bd_5460_34023" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_5460_34023" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_5460_34023" result="effect2_dropShadow_5460_34023" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_5460_34023" result="shape" />
      </filter>
    </defs>
  </svg>
);
History.displayName = 'History';
export default History;
/* tslint:enable */
/* eslint-enable */
