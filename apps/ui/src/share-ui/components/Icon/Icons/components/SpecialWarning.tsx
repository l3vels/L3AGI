/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface SpecialWarningProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const SpecialWarning: React.FC<SpecialWarningProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <path d="M1.23947 35.2065L19.2616 3.96817C19.5619 3.41035 20.3772 3.41035 20.7205 3.96817L38.7855 35.2065C39.0859 35.7643 38.6997 36.4509 38.056 36.4509H1.92602C1.28238 36.4509 0.896188 35.7643 1.23947 35.2065Z"
      fill="#fff" />
    <path d="M6.25977 33.147L19.9909 9.375L33.722 33.147H6.25977Z" fill="#000" />
    <path d="M19.9909 27.3969C20.3342 27.3969 20.6345 27.5256 20.892 27.7831C21.1495 28.0406 21.2782 28.3409 21.2782 28.6842C21.2782 29.0275 21.1495 29.3279 20.892 29.5853C20.6345 29.8428 20.3342 29.9715 19.9909 29.9715C19.6476 29.9715 19.3043 29.8428 19.0898 29.5853C18.8323 29.3279 18.7036 29.0275 18.7036 28.6842C18.7036 28.3409 18.8323 28.0406 19.0898 27.7831C19.3473 27.5256 19.6476 27.3969 19.9909 27.3969ZM19.004 26.2813L18.8323 17.0557H21.1924L20.9778 26.2813H19.004Z"
      fill="#fff" />
  </svg>
);
SpecialWarning.displayName = 'SpecialWarning';
export default SpecialWarning;
/* tslint:enable */
/* eslint-enable */
