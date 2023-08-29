import { SVGProps } from 'react'

const ChatIconSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={13} height={13} fill='none' {...props}>
    <path
      fill='#fff'
      d='M6.25 0A6.257 6.257 0 0 0 0 6.25v5.27a.98.98 0 0 0 .98.98h5.27a6.25 6.25 0 0 0 0-12.5Zm-3 7.25a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm3 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm3 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z'
    />
  </svg>
)
export default ChatIconSvg
