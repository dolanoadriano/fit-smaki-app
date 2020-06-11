import * as React from "react";
import { IStickerState } from "./IStickerState";
import { IStickerProps } from "./IStickerProps";
import "./Sticker.scss";
import { random } from "../../../utils";

class Sticker extends React.Component<IStickerProps, IStickerState> {
  constructor(props: IStickerProps) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element {
    const { x, y, i } = this.props;
    return (
      <div
        className={`Sticker`}
        style={{
          transform: `translate(${x}px, ${y}px)`,
        }}
      >
        <div
          className="item"
          style={{
            animationDuration: `4 - ${0.3 * i}s}`,
            animationDelay: `0.${i}s`,
            animationName: `animate-sticker-${i}`,
          }}
        ></div>
      </div>
    );
  }
}

export default Sticker;
