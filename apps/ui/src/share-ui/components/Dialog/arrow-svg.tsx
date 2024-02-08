import * as React from 'react'
import { SVGProps } from 'react'

const TooltipArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg width={28} height={5} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M12.971 1.617 8.046 4.572A3 3 0 0 1 6.502 5h14.996a3 3 0 0 1-1.544-.428L15.03 1.617a2 2 0 0 0-2.058 0Z'
      fill='#000'
      // fillOpacity={0.3}
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M6.66 4H4v1h2.66a4.5 4.5 0 0 0 2.453-.727l3.524-2.291a2.5 2.5 0 0 1 2.726 0l3.524 2.291A4.5 4.5 0 0 0 21.34 5H24V4h-2.66a3.5 3.5 0 0 1-1.908-.565l-3.524-2.292a3.5 3.5 0 0 0-3.816 0L8.569 3.436A3.5 3.5 0 0 1 6.66 4Z'
      fill='#000'
      fillOpacity={0.3}
    />
  </svg>
)

export default TooltipArrow
