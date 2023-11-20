/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface MultiSelectProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const MultiSelect: React.FC<MultiSelectProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <path d="M10.5 12.2496H21.5M10.5005 15.9996H21.5001M10.5005 19.7496H17.0001M19.5 19.75H22.5M21 18.25V21.25" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);
MultiSelect.displayName = 'MultiSelect';
export default MultiSelect;
/* tslint:enable */
/* eslint-enable */
