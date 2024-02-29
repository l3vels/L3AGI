/* eslint-disable */
/* tslint:disable */
import * as React from 'react'
export interface ChatsProps extends React.SVGAttributes<SVGElement> {
  size?: string | number
}
const Chats: React.FC<ChatsProps> = ({ size, ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='32'
    height='32'
    viewBox='0 0 32 32'
    fill='none'
    {...props}
  >
    <path
      d='M12 21.999H3.75C3.55109 21.999 3.36032 21.92 3.21967 21.7794C3.07902 21.6387 3 21.4479 3 21.249V12.999C3 10.6121 3.94821 8.32288 5.63604 6.63505C7.32386 4.94723 9.61304 3.99902 12 3.99902H12C14.3869 3.99902 16.6761 4.94724 18.364 6.63506C20.0518 8.32289 21 10.6121 21 12.999V12.999C21 15.386 20.0518 17.6752 18.364 19.363C16.6761 21.0508 14.387 21.999 12 21.999V21.999Z'
      stroke='black'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M11.5117 21.9994C12.1328 23.7541 13.2824 25.2732 14.8024 26.3477C16.3224 27.4221 18.1381 27.999 19.9995 27.999H28.2495C28.4484 27.999 28.6391 27.92 28.7798 27.7793C28.9205 27.6387 28.9995 27.4479 28.9995 27.249V18.999C28.9994 16.6972 28.1175 14.4828 26.535 12.8113C24.9524 11.1398 22.7896 10.1381 20.4912 10.0122'
      stroke='black'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </svg>
)
Chats.displayName = 'Chats'
export default Chats
/* tslint:enable */
/* eslint-enable */
