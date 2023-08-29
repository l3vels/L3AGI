import * as React from 'react'
import { SVGProps } from 'react'

const ChannelsIconSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg width={14} height={14} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M1.13 7.797A4.498 4.498 0 1 1 2.702 9.37h0l-1.554.444a.375.375 0 0 1-.464-.464l.445-1.554h0Z'
      stroke='#fff'
      strokeOpacity={0.6}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M4.754 9.993a4.502 4.502 0 0 0 6.543 2.378h0l1.554.444a.375.375 0 0 0 .463-.464l-.444-1.554h0a4.5 4.5 0 0 0-3.624-6.79'
      stroke='#fff'
      strokeOpacity={0.6}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

export default ChannelsIconSvg
