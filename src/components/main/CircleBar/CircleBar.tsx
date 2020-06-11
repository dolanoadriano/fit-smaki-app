import * as React from "react";
import { ICircleBarState } from "./ICircleBarState";
import { ICircleBarProps } from "./ICircleBarProps";
import "./CircleBar.scss";

class CircleBar extends React.Component<ICircleBarProps, ICircleBarState> {
  interval: any;
  constructor(props: ICircleBarProps) {
    super(props);
    this.state = {
      remained: 0,
      partOfSecond: 360,
    };
  }

  componentDidMount() {
    const { value, onDone } = this.props;
    this.setState({
      remained: value,
      partOfSecond: 360,
    });

    this.interval = setInterval(() => {
      this.setState(
        {
          partOfSecond:
            this.state.partOfSecond > 0 ? this.state.partOfSecond - 36 : 360,
        },
        () => {
          if (this.state.partOfSecond) return;
          this.setState(
            {
              remained:
                this.state.remained > 0
                  ? this.state.remained - 1
                  : this.props.value,
            },
            () => {
              if (this.state.remained === this.props.value) {
                onDone && onDone();
              }
            }
          );
        }
      );
    }, 100);
  }

  componentWillMount() {
    clearInterval(this.interval);
  }

  public render(): JSX.Element {
    const { value } = this.props;
    const { remained, partOfSecond } = this.state;
    return (
      <div className={`CircleBar`}>
        <div className="progress-bar position">
          <div
            className="background"
            style={{ backgroundColor: "rgb(179, 206, 246)" }}
          />
          <div
            className="rotate"
            style={{
              transform: `rotate(${partOfSecond}deg)`,
            }}
          />
          <div
            className="left"
            style={{
              opacity: `${partOfSecond <= 180 ? "1" : "0"}`,
            }}
          />
          <div
            className="right"
            style={{
              opacity: `${partOfSecond > 180 ? "1" : "0"}`,
            }}
          />
          <div>
            <span className="remained">{remained}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default CircleBar;
