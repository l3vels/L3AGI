/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface BulletListProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const BulletList: React.FC<BulletListProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <path d="M13.8169 10.7793H22.8571M13.8169 15.7141H22.8566M13.8169 20.6489H22.8566M11.1332 10.7793C11.1332 11.0518 10.9434 11.2727 10.7094 11.2727C10.4754 11.2727 10.2856 11.0518 10.2856 10.7793C10.2856 10.5067 10.4754 10.2858 10.7094 10.2858C10.9434 10.2858 11.1332 10.5067 11.1332 10.7793ZM11.1332 15.7141C11.1332 15.9866 10.9434 16.2076 10.7094 16.2076C10.4754 16.2076 10.2856 15.9866 10.2856 15.7141C10.2856 15.4416 10.4754 15.2206 10.7094 15.2206C10.9434 15.2206 11.1332 15.4416 11.1332 15.7141ZM11.1332 20.6494C11.1332 20.922 10.9434 21.1429 10.7094 21.1429C10.4754 21.1429 10.2856 20.922 10.2856 20.6494C10.2856 20.3769 10.4754 20.1559 10.7094 20.1559C10.9434 20.1559 11.1332 20.3769 11.1332 20.6494Z"
      stroke="#fff" strokeLinecap="round" />
  </svg>
);
BulletList.displayName = 'BulletList';
export default BulletList;
/* tslint:enable */
/* eslint-enable */
