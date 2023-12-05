/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface TwiterProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Twiter: React.FC<TwiterProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_718_13598)">
      <path d="M7 29.2659C9.98109 29.4899 12.5791 28.7155 14.972 26.7523C13.7508 26.5955 12.6868 26.2547 11.7889 25.4947C10.9149 24.7491 10.2445 23.8194 9.88531 22.549H12.1002C12.1121 22.4962 12.1241 22.4434 12.1361 22.3778C10.9149 21.9986 9.87334 21.317 9.09514 20.2306C8.31695 19.1586 7.93533 17.9137 7.89792 16.5505C8.67611 16.7873 9.41839 17.0225 10.1726 17.2449C10.1966 17.1921 10.2325 17.1409 10.2564 17.0881C9.17895 16.1185 8.40075 14.9537 8.11491 13.4481C7.81987 11.9796 8.0275 10.4466 8.70006 9.12798C11.6931 12.9504 15.4509 15.0721 20.0707 15.4257C19.927 14.1809 19.9151 13.0289 20.3101 11.9024C21.675 7.96156 26.2708 6.70394 29.1307 9.53279C29.4539 9.84639 29.7293 9.8992 30.0765 9.76799C31.0223 9.40159 31.9546 9.00958 32.9244 8.61597C32.5532 9.912 31.7511 10.8688 30.8068 11.7984C31.7272 11.536 32.649 11.2608 33.5589 10.9984C33.5948 11.0384 33.6307 11.064 33.6667 11.104C32.9723 11.8896 32.3018 12.7152 31.5491 13.4225C31.142 13.8017 31.0103 14.1553 30.9864 14.7313C30.7709 21.1474 28.3645 26.3315 23.2418 29.5939C18.0234 32.906 12.6509 32.7092 7.36066 29.5539C7.26489 29.4899 7.18108 29.4099 7.0015 29.2659H7Z"
        fill="#fff" />
    </g>
    <defs>
      <filter id="filter0_bd_718_13598" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_718_13598" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_718_13598" result="effect2_dropShadow_718_13598" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_718_13598" result="shape" />
      </filter>
    </defs>
  </svg>
);
Twiter.displayName = 'Twiter';
export default Twiter;
/* tslint:enable */
/* eslint-enable */
