import { SVGProps } from 'react'

const MarkedIconSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={16} height={16} fill='none' {...props}>
    <path
      fill='#fff'
      fillRule='evenodd'
      d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Zm4.742-9.83a1 1 0 0 0-1.485-1.34L6.845 9.722 5.242 7.948a1 1 0 0 0-1.484 1.34l2.012 2.23c.58.643 1.568.643 2.148 0l4.824-5.348Z'
      clipRule='evenodd'
    />
  </svg>
)
export default MarkedIconSvg
