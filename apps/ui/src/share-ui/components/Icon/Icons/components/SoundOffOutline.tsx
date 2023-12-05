/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface SoundOffOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const SoundOffOutline: React.FC<SoundOffOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_718_13954)">
      <path d="M15.5973 25.4704H18.9194C19.0143 25.4704 19.0996 25.4992 19.1774 25.5695L24.3234 30.1773C24.9344 30.7213 25.4017 30.9747 26.0191 30.9747C26.882 30.9747 27.5289 30.3395 27.5289 29.4744V11.5717C27.5289 10.7066 26.882 10.0117 25.9998 10.0117C25.393 10.0117 24.9866 10.2801 24.3234 10.8688L19.1774 15.4361C19.0975 15.5043 19.0143 15.5352 18.9194 15.5352H15.5973C13.8791 15.5352 13 16.4366 13 18.2561V22.7612C13 24.5786 13.8791 25.4704 15.5973 25.4704ZM15.7954 23.4072C15.3965 23.4072 15.2099 23.2185 15.2099 22.8313V18.1839C15.2099 17.7892 15.3965 17.6005 15.7954 17.6005H19.4589C19.7783 17.6005 20.0094 17.5356 20.279 17.2895L24.9695 13.018C25.026 12.9615 25.0942 12.9306 25.1624 12.9306C25.2487 12.9306 25.319 12.9913 25.319 13.0989V27.88C25.319 27.9876 25.2487 28.0621 25.1624 28.0621C25.1038 28.0621 25.0356 28.027 24.9791 27.9705L20.279 23.7182C20.0094 23.4796 19.7783 23.4072 19.4589 23.4072H15.7954Z"
        fill="#fff" />
    </g>
    <defs>
      <filter id="filter0_bd_718_13954" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_718_13954" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_718_13954" result="effect2_dropShadow_718_13954" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_718_13954" result="shape" />
      </filter>
    </defs>
  </svg>
);
SoundOffOutline.displayName = 'SoundOffOutline';
export default SoundOffOutline;
/* tslint:enable */
/* eslint-enable */
