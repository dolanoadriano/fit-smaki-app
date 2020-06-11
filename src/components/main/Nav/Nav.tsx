import * as React from "react";
import { INavState } from "./INavState";
import { INavProps } from "./INavProps";
import "./Nav.scss";
import { withRouter, RouteComponentProps } from "react-router";
import pathValues from "./paths.json";
import { HashLink as Link } from "react-router-hash-link";

class Nav extends React.Component<RouteComponentProps<INavProps>, INavState> {
  constructor(props: RouteComponentProps<INavProps>) {
    super(props);
    this.state = { isFixed: false };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = (event: any) => {
    if (window.scrollY < 534 && this.state.isFixed === true) {
      this.setState({ isFixed: false });
    } else if (window.scrollY >= 534 && this.state.isFixed !== true) {
      this.setState({ isFixed: true });
    }
  };

  getPathValueById = (path: any): string => {
    return path;
  };

  renderNav = (): Array<JSX.Element> => {
    const { location, match } = this.props;

    const paths: Array<string> = location.pathname
      .split("/")
      .slice(1, location.pathname.length)
      .filter((path: string) => path.length > 0);
    const navigation: Array<JSX.Element> = [];
    navigation.push(
      <>
        <Link to={`/#top`}>
          <h3>Fit smaki</h3>
        </Link>
        <span className="ormament">/</span>
      </>
    );
    for (let path of paths) {
      navigation.push(
        <>
          <Link
            key={path}
            to={
              (pathValues[path as "articles"] &&
                pathValues[path as "articles"].url) ||
              "#content"
            }
          >
            <h3>
              {(pathValues[path as "articles"] &&
                pathValues[path as "articles"].label) ||
                this.getPathValueById(path)}
            </h3>
          </Link>

          <span className="ormament">/</span>
        </>
      );
    }
    return navigation;
  };

  public render(): JSX.Element {
    const { isFixed } = this.state;
    const { location } = this.props;
    return (
      <div className={`Nav`}>
        <div className={`Nav-block ${isFixed ? "fixed" : ""} `}>
          <div className="Nav-area">{this.renderNav()}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(Nav);
