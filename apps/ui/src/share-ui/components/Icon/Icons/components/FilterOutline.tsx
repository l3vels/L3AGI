/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface FilterOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const FilterOutline: React.FC<FilterOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <path d="M30.2857 8H9.71429C8.90617 8 8.5021 8 8.25106 8.25106C8 8.5021 8 8.90617 8 9.71429V13.0825C8 13.5317 8 13.7562 8.10142 13.9457C8.20285 14.1352 8.38969 14.2598 8.76337 14.5089L13.9465 17.9643C15.4413 18.9608 16.1886 19.4591 16.5942 20.2172C17 20.9751 17 21.8734 17 23.6698V32L23 29V23.6698C23 21.8734 23 20.9751 23.4058 20.2172C23.8114 19.4591 24.5588 18.9608 26.0535 17.9643L31.2366 14.5089C31.6103 14.2598 31.7972 14.1352 31.8985 13.9457C32 13.7562 32 13.5317 32 13.0825V9.71429C32 8.90617 32 8.5021 31.749 8.25106C31.4979 8 31.0938 8 30.2857 8Z"
      stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
FilterOutline.displayName = 'FilterOutline';
export default FilterOutline;
/* tslint:enable */
/* eslint-enable */
