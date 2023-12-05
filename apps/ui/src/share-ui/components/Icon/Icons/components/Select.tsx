/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface SelectProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Select: React.FC<SelectProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <path d="M16 22C19.3137 22 22 19.3137 22 16C22 12.6863 19.3137 10 16 10C12.6863 10 10 12.6863 10 16C10 19.3137 12.6863 22 16 22Z" stroke="#fff" strokeMiterlimit="10"
    />
    <path d="M18.25 15.25L16 17.75L13.75 15.25" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
Select.displayName = 'Select';
export default Select;
/* tslint:enable */
/* eslint-enable */
