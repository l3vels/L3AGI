/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface FormulaOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const FormulaOutline: React.FC<FormulaOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <g clipPath="url(#clip0_1413_34443)">
      <path d="M11.8335 11.25C11.8335 10.2835 12.617 9.5 13.5835 9.5H26.4168C27.3833 9.5 28.1668 10.2835 28.1668 11.25V11.8333C28.1668 12.4777 27.6445 13 27.0002 13C26.3558 13 25.8335 12.4777 25.8335 11.8333H14.1668V12.4634L21.8227 19.0256C22.4203 19.5378 22.4203 20.4622 21.8227 20.9744L14.1668 27.5365V28.1667H25.8335C25.8335 27.5223 26.3558 27 27.0002 27C27.6445 27 28.1668 27.5223 28.1668 28.1667V28.75C28.1668 29.7165 27.3833 30.5 26.4168 30.5H13.5835C12.617 30.5 11.8335 29.7165 11.8335 28.75V27.2683C11.8335 26.7574 12.0567 26.2721 12.4446 25.9396L19.3741 20L12.4446 14.0604C12.0567 13.7279 11.8335 13.2426 11.8335 12.7317V11.25Z"
        fill="#fff" fillRule="evenodd" clipRule="evenodd" />
    </g>
    <defs>
      <clipPath id="clip0_1413_34443">
        <path fill="#fff" transform="translate(6 6)" d="M0 0H28V28H0z" />
      </clipPath>
    </defs>
  </svg>
);
FormulaOutline.displayName = 'FormulaOutline';
export default FormulaOutline;
/* tslint:enable */
/* eslint-enable */
