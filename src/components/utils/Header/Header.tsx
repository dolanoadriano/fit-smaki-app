import * as React from "react";
import { IHeaderProps } from "./IHeaderProps";
import "./Header.scss";

const Header: React.SFC<IHeaderProps> = (props) => {
  const { children, isBig } = props;
  return (
    <div className="Header">
      {isBig ? (
        <h1>
          {children} <span className="ornament">///</span>
        </h1>
      ) : (
        <h2>
          {children} <span className="ornament">///</span>
        </h2>
      )}
    </div>
  );
};

export default Header;
