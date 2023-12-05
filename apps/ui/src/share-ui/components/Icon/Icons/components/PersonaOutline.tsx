/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface PersonaOutlineProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const PersonaOutline: React.FC<PersonaOutlineProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <path d="M19.9997 24.6963C24.3719 24.6963 27.9163 20.9587 27.9163 16.3482C27.9163 11.7376 24.3719 8 19.9997 8C15.6275 8 12.0831 11.7376 12.0831 16.3482C12.0831 20.9587 15.6275 24.6963 19.9997 24.6963ZM19.9997 24.6963C17.5676 24.6963 15.1788 25.3712 13.0724 26.6532C10.966 27.9351 9.21663 29.7791 8 31.9997M19.9997 24.6963C22.4317 24.6963 24.8213 25.3713 26.9277 26.6533C29.0341 27.9353 30.7834 29.7793 32 32"
      stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
PersonaOutline.displayName = 'PersonaOutline';
export default PersonaOutline;
/* tslint:enable */
/* eslint-enable */
