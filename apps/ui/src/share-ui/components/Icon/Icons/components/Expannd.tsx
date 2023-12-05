/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface ExpanndProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Expannd: React.FC<ExpanndProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g filter="url(#filter0_bd_718_13649)">
      <path d="M10.0587 18.7648H16.5521C17.8887 18.7648 18.6645 17.9794 18.6645 16.6428V10.2329C18.6645 9.5096 18.1168 8.96164 17.386 8.96164C16.6531 8.96164 16.1171 9.49999 16.1171 10.2329V11.0738L16.3695 14.7587L13.6238 11.8733L10.2519 8.46827C10.0126 8.22147 9.6903 8.09491 9.35421 8.09491C8.56601 8.09491 8 8.63514 8 9.41584C8 9.76693 8.1425 10.0958 8.38719 10.3425L11.7751 13.7262L14.6605 16.4602L10.963 16.2174H10.0587C9.32587 16.2174 8.7779 16.7438 8.7779 17.4863C8.7779 18.2213 9.31626 18.7648 10.0587 18.7648ZM21.6029 30.6172C22.3358 30.6172 22.8718 30.0884 22.8718 29.3459V28.4014L22.6194 24.724L25.3651 27.6116L28.8043 31.0721C29.0415 31.321 29.3541 31.4455 29.702 31.4455C30.4805 31.4455 31.0466 30.9052 31.0466 30.1267C31.0466 29.7735 30.9137 29.4446 30.6669 29.1999L27.2138 25.7469L24.3167 23.0129L28.0259 23.2578H29.0358C29.7687 23.2578 30.3167 22.7314 30.3167 21.9985C30.3167 21.2539 29.7783 20.72 29.0358 20.72H22.4368C21.098 20.72 20.3244 21.4937 20.3244 22.8303V29.3459C20.3244 30.0788 20.8604 30.6172 21.6029 30.6172Z"
        fill="#fff" />
    </g>
    <defs>
      <filter id="filter0_bd_718_13649" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood result="BackgroundImageFix" floodOpacity="0" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_718_13649" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend in2="effect1_backgroundBlur_718_13649" result="effect2_dropShadow_718_13649" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_718_13649" result="shape" />
      </filter>
    </defs>
  </svg>
);
Expannd.displayName = 'Expannd';
export default Expannd;
/* tslint:enable */
/* eslint-enable */
