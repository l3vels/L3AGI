/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface InfoProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Info: React.FC<InfoProps> = ({size, ...props}) => (
  <svg viewBox="0 0 72 72" fill="currentColor" width={ size || "72" } height={ size || "72" } {...props}>
    <path d="M36 56C47.0457 56 56 47.0457 56 36C56 24.9543 47.0457 16 36 16C24.9543 16 16 24.9543 16 36C16 47.0457 24.9543 56 36 56Z" fill="#fff" />
    <path d="M35.9998 53.2727C45.5392 53.2727 53.2725 45.5395 53.2725 36C53.2725 26.4605 45.5392 18.7273 35.9998 18.7273C26.4603 18.7273 18.7271 26.4605 18.7271 36C18.7271 45.5395 26.4603 53.2727 35.9998 53.2727Z"
      fill="#000" />
    <path d="M36.0225 31.4182C35.5771 31.4182 35.2044 31.2682 34.8953 30.9682C34.5862 30.6682 34.4316 30.2954 34.4316 29.85C34.4316 29.4091 34.5862 29.0363 34.8953 28.7454C35.2044 28.4545 35.5771 28.3045 36.0225 28.3045C36.468 28.3045 36.8362 28.45 37.1271 28.7454C37.4225 29.0409 37.568 29.4091 37.568 29.85C37.568 30.2954 37.4225 30.6636 37.1271 30.9682C36.8316 31.2682 36.4635 31.4182 36.0225 31.4182ZM37.418 43.6954H34.6044V32.6H37.418V43.6954Z"
      fill="#fff" />
  </svg>
);
Info.displayName = 'Info';
export default Info;
/* tslint:enable */
/* eslint-enable */
