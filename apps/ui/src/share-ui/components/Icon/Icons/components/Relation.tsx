/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface RelationProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Relation: React.FC<RelationProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <path d="M18 16L21 19L18 22" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 10V19H21" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
Relation.displayName = 'Relation';
export default Relation;
/* tslint:enable */
/* eslint-enable */
