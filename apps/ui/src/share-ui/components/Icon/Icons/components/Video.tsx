/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface VideoProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Video: React.FC<VideoProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_761_16753)">
      <path d="M19.3158 13L19.8965 12.803C20.9443 12.4475 21.4682 12.2697 21.8852 12.3763C22.2503 12.4696 22.5664 12.7015 22.7688 13.0245C23 13.3935 23 13.9556 23 15.0798V15.9202C23 17.0444 23 17.6065 22.7688 17.9755C22.5664 18.2985 22.2503 18.5304 21.8852 18.6237C21.4682 18.7303 20.9443 18.5525 19.8965 18.197L19.3158 18M11.3579 20H16.9579C17.7832 20 18.1959 20 18.5111 19.8365C18.7884 19.6927 19.0139 19.4632 19.1552 19.181C19.3158 18.8601 19.3158 18.4401 19.3158 17.6V13.4C19.3158 12.5599 19.3158 12.1399 19.1552 11.819C19.0139 11.5368 18.7884 11.3073 18.5111 11.1635C18.1959 11 17.7832 11 16.9579 11H11.3579C10.5326 11 10.1199 11 9.80465 11.1635C9.52735 11.3073 9.30191 11.5368 9.16062 11.819C9 12.1399 9 12.5599 9 13.4V17.6C9 18.4401 9 18.8601 9.16062 19.181C9.30191 19.4632 9.52735 19.6927 9.80465 19.8365C10.1199 20 10.5326 20 11.3579 20Z"
        stroke="#fff" strokeLinecap="round" />
    </g>
    <defs>
      <filter id="filter0_bd_761_16753" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_761_16753" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_761_16753" result="effect2_dropShadow_761_16753" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_761_16753" result="shape" />
      </filter>
    </defs>
  </svg>
);
Video.displayName = 'Video';
export default Video;
/* tslint:enable */
/* eslint-enable */
