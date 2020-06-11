import * as React from "react";
import { ITopState } from "./ITopState";
import { ITopProps } from "./ITopProps";
import "./Top.scss";
import Sticker from "../Sticker/Sticker";
import { apiUrl, AboutPage } from "../../../utils";
import { HashLink as Link } from "react-router-hash-link";

class Top extends React.Component<ITopProps, ITopState> {
  constructor(props: ITopProps) {
    super(props);
    this.state = {
      aboutPage: undefined,
    };
  }

  public componentDidMount(): void {
    this.fetchAboutPage();
  }

  public fetchAboutPage = async (): Promise<AboutPage> => {
    const response: Response = await fetch(`${apiUrl}/about-page`);
    const aboutPage: AboutPage = await response.json();
    this.setState({
      aboutPage: aboutPage,
    });
    return aboutPage;
  };

  public render(): JSX.Element {
    const { aboutPage } = this.state;
    return (
      <div className={`Top`}>
        <div className="stickers">
          <Sticker i={1} x={0} y={0} />
          <Sticker i={3} x={80} y={-32} />
          <Sticker i={2} x={-100} y={62} />
          <Sticker i={1} x={109} y={26} />
          <Sticker i={2} x={309} y={86} />
          <Sticker i={3} x={309} y={-6} />
        </div>
        <div className="background"></div>
        <div className="person-wrapper">
          <div className="person"></div>
        </div>
        <div className="Top-area">
          <div className="about-wrapper">
            <div className="about">
              <h2>
                <span>{aboutPage?.titleWhitePart}</span>{" "}
                <span>{aboutPage?.titleBluePart}</span>
              </h2>
              <div className="details-wrapper">
                <p className="details">{aboutPage?.description}</p>
              </div>
              <div className="button-wrapper">
                <Link to="/#articles">
                  <button className="read-more-button">Czytaj więcej...</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Top;
