import * as React from 'react'
import { SVGProps } from 'react'

const DeployIconSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={12} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM4.818 9.182a4.496 4.496 0 0 1 0-6.364M11.182 2.818a4.496 4.496 0 0 1 0 6.364M3.05 10.95a6.994 6.994 0 0 1 0-9.9M12.95 1.05a6.994 6.994 0 0 1 0 9.9'
      stroke='#fff'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

export default DeployIconSvg
