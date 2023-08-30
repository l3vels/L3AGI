import { SVGProps } from 'react'
const ArrowRightSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={16} height={16} fill='none' {...props}>
    <path stroke='#fff' strokeLinecap='round' d='m5 2 4.763 4.763a1.75 1.75 0 0 1 0 2.474L5 14' />
  </svg>
)
export default ArrowRightSvg
