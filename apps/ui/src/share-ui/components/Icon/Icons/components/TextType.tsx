/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface TextTypeProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const TextType: React.FC<TextTypeProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <g filter="url(#filter0_bd_1413_34659)">
      <path d="M20.4115 20.9734C21.5554 20.9734 22.4308 20.437 22.8381 19.4811H22.8915V20.3031C22.8987 20.7333 23.1727 20.9789 23.5562 20.9789C23.9535 20.9789 24.2275 20.7205 24.2275 20.2795V14.0108C24.2275 13.5741 23.9535 13.3005 23.5562 13.3005C23.1667 13.3005 22.8915 13.5741 22.8915 14.0096V14.8249H22.8381C22.4296 13.8855 21.5201 13.3211 20.4115 13.3211C18.5534 13.3211 17.3317 14.8459 17.3317 17.1463C17.3317 19.4639 18.5534 20.9734 20.4115 20.9734ZM20.7951 19.8065C19.5459 19.8065 18.759 18.7863 18.759 17.15C18.759 15.5161 19.5471 14.4868 20.7951 14.4868C22.0406 14.4868 22.8556 15.5447 22.8556 17.161C22.8556 18.7797 22.0529 19.8065 20.7951 19.8065ZM8.74089 20.9349C9.19102 20.9349 9.42298 20.7528 9.56829 20.2778L10.314 18.1959H14.1383L14.8853 20.2778C15.0294 20.7528 15.2613 20.9349 15.7072 20.9349C16.1766 20.9349 16.479 20.6531 16.479 20.2159C16.479 20.055 16.4529 19.9154 16.3873 19.735L13.4226 11.7291C13.2204 11.1675 12.841 10.8912 12.2316 10.8912C11.6501 10.8912 11.2676 11.1632 11.0697 11.7236L8.08933 19.7694C8.02732 19.9413 8 20.087 8 20.2298C8 20.6659 8.28299 20.9349 8.74089 20.9349ZM10.6976 16.9515L12.2127 12.6003H12.251L13.765 16.9515H10.6976Z"
        fill="#fff" />
    </g>
    <defs>
      <filter id="filter0_bd_1413_34659" x="-10" y="-10" width="52" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1413_34659" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_1413_34659" result="effect2_dropShadow_1413_34659" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_1413_34659" result="shape" />
      </filter>
    </defs>
  </svg>
);
TextType.displayName = 'TextType';
export default TextType;
/* tslint:enable */
/* eslint-enable */
