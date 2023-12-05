/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface MintedProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Minted: React.FC<MintedProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <path d="M11.6667 16.7222V10.9444C11.6667 10.1467 12.3134 9.5 13.1111 9.5H18.8889C19.6866 9.5 20.3333 10.1467 20.3333 10.9444V16.7222M17.4444 12.3889L15.7884 14.2519C15.6448 14.4135 15.3923 14.4135 15.2486 14.2519L14.5556 13.4722M10.9444 22.5H21.0556C21.8533 22.5 22.5 21.8533 22.5 21.0556V17.1113C22.5 16.5887 21.9621 16.2391 21.4845 16.4514L16.5866 18.6282C16.2132 18.7941 15.7868 18.7942 15.4134 18.6282L10.5155 16.4514C10.0379 16.2391 9.5 16.5887 9.5 17.1113V21.0556C9.5 21.8533 10.1467 22.5 10.9444 22.5Z"
      stroke="#fff" strokeLinecap="round" />
  </svg>
);
Minted.displayName = 'Minted';
export default Minted;
/* tslint:enable */
/* eslint-enable */
