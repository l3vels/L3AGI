/* eslint-disable */
/* tslint:disable */
import * as React from 'react'
export interface FineTuningProps extends React.SVGAttributes<SVGElement> {
  size?: string | number
}
const FineTuning: React.FC<FineTuningProps> = ({ size, ...props }) => (
  <svg width={size || '48'} height={size || '48'} viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M24 21.5L24 35'
      stroke='black'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M24 13L24 16.5'
      stroke='black'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M24 21.5C25.3807 21.5 26.5 20.3807 26.5 19C26.5 17.6193 25.3807 16.5 24 16.5C22.6193 16.5 21.5 17.6193 21.5 19C21.5 20.3807 22.6193 21.5 24 21.5Z'
      stroke='black'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M33 31.5L33.0001 35'
      stroke='black'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M33.0001 13L33 26.5'
      stroke='black'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M33 31.5C34.3807 31.5 35.5 30.3807 35.5 29C35.5 27.6193 34.3807 26.5 33 26.5C31.6193 26.5 30.5 27.6193 30.5 29C30.5 30.3807 31.6193 31.5 33 31.5Z'
      stroke='black'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M15.0001 27.5L15 35'
      stroke='black'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M15 13L15.0001 22.5'
      stroke='black'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M15 27.5C16.3807 27.5 17.5 26.3807 17.5 25C17.5 23.6193 16.3807 22.5 15 22.5C13.6193 22.5 12.5 23.6193 12.5 25C12.5 26.3807 13.6193 27.5 15 27.5Z'
      stroke='black'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </svg>
)
FineTuning.displayName = 'FineTuning'
export default FineTuning
/* tslint:enable */
/* eslint-enable */
