/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface MintingProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Minting: React.FC<MintingProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <path d="M20 23.5C21.933 23.5 23.5 21.933 23.5 20C23.5 18.067 21.933 16.5 20 16.5C18.067 16.5 16.5 18.067 16.5 20C16.5 21.933 18.067 23.5 20 23.5Z" fill="#fff" stroke="#fff"
      strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14.4314 25.5684C13.6993 24.8376 13.1186 23.9696 12.7223 23.0141 12.326 22.0586 12.1221 21.0343 12.1221 19.9999 12.1221 18.9655 12.326 17.9413 12.7223 16.9858 13.1186 16.0303 13.6993 15.1623 14.4314 14.4315M25.5684 14.4315C26.3004 15.1623 26.8812 16.0303 27.2775 16.9858 27.6737 17.9413 27.8777 18.9655 27.8777 19.9999 27.8777 21.0343 27.6737 22.0586 27.2775 23.0141 26.8812 23.9696 26.3004 24.8376 25.5684 25.5684M11.3384 28.6621C10.1996 27.5253 9.29618 26.1751 8.67978 24.6888 8.06337 23.2024 7.74609 21.6092 7.74609 20.0001 7.74609 18.391 8.06337 16.7977 8.67978 15.3114 9.29618 13.825 10.1996 12.4748 11.3384 11.338M28.6621 11.338C29.8009 12.4748 30.7043 13.825 31.3207 15.3114 31.9371 16.7977 32.2544 18.391 32.2544 20.0001 32.2544 21.6092 31.9371 23.2024 31.3207 24.6888 30.7043 26.1751 29.8009 27.5253 28.6621 28.6621"
      stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
Minting.displayName = 'Minting';
export default Minting;
/* tslint:enable */
/* eslint-enable */
