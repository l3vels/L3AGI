import * as React from 'react'
import { SVGProps } from 'react'

const SavedIconSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg width={14} height={16} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M12 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1.6.8l3.8-2.85a1 1 0 0 1 1.2 0l3.8 2.85A1 1 0 0 0 13 14V2a1 1 0 0 0-1-1Z'
      stroke='#fff'
      strokeOpacity={0.6}
    />
  </svg>
)

export default SavedIconSvg
