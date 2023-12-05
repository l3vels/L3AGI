/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface PlayersProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Players: React.FC<PlayersProps> = ({size, ...props}) => (
  <svg viewBox="0 0 40 40" fill="currentColor" width={ size || "40" } height={ size || "40" } {...props}>
    <path d="M18.5179 10.0993C15.5583 10.4801 13.2447 12.0069 11.8981 14.4678C11.7962 14.654 11.9331 14.8798 12.1478 14.8798H27.8522C28.0669 14.8798 28.2038 14.654 28.1019 14.4678C26.3265 11.2234 22.6842 9.56319 18.5179 10.0993ZM8 25.2837C8 26.0129 8.60025 26.6041 9.3407 26.6041H17.3955C17.7669 26.6041 18.1217 26.4524 18.3752 26.1851L18.9714 25.5565C19.518 24.9803 19.981 24.5088 20.0003 24.5088C20.0196 24.5088 20.4819 24.9803 21.0275 25.5565L21.6219 26.1843C21.8755 26.4521 22.2306 26.6041 22.6024 26.6041H30.6593C31.3997 26.6041 32 26.0129 32 25.2837V17.707C32 16.9777 31.3997 16.3866 30.6593 16.3866H9.3407C8.60025 16.3866 8 16.9777 8 17.707V25.2837Z"
      fill="#fff" fillRule="evenodd" clipRule="evenodd" />
    <path d="M15.8403 28.8629C15.8403 30.5872 18.4517 31 19.8983 31C22.7915 31 24.2185 29.5753 24.2185 28.8629H15.8403Z" fill="#fff" />
  </svg>
);
Players.displayName = 'Players';
export default Players;
/* tslint:enable */
/* eslint-enable */
