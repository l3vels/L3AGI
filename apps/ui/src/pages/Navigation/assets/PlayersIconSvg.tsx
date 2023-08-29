import * as React from 'react'
import { SVGProps } from 'react'

const PlayersIconSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={24} height={21} fill='none' {...props}>
    <path
      fill='#fff'
      fillOpacity={0.8}
      fillRule='evenodd'
      d='M10.518.1c-2.96.38-5.273 1.907-6.62 4.368a.28.28 0 0 0 .25.412h15.704a.28.28 0 0 0 .25-.412C18.326 1.223 14.684-.437 10.518.099ZM0 15.283c0 .729.6 1.32 1.34 1.32h8.055c.372 0 .727-.152.98-.419l.596-.628c.547-.577 1.01-1.048 1.03-1.048.019 0 .48.471 1.027 1.047l.594.628c.254.268.609.42.98.42h8.057c.74 0 1.341-.591 1.341-1.32V7.707c0-.73-.6-1.32-1.34-1.32H1.34c-.74 0-1.34.59-1.34 1.32v7.577Z'
      clipRule='evenodd'
    />
    <path
      fill='#fff'
      fillOpacity={0.8}
      d='M7.84 18.863c0 1.724 2.612 2.137 4.058 2.137 2.893 0 4.32-1.425 4.32-2.137H7.84Z'
    />
  </svg>
)
export default PlayersIconSvg
