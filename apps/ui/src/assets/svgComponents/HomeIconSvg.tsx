import * as React from 'react'
import { SVGProps } from 'react'

const HomeIconSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M1.007 5.458v7.576c0 1.434 1.093 1.908 1.64 1.966h10.362c1.546 0 1.971-1.31 1.99-1.966V5.516c0-.74-.546-1.234-.819-1.388l-5.503-2.95c-.656-.323-1.25-.134-1.464 0L1.826 4.187c-.749.509-.858 1.06-.82 1.272Z'
      stroke='#fff'
      strokeOpacity={0.6}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M8 11c-1.3 0-1.917-.991-2-1.5-.062-.38-.333-.52-.5-.5-.38.044-.48.277-.5.414C5 11.53 7.02 12.02 8 12c2.549 0 3.04-1.724 2.998-2.586 0-.328-.333-.41-.5-.41-.4 0-.498.359-.498.496 0 1.5-1.313 1.52-2 1.5Z'
      fill='#fff'
      strokeOpacity={0.6}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

export default HomeIconSvg
