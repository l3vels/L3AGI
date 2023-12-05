/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface ImageProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Image: React.FC<ImageProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_761_16750)">
      <path d="M9 14.7273L16.8227 22.55C17.0713 22.7985 17.4742 22.7985 17.7227 22.55L23 17.2727M12.8182 17.9091L15.55 15.1772C15.7985 14.9287 16.2015 14.9287 16.45 15.1772L20.4545 19.1818M19.5794 11.9431H20.0567M19.5794 12.4204H20.0567M14.0909 23H17.9091C19.6911 23 20.5821 23 21.2627 22.6532C21.8614 22.3482 22.3482 21.8614 22.6532 21.2627C23 20.5821 23 19.6911 23 17.9091V14.0909C23 12.3089 23 11.4179 22.6532 10.7373C22.3482 10.1386 21.8614 9.65185 21.2627 9.3468C20.5821 9 19.6911 9 17.9091 9H14.0909C12.3089 9 11.4179 9 10.7373 9.3468C10.1386 9.65185 9.65185 10.1386 9.3468 10.7373C9 11.4179 9 12.3089 9 14.0909V17.9091C9 19.6911 9 20.5821 9.3468 21.2627C9.65185 21.8614 10.1386 22.3482 10.7373 22.6532C11.4179 23 12.3089 23 14.0909 23ZM20.4545 12.1818C20.4545 12.5333 20.1696 12.8182 19.8182 12.8182C19.4667 12.8182 19.1818 12.5333 19.1818 12.1818C19.1818 11.8304 19.4667 11.5455 19.8182 11.5455C20.1696 11.5455 20.4545 11.8304 20.4545 12.1818Z"
        stroke="#fff" strokeLinecap="round" />
    </g>
    <defs>
      <filter id="filter0_bd_761_16750" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_761_16750" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_761_16750" result="effect2_dropShadow_761_16750" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_761_16750" result="shape" />
      </filter>
    </defs>
  </svg>
);
Image.displayName = 'Image';
export default Image;
/* tslint:enable */
/* eslint-enable */
