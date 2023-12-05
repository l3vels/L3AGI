/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface SoundOffProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const SoundOff: React.FC<SoundOffProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_761_16762)">
      <path d="M13.4842 18.8335H15.3825C15.4367 18.8335 15.4855 18.85 15.53 18.8902L18.4705 21.5232C18.8197 21.834 19.0867 21.9788 19.4395 21.9788C19.9326 21.9788 20.3022 21.6159 20.3022 21.1215V10.8914C20.3022 10.3971 19.9326 10 19.4285 10C19.0817 10 18.8495 10.1533 18.4705 10.4898L15.53 13.0996C15.4843 13.1386 15.4367 13.1563 15.3825 13.1563H13.4842C12.5024 13.1563 12 13.6714 12 14.7111V17.2854C12 18.3239 12.5024 18.8335 13.4842 18.8335ZM13.5974 17.6546C13.3694 17.6546 13.2628 17.5467 13.2628 17.3255V14.6698C13.2628 14.4443 13.3694 14.3365 13.5974 14.3365H15.6908C15.8733 14.3365 16.0054 14.2994 16.1594 14.1587L18.8397 11.7179C18.872 11.6856 18.911 11.6679 18.9499 11.6679C18.9993 11.6679 19.0394 11.7026 19.0394 11.7641V20.2104C19.0394 20.2719 18.9993 20.3145 18.9499 20.3145C18.9165 20.3145 18.8775 20.2944 18.8452 20.2622L16.1594 17.8323C16.0054 17.6959 15.8733 17.6546 15.6908 17.6546H13.5974Z"
        fill="#fff" />
    </g>
    <defs>
      <filter id="filter0_bd_761_16762" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_761_16762" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_761_16762" result="effect2_dropShadow_761_16762" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_761_16762" result="shape" />
      </filter>
    </defs>
  </svg>
);
SoundOff.displayName = 'SoundOff';
export default SoundOff;
/* tslint:enable */
/* eslint-enable */
