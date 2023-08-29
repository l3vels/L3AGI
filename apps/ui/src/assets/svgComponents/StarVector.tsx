import { SVGProps } from 'react'

const StarVector = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={18} height={18} fill='none' {...props}>
    <path
      fill='url(#a)'
      d='M4.48 7.545A4.002 4.002 0 0 0 7.546 4.48l.686-3.174C8.41.48 9.59.48 9.769 1.307l.686 3.174a4.002 4.002 0 0 0 3.064 3.064l3.173.686c.828.179.828 1.359 0 1.538l-3.173.686a4.002 4.002 0 0 0-3.064 3.064l-.686 3.173c-.18.828-1.36.828-1.538 0l-.686-3.173a4.002 4.002 0 0 0-3.064-3.064l-3.174-.686c-.827-.18-.827-1.36 0-1.538l3.174-.686Z'
    />
    <defs>
      <linearGradient id='a' x1={9} x2={9} y1={0.687} y2={17.313} gradientUnits='userSpaceOnUse'>
        <stop stopColor='#FDFE53' />
        <stop offset={1} stopColor='#EB9B3A' />
      </linearGradient>
    </defs>
  </svg>
)
export default StarVector
