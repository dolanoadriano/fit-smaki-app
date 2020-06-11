import * as React from "react";
import { IMenuState } from "./IMenuState";
import { IMenuProps } from "./IMenuProps";
import { NavHashLink as Link } from "react-router-hash-link";
import "./Menu.scss";
import options from "./options.json";
import { withRouter, RouteComponentProps } from "react-router";

type Option = {
  name: string;
  path: string;
  pathType: "internal" | "external";
  className: string | null;
};

class Menu extends React.Component<RouteComponentProps, IMenuState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const { history, location } = this.props;
    const { activeTab } = this.state;
    if (activeTab !== 0 && window.scrollY >= 0 && window.scrollY < 450) {
      history.push("#top");
      this.setState({
        activeTab: 0,
      });
    } else if (
      activeTab !== 1 &&
      window.scrollY >= 450 &&
      window.scrollY < 900
    ) {
      location.pathname === "/"
        ? history.push("#articles")
        : history.push("#content");
      this.setState({
        activeTab: 1,
      });
    } else if (activeTab !== 3 && window.scrollY >= 900) {
      history.push("#contact");
      this.setState({
        activeTab: 3,
      });
    }
  };

  componentDidUpdate() {}

  handleButtonClick = (i: number) => {
    this.setState({
      activeTab: i,
    });
  };

  public renderOptions = (): Array<JSX.Element> => {
    const { activeTab } = this.state;
    return options.map((option: Option | any, i: number) => {
      return option.pathType === "internal" ? (
        <Link to={option.path} key={i}>
          <button
            className={`option ${option.className} ${
              activeTab == i ? "active" : ""
            }`}
            onClick={() => {
              this.handleButtonClick(i);
            }}
          >
            {option.name}
          </button>
        </Link>
      ) : (
        <a href={option.path} key={i} target="_blank">
          <button className={`option ${option.className}`}>
            {option.name}
          </button>
        </a>
      );
    });
  };

  public render(): JSX.Element {
    const { activeTab } = this.state;
    return (
      <div className={`Menu`}>
        <div className={`Menu-area`}>
          <div className="left">
            <Link to="/#top">
              <h1 className="logo">
                <span>Fit</span> <span>smaki</span>
              </h1>
            </Link>
          </div>
          <div className="right">{this.renderOptions()}</div>
        </div>
        <div className="bar">
          <div className="inner"></div>
        </div>
      </div>
    );
  }
}

export default withRouter(Menu);
