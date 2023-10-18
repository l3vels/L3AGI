import { SVGProps } from 'react'

const BurgerMenuIconSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg width={28} height={28} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M5 8a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1ZM5 14a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1ZM5 20a1 1 0 0 1 1-1h7a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z'
      fill='#fff'
    />
  </svg>
)

export default BurgerMenuIconSvg
