import * as React from "react";
import { ILoadingState } from "./ILoadingState";
import { ILoadingProps } from "./ILoadingProps";
import "./Loading.scss";

class Loading extends React.Component<ILoadingProps, ILoadingState> {
  constructor(props: ILoadingProps) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <div className={`Loading`}>
        <div className="loading-content">
          <div className="icon"></div>
        </div>
      </div>
    );
  }
}

export default Loading;
