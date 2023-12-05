/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface CalendarProps extends React.SVGAttributes<SVGElement> {
size?: string | number;
}
const Calendar: React.FC<CalendarProps> = ({size, ...props}) => (
  <svg viewBox="0 0 32 32" fill="currentColor" width={ size || "32" } height={ size || "32" } {...props}>
    <path d="M13.5208 12.6458V9M19.3542 12.6458V9M12.2083 22.125H20.6667C21.4834 22.125 21.8918 22.125 22.2037 21.9661C22.4781 21.8262 22.7012 21.6031 22.8411 21.3287C23 21.0168 23 20.6084 23 19.7917V12.7917C23 11.9749 23 11.5666 22.8411 11.2546C22.7012 10.9802 22.4781 10.7571 22.2037 10.6173C21.8918 10.4583 21.4834 10.4583 20.6667 10.4583H12.2083C11.3916 10.4583 10.9832 10.4583 10.6713 10.6173C10.3969 10.7571 10.1738 10.9802 10.0339 11.2546C9.875 11.5666 9.875 11.9749 9.875 12.7917V19.7917C9.875 20.6084 9.875 21.0168 10.0339 21.3287C10.1738 21.6031 10.3969 21.8262 10.6713 21.9661C10.9832 22.125 11.3916 22.125 12.2083 22.125Z"
      stroke="#fff" strokeLinecap="round" />
  </svg>
);
Calendar.displayName = 'Calendar';
export default Calendar;
/* tslint:enable */
/* eslint-enable */
