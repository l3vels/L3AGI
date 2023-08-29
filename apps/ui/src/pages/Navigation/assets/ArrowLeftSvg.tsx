import { SVGProps } from 'react'
const ArrowLeftSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={16} height={16} fill='none' {...props}>
    <path
      stroke='#fff'
      strokeLinecap='round'
      d='M10.882 1.555 5.196 7.241c-.42.42-.42 1.1 0 1.519l5.686 5.685'
    />
  </svg>
)
export default ArrowLeftSvg
