import { SVGProps } from 'react'

const LeftArrowIconSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg width={8} height={12} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M7.138.195c.26.26.26.683 0 .943L2.276 6l4.862 4.862a.667.667 0 1 1-.943.943L.862 6.47a.667.667 0 0 1 0-.942L6.195.195c.26-.26.683-.26.943 0Z'
      fill='#fff'
      fillOpacity={0.5}
    />
  </svg>
)

export default LeftArrowIconSvg
