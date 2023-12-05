/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface AttributesProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Attributes: React.FC<AttributesProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <path d="M13.0338 17.7509L16.892 10.0344C16.9213 9.97585 17.0095 9.99667 17.0095 10.0621V14.302C17.0095 14.5213 17.231 14.6713 17.4346 14.5898L19.3526 13.8226C19.6173 13.7167 19.8725 13.9941 19.745 14.2491L15.8868 21.9656C15.8576 22.0242 15.7694 22.0033 15.7694 21.9379V17.698C15.7694 17.4787 15.5479 17.3287 15.3442 17.4102L13.4263 18.1774C13.1616 18.2833 12.9063 18.0059 13.0338 17.7509Z"
      stroke="#fff" strokeLinecap="round" />
  </svg>
);
Attributes.displayName = 'Attributes';
export default Attributes;
/* tslint:enable */
/* eslint-enable */
