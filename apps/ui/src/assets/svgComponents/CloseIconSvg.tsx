import { SVGProps } from 'react'

const CloseIconSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg width={40} height={40} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M9.293 30.34a1 1 0 0 1 0-1.414L28.879 9.34a1 1 0 1 1 1.414 1.415L10.707 30.34a1 1 0 0 1-1.414 0Z'
      fill='#fff'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M9.707 9.34a1 1 0 0 1 1.414 0l19.586 19.586a1 1 0 0 1-1.414 1.414L9.707 10.755a1 1 0 0 1 0-1.415Z'
      fill='#fff'
    />
  </svg>
)

export default CloseIconSvg
