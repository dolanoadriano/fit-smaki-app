import * as React from "react";
import { ICuriositiesState } from "./ICuriositiesState";
import { ICuriositiesProps } from "./ICuriositiesProps";
import "./Curiosities.scss";
import Header from "../../utils/Header/Header";
import CircleBar from "../../main/CircleBar/CircleBar";
import {
  Curiosities,
  apiUrl,
  getImageUrl,
  randomInteger,
} from "../../../utils";

class CuriositiesComponent extends React.Component<
  ICuriositiesProps,
  ICuriositiesState
> {
  constructor(props: ICuriositiesProps) {
    super(props);
    this.state = {
      curiosities: undefined,
      activeCuriosities: undefined,
      currentCuriositiesIndex: -1,
    };
  }

  componentDidMount() {
    this.fetchCuriosities();
  }

  public fetchCuriosities = async (): Promise<Curiosities | undefined> => {
    const result: Response = await fetch(`${apiUrl}/curiosities`);
    const curiosities: Curiosities | undefined = await result.json();
    this.setState(
      {
        curiosities: curiosities,
        activeCuriosities: curiosities,
      },
      () => {
        this.randomCurrentCuriositiesIndex();
      }
    );
    return curiosities;
  };

  public randomCurrentCuriositiesIndex = (): number => {
    if (!this.state.activeCuriosities || !this.state.activeCuriosities.images)
      return -1;
    const oldIndex: number = this.state.currentCuriositiesIndex;
    const newIndex: number = randomInteger(
      0,
      this.state.activeCuriosities.images.length - 2
    );

    this.setState(
      {
        currentCuriositiesIndex: newIndex,
        activeCuriosities: {
          ...this.state.activeCuriosities,
          images: this.state.activeCuriosities.images.filter(
            (image, i) => i !== oldIndex
          ),
        },
      },
      () => {
        if (
          this.state.activeCuriosities &&
          this.state.activeCuriosities.images.length === 0
        )
          this.setState({
            activeCuriosities: this.state.curiosities,
          });
      }
    );
    return newIndex;
  };

  public handleCircleBarDone = () => {
    this.randomCurrentCuriositiesIndex();
  };

  public render(): JSX.Element {
    const {
      curiosities,
      activeCuriosities,
      currentCuriositiesIndex,
    } = this.state;
    return (
      <div className={`Curiosities`}>
        <Header>Losowa ciekawostka</Header>
        <div className="content">
          <div className="circle-wrapper">
            <CircleBar value={5} onDone={this.handleCircleBarDone} />
          </div>
          <div
            className="image"
            style={{
              backgroundImage: `url(${
                activeCuriosities &&
                currentCuriositiesIndex !== -1 &&
                getImageUrl(activeCuriosities.images[currentCuriositiesIndex])
              })`,
            }}
          />
        </div>
      </div>
    );
  }
}

export default CuriositiesComponent;
