import React from "react";
type L3Component<T, P = HTMLElement> = React.ForwardRefExoticComponent<T & React.RefAttributes<P>> & {
  defaultTestId?: string;
};

export default L3Component;
