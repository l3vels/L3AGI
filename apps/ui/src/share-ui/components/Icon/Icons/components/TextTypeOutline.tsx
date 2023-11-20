/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface TextTypeOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const TextTypeOutline: React.FC<TextTypeOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_1413_34449)">
      <path d="M27.7202 28.7035C29.722 28.7035 31.2539 27.7648 31.9666 26.0921H32.0601V27.5305C32.0728 28.2833 32.5523 28.7131 33.2233 28.7131C33.9187 28.7131 34.3982 28.261 34.3982 27.4892V16.519C34.3982 15.7548 33.9187 15.2759 33.2233 15.2759C32.5418 15.2759 32.0601 15.7548 32.0601 16.5169V17.9436H31.9666C31.2518 16.2997 29.6601 15.312 27.7202 15.312C24.4685 15.312 22.3305 17.9804 22.3305 22.0062C22.3305 26.0619 24.4685 28.7035 27.7202 28.7035ZM28.3915 26.6614C26.2054 26.6614 24.8282 24.8762 24.8282 22.0126C24.8282 19.1532 26.2075 17.352 28.3915 17.352C30.5711 17.352 31.9973 19.2033 31.9973 22.0318C31.9973 24.8645 30.5925 26.6614 28.3915 26.6614ZM7.29655 28.6362C8.08428 28.6362 8.49021 28.3175 8.74451 27.4862L10.0495 23.843H16.7421L18.0492 27.4862C18.3014 28.3175 18.7073 28.6362 19.4876 28.6362C20.309 28.6362 20.8383 28.1431 20.8383 27.3779C20.8383 27.0964 20.7926 26.852 20.6777 26.5363L15.4896 12.526C15.1357 11.5433 14.4717 11.0598 13.4053 11.0598C12.3877 11.0598 11.7183 11.5358 11.3719 12.5164L6.15633 26.5965C6.04781 26.8974 6 27.1524 6 27.4023C6 28.1654 6.49523 28.6362 7.29655 28.6362ZM10.7208 21.6652L13.3723 14.0506H13.4393L16.0887 21.6652H10.7208Z"
        fill="#fff" />
    </g>
    <defs>
      <filter id="filter0_bd_1413_34449" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1413_34449" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_1413_34449" result="effect2_dropShadow_1413_34449" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_1413_34449" result="shape" />
      </filter>
    </defs>
  </svg>
);
TextTypeOutline.displayName = 'TextTypeOutline';
export default TextTypeOutline;
/* tslint:enable */
/* eslint-enable */
