import * as React from 'react'
import { SVGProps } from 'react'

const NewsPaperIconSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg width={14} height={12} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M1 11.5v-10a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5v10l-2-1-2 1-2-1-2 1-2-1-2 1ZM8 5h3M8 7h3'
      stroke='#fff'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path d='M6 4H3v4h3V4Z' stroke='#fff' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
)

export default NewsPaperIconSvg
