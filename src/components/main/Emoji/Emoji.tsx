import * as React from "react";
import { IEmojiState } from "./IEmojiState";
import { IEmojiProps } from "./IEmojiProps";
import "./Emoji.scss";
import { random, randomInteger } from "../../../utils";
import icons from "./icons.json";

class Emoji extends React.Component<IEmojiProps, IEmojiState> {
  constructor(props: IEmojiProps) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <div className={`Emoji`}>
        {[0, 0, 0, 0, 0, 0, 0, 0, 0].map((e, i) => (
          <div
            className="icon-wrapper"
            style={{
              animationDelay: `${0.1 * random(0, 30)}s`,
              animationDuration: `${3 + random(0, 20) * 0.1}s`,
            }}
          >
            <div className="icon">
              <i
                className={`icon-${
                  icons[randomInteger(0, 2).toString() as "0"]
                }`}
              ></i>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Emoji;
