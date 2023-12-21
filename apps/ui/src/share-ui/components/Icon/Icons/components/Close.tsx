/* eslint-disable */
/* tslint:disable */
import * as React from 'react'
export interface CloseProps extends React.SVGAttributes<SVGElement> {
  size?: string | number
}
const Close: React.FC<CloseProps> = ({ size, ...props }) => (
  <svg
    viewBox='0 0 32 32'
    fill='currentColor'
    width={size || '32'}
    height={size || '32'}
    {...props}
  >
    <g filter='url(#filter0_bd_761_16730)'>
      <g clipPath='url(#clip0_761_16730)'>
        <path d='M23 9L9 23M23 23L9 9.00001' stroke='#fff' strokeLinecap='round' />
      </g>
    </g>
    <defs>
      <clipPath id='clip0_761_16730'>
        <path fill='#fff' transform='translate(8 8)' d='M0 0H16V16H0z' />
      </clipPath>
      <filter
        id='filter0_bd_761_16730'
        x='-10'
        y='-10'
        width='52'
        height='52'
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood result='BackgroundImageFix' floodOpacity='0' />
        <feGaussianBlur in='BackgroundImageFix' stdDeviation='5' />
        <feComposite in2='SourceAlpha' operator='in' result='effect1_backgroundBlur_761_16730' />
        <feColorMatrix
          in='SourceAlpha'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          result='hardAlpha'
        />
        <feOffset dy='1' />
        <feGaussianBlur stdDeviation='1.5' />
        <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0' />
        <feBlend in2='effect1_backgroundBlur_761_16730' result='effect2_dropShadow_761_16730' />
        <feBlend in='SourceGraphic' in2='effect2_dropShadow_761_16730' result='shape' />
      </filter>
    </defs>
  </svg>
)
Close.displayName = 'Close'
export default Close
/* tslint:enable */
/* eslint-enable */
