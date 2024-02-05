/* eslint-disable */
/* tslint:disable */
import * as React from 'react'
export interface IntegrationsProps extends React.SVGAttributes<SVGElement> {
  size?: string | number
}
const Integrations: React.FC<IntegrationsProps> = ({ size, ...props }) => (
  <svg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M24 21.5C26.7614 21.5 29 19.2614 29 16.5C29 13.7386 26.7614 11.5 24 11.5C21.2386 11.5 19 13.7386 19 16.5C19 19.2614 21.2386 21.5 24 21.5Z'
      stroke='black'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M31.5 34.5C34.2614 34.5 36.5 32.2614 36.5 29.5C36.5 26.7386 34.2614 24.5 31.5 24.5C28.7386 24.5 26.5 26.7386 26.5 29.5C26.5 32.2614 28.7386 34.5 31.5 34.5Z'
      stroke='black'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M16.5 34.5C19.2614 34.5 21.5 32.2614 21.5 29.5C21.5 26.7386 19.2614 24.5 16.5 24.5C13.7386 24.5 11.5 26.7386 11.5 29.5C11.5 32.2614 13.7386 34.5 16.5 34.5Z'
      stroke='black'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </svg>
)
Integrations.displayName = 'Integrations'
export default Integrations
/* tslint:enable */
/* eslint-enable */
