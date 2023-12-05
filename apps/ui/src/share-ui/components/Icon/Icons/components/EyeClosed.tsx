/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface EyeClosedProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const EyeClosed: React.FC<EyeClosedProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <path d="M11 10.5L21 21.5M17.6815 17.8499C17.1909 18.2958 16.5432 18.5286 15.881 18.497 15.2187 18.4655 14.5961 18.1721 14.1502 17.6816 13.7042 17.191 13.4713 16.5433 13.5028 15.8811 13.5343 15.2188 13.8276 14.5962 14.3182 14.1501"
      stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.6247 12.2871C10.0766 13.5775 9 16 9 16 9 16 11 20.4995 16 20.4995 17.1715 20.5089 18.3284 20.239 19.3748 19.7124M21.0383 18.5687C22.4009 17.3483 23.0002 16 23.0002 16 23.0002 16 21.0002 11.4995 16.0002 11.4995 15.5671 11.4988 15.1347 11.534 14.7075 11.6048"
      stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.4707 13.5442C17.0021 13.6462 17.486 13.9178 17.85 14.3181C18.2139 14.7185 18.4383 15.2261 18.4893 15.7647" stroke="#fff" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);
EyeClosed.displayName = 'EyeClosed';
export default EyeClosed;
/* tslint:enable */
/* eslint-enable */
