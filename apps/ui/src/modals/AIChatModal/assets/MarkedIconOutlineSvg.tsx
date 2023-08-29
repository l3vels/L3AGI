import { SVGProps } from 'react'

const MarkedIconOutlineSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
    <rect width={24} height={24} fill='#000' fillOpacity={0.2} rx={12} />
    <path
      stroke='#fff'
      strokeLinecap='round'
      strokeWidth={0.667}
      d='m16.666 8.667-6.004 6.482a.554.554 0 0 1-.825 0l-2.504-2.703'
    />
  </svg>
)
export default MarkedIconOutlineSvg
