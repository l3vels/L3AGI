/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface DragDropProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const DragDrop: React.FC<DragDropProps> = ({size, ...props}) => (
  <svg viewBox="0 0 12 12" fill="currentColor" width={ size || "12" } height={ size || "12" } {...props}>
    <path d="M8 4H4V5H8V4ZM8 8H4V9H8V8Z" fill="#fff" fillRule="evenodd" clipRule="evenodd" />
  </svg>
);
DragDrop.displayName = 'DragDrop';
export default DragDrop;
/* tslint:enable */
/* eslint-enable */
