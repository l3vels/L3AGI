/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface LinkProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Link: React.FC<LinkProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_761_16572)">
      <path d="M16.0655 12.9578L15.0483 13.9836C15.8515 14.0584 16.4201 14.3148 16.8277 14.7223C17.967 15.8604 17.9627 17.4657 16.8368 18.5916L14.6109 20.8108C13.4783 21.9423 11.8852 21.9466 10.7483 20.8139C9.60893 19.6703 9.61321 18.0772 10.7446 16.9446L11.8944 15.796C11.6804 15.3127 11.6106 14.714 11.7289 14.198L9.80473 16.1118C8.1621 17.7539 8.15594 20.0886 9.81143 21.744C11.4736 23.4075 13.8046 23.3964 15.4436 21.7575L17.7724 19.4244C19.4169 17.7799 19.4267 15.4477 17.7645 13.7922C17.3728 13.3992 16.8431 13.1003 16.0655 12.9578ZM15.4762 18.601L16.4934 17.5752C15.6902 17.5059 15.1216 17.2452 14.714 16.8377C13.5759 15.6984 13.579 14.0943 14.7061 12.9684L16.9265 10.7492C18.0635 9.61655 19.6565 9.61226 20.7947 10.7504C21.9328 11.8885 21.923 13.4883 20.7971 14.6142L19.6485 15.7628C19.8613 16.2528 19.9256 16.8448 19.814 17.362L21.7381 15.447C23.3796 13.8049 23.3869 11.4757 21.7315 9.81477C20.0681 8.15258 17.7371 8.16357 16.0925 9.80807L13.7705 12.1344C12.126 13.7789 12.1162 16.1111 13.7772 17.7666C14.1701 18.1596 14.6986 18.4585 15.4762 18.601Z"
        fill="#fff" />
    </g>
    <defs>
      <filter id="filter0_bd_761_16572" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_761_16572" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_761_16572" result="effect2_dropShadow_761_16572" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_761_16572" result="shape" />
      </filter>
    </defs>
  </svg>
);
Link.displayName = 'Link';
export default Link;
/* tslint:enable */
/* eslint-enable */
