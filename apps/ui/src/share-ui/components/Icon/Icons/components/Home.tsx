/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface HomeProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Home: React.FC<HomeProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <path d="M8.6548 25.244L16.8842 10.9294C18.3972 8.32454 21.391 8.39519 22.8548 10.9118L31.098 25.244C32.6441 27.9251 31.3862 30.5412 28.3918 30.5412H11.3786C8.3705 30.5412 7.12643 27.9251 8.6548 25.244ZM12.2431 26.2812C12.0256 26.6142 12.1509 26.9179 12.5546 26.9179H27.1982C27.6234 26.9179 27.7311 26.6142 27.5313 26.2812L20.2133 13.5933C20.037 13.2741 19.6942 13.2564 19.5218 13.5933L12.2431 26.2812Z"
      fill="#fff" />
  </svg>
);
Home.displayName = 'Home';
export default Home;
/* tslint:enable */
/* eslint-enable */
