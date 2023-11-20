/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface SpecialWarningInfoProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const SpecialWarningInfo: React.FC<SpecialWarningInfoProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#fff" />
    <path d="M20 37.2727C29.5395 37.2727 37.2727 29.5395 37.2727 20C37.2727 10.4605 29.5395 2.72727 20 2.72727C10.4605 2.72727 2.72727 10.4605 2.72727 20C2.72727 29.5395 10.4605 37.2727 20 37.2727Z"
      fill="#000" />
    <path d="M20.0225 15.4182C19.5771 15.4182 19.2044 15.2682 18.8953 14.9682C18.5862 14.6682 18.4316 14.2954 18.4316 13.85C18.4316 13.4091 18.5862 13.0364 18.8953 12.7454C19.2044 12.4545 19.5771 12.3046 20.0225 12.3046C20.468 12.3046 20.8362 12.45 21.1271 12.7454C21.4225 13.0409 21.568 13.4091 21.568 13.85C21.568 14.2954 21.4225 14.6636 21.1271 14.9682C20.8316 15.2682 20.4635 15.4182 20.0225 15.4182ZM21.418 27.6955H18.6044V16.6H21.418V27.6955Z"
      fill="#fff" />
  </svg>
);
SpecialWarningInfo.displayName = 'SpecialWarningInfo';
export default SpecialWarningInfo;
/* tslint:enable */
/* eslint-enable */
