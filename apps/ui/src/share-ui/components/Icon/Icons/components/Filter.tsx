/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface FilterProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Filter: React.FC<FilterProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <path d="M22.0756 9H9.92438C9.10249 9 8.69089 10.0399 9.27205 10.6481L13.8847 15.4754C14.0577 15.6565 14.1549 15.902 14.1549 16.1581V20.1028C14.1549 20.4066 14.2916 20.6928 14.5239 20.8751L17.107 22.9026C17.4111 23.1413 17.8451 22.9142 17.8451 22.5164V16.1581C17.8451 15.902 17.9423 15.6565 18.1153 15.4754L22.7279 10.6481C23.3091 10.0399 22.8975 9 22.0756 9Z"
      stroke="#fff" strokeLinecap="round" />
  </svg>
);
Filter.displayName = 'Filter';
export default Filter;
/* tslint:enable */
/* eslint-enable */
