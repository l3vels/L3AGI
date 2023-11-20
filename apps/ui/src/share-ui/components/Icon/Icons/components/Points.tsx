/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface PointsProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Points: React.FC<PointsProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <path d="M15.5001 15.6566L17.0001 14.1566M21.0001 15.6566C21.0001 18.6942 18.5377 21.1566 15.5001 21.1566C12.4625 21.1566 10 18.6942 10 15.6566C10 12.6191 12.4625 10.1566 15.5001 10.1566M19.0001 15.6566C19.0001 17.5896 17.4331 19.1566 15.5001 19.1566C13.567 19.1566 12 17.5896 12 15.6566C12 13.7236 13.567 12.1566 15.5001 12.1566M17.0001 13.9066V11.7164C17.0001 11.6491 17.0272 11.5846 17.0753 11.5376L18.5754 10.0717C18.7337 9.917 19.0001 10.0292 19.0001 10.2505V11.9066C19.0001 12.0447 19.112 12.1566 19.2501 12.1566H20.9062C21.1276 12.1566 21.2397 12.4231 21.085 12.5814L19.6191 14.0814C19.5721 14.1295 19.5076 14.1566 19.4403 14.1566H17.2501C17.112 14.1566 17.0001 14.0447 17.0001 13.9066Z"
      stroke="#fff" strokeLinecap="round" />
  </svg>
);
Points.displayName = 'Points';
export default Points;
/* tslint:enable */
/* eslint-enable */
