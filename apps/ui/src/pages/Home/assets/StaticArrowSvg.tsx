import { SVGProps } from 'react'

const StaticArrowSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={10} height={10} fill='none' {...props}>
    <path
      fill={props.fill}
      d='M9.445 0H9.5a.5.5 0 0 1 .5.5V7a.5.5 0 0 1-1 0V1.786L.948 9.837a.556.556 0 0 1-.785-.785L8.214 1H3a.5.5 0 0 1 0-1h6.445Z'
    />
    <defs>
      <linearGradient id='a' x1={5} x2={5} y1={0} y2={10} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#CEFB53' />
        <stop offset={1} stopColor='#7AF94B' />
      </linearGradient>
    </defs>
  </svg>
)
export default StaticArrowSvg
