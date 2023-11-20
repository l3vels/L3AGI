/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface RoyaltiesProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Royalties: React.FC<RoyaltiesProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <path d="M18 10.6244C13.7434 11.3386 10.5 15.0405 10.5 19.5C10.5 20.6042 10.6989 21.662 11.0627 22.6395L18 18.6343V10.6244ZM21 10.6244V16.9022L26.4356 13.764C25.0871 12.1353 23.1759 10.9895 21 10.6244ZM27.9374 16.361L20.2518 20.7983C20.2499 20.7994 20.248 20.8005 20.246 20.8016L12.5647 25.2364C14.2155 27.23 16.7095 28.5 19.5 28.5C24.4706 28.5 28.5 24.4706 28.5 19.5C28.5 18.3959 28.3012 17.3383 27.9374 16.361ZM7.5 19.5C7.5 12.8726 12.8726 7.5 19.5 7.5C26.1274 7.5 31.5 12.8726 31.5 19.5C31.5 26.1274 26.1274 31.5 19.5 31.5C12.8726 31.5 7.5 26.1274 7.5 19.5Z"
      fill="#fff" fillRule="evenodd" clipRule="evenodd" />
  </svg>
);
Royalties.displayName = 'Royalties';
export default Royalties;
/* tslint:enable */
/* eslint-enable */
