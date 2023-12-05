/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface FormulaProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Formula: React.FC<FormulaProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <path d="M11 10.1667C11 9.52233 11.5277 9 12.1786 9H20.8214C21.4723 9 22 9.52233 22 10.1667V10.5556C22 10.9851 21.6482 11.3333 21.2143 11.3333C20.7803 11.3333 20.4286 10.9851 20.4286 10.5556H12.5714V10.9756L17.7274 15.3504C18.1299 15.6918 18.1299 16.3082 17.7274 16.6496L12.5714 21.0244V21.4444H20.4286C20.4286 21.0149 20.7803 20.6667 21.2143 20.6667C21.6482 20.6667 22 21.0149 22 21.4444V21.8333C22 22.4776 21.4723 23 20.8214 23H12.1786C11.5277 23 11 22.4776 11 21.8333V20.8456C11 20.505 11.1503 20.1814 11.4116 19.9597L16.0784 16L11.4116 12.0403C11.1503 11.8186 11 11.495 11 11.1545V10.1667Z"
      fill="#fff" fillRule="evenodd" clipRule="evenodd" />
  </svg>
);
Formula.displayName = 'Formula';
export default Formula;
/* tslint:enable */
/* eslint-enable */
