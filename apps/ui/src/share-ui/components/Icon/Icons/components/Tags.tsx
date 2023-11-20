/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface TagsProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Tags: React.FC<TagsProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <path d="M19.2123 12.1382H19.8616M19.2123 12.7875H19.8616M21.2686 9H16.3586C15.8994 9 15.459 9.18242 15.1343 9.50713L9.50713 15.1343C8.83096 15.8105 8.83096 16.9067 9.50712 17.5829L14.4171 22.4929C15.0933 23.169 16.1895 23.169 16.8657 22.4929L22.4929 16.8657C22.8176 16.541 23 16.1006 23 15.6414V10.7314C23 9.77519 22.2248 9 21.2686 9ZM20.4028 12.4629C20.4028 12.941 20.0153 13.3286 19.5371 13.3286C19.059 13.3286 18.6714 12.941 18.6714 12.4629C18.6714 11.9847 19.059 11.5972 19.5371 11.5972C20.0153 11.5972 20.4028 11.9847 20.4028 12.4629Z"
      stroke="#fff" strokeLinecap="round" />
  </svg>
);
Tags.displayName = 'Tags';
export default Tags;
/* tslint:enable */
/* eslint-enable */
