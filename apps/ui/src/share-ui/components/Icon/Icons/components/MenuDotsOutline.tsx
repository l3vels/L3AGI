/* eslint-disable */
/* tslint:disable */
import * as React from 'react'
export interface MenuDotsOutlineProps extends React.SVGAttributes<SVGElement> {
  size?: string | number
}
const MenuDotsOutline: React.FC<MenuDotsOutlineProps> = ({ size, ...props }) => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M11.6248 11.6249H12.3748M11.6248 12.3749H12.3748M4.62476 11.6249H5.37476M4.62476 12.3749H5.37476M18.6248 11.6249H19.3748M18.6248 12.3749H19.3748M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM6 12C6 12.5523 5.55229 13 5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11C5.55229 11 6 11.4477 6 12ZM20 12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11C19.5523 11 20 11.4477 20 12Z'
      stroke='#111111'
      stroke-linecap='round'
    />
  </svg>
)
MenuDotsOutline.displayName = 'MenuDotsOutline'
export default MenuDotsOutline
/* tslint:enable */
/* eslint-enable */
