/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface LevelProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Level: React.FC<LevelProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <path d="M14.8085 12.9709L15.7019 11.1843C15.8247 10.9386 16.1753 10.9386 16.2981 11.1843L17.1915 12.9709C17.9507 14.4894 19.9168 14.9212 21.2425 13.8607L21.4584 13.6879C21.6767 13.5133 22 13.6687 22 13.9482V19.9213C22 20.6577 21.403 21.2546 20.6667 21.2546H11.3333C10.597 21.2546 10 20.6577 10 19.9213V13.9482C10 13.6687 10.3233 13.5133 10.5416 13.6879L10.7575 13.8607C12.0832 14.9212 14.0493 14.4894 14.8085 12.9709Z"
      stroke="#fff" strokeLinecap="round" />
  </svg>
);
Level.displayName = 'Level';
export default Level;
/* tslint:enable */
/* eslint-enable */
