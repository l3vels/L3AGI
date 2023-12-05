/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface ShareProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Share: React.FC<ShareProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_761_16773)">
      <g filter="url(#filter1_bd_761_16773)">
        <path d="M21.7102 15.8971C21.8708 15.7603 21.9512 15.6919 21.9806 15.6105C22.0065 15.5391 22.0065 15.4609 21.9806 15.3895C21.9512 15.3081 21.8708 15.2397 21.7102 15.1029L16.1348 10.3562C15.8582 10.1207 15.7199 10.003 15.6028 10.0001C15.5011 9.99759 15.4039 10.042 15.3395 10.1204C15.2656 10.2105 15.2656 10.3915 15.2656 10.7533V13.5614C13.8605 13.8055 12.5746 14.5127 11.619 15.5744C10.5771 16.732 10.0008 18.2301 10 19.7827V20.1828C10.6907 19.3564 11.553 18.6881 12.528 18.2235C13.3875 17.8139 14.3167 17.5713 15.2656 17.5074V20.2467C15.2656 20.6085 15.2656 20.7895 15.3395 20.8796C15.4039 20.958 15.5011 21.0024 15.6028 20.9999C15.7199 20.997 15.8582 20.8793 16.1348 20.6438L21.7102 15.8971Z"
          stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
    <defs>
      <filter id="filter0_bd_761_16773" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_761_16773" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_761_16773" result="effect2_dropShadow_761_16773" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_761_16773" result="shape" />
      </filter>
      <filter id="filter1_bd_761_16773" x="-2" y="-2" width="36" height="36" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_761_16773" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_761_16773" result="effect2_dropShadow_761_16773" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_761_16773" result="shape" />
      </filter>
    </defs>
  </svg>
);
Share.displayName = 'Share';
export default Share;
/* tslint:enable */
/* eslint-enable */
