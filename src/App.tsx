import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import Menu from "./components/main/Menu/Menu";
import Top from "./components/main/Top/Top";
import Nav from "./components/main/Nav/Nav";
import Page from "./components/main/Page/Page";
import Footer from "./components/main/Footer/Footer";
import Loading from "./components/utils/Loading/Loading";
import { BrowserRouter as Router } from "react-router-dom";

type AppProps = {};

type AppState = {
  isLoading: boolean;
};

class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    isLoading: false,
  };
  constructor(appProps: AppProps) {
    super(appProps);
  }
  render(): JSX.Element {
    const { isLoading } = this.state;
    return (
      <Router>
        <div className="App">
          <div id="top" className="anchor"></div>
          {isLoading && <Loading />}
          <Menu />
          <Top />
          <Nav />
          <Page />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
