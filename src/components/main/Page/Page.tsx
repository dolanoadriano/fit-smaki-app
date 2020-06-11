import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { IPageState } from "./IPageState";
import { IPageProps } from "./IPageProps";
import "./Page.scss";
import Articles from "../../pages/Articles/Articles";
import Curiosities from "../../pages/Curiosities/Curiosities";
import Quote from "../../pages/Quote/Quote";
import ArticleComponent from "../../pages/Article/Article";
import Header from "../../utils/Header/Header";
import Emoji from "../Emoji/Emoji";
import { Article, apiUrl } from "../../../utils";
import ArticleMini from "../../pages/ArticleMini/ArticleMini";
import SimilarArticles from "../../pages/SimilarArticles/SimilarArticles";
import {
  withRouter,
  RouteComponentProps,
  matchPath,
  match,
} from "react-router";

type Params = {
  id?: string;
};

class Page extends React.Component<RouteComponentProps<Params>, IPageState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      articles: undefined,
    };
  }

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate() {}

  getMatch = (): match<Params> | null =>
    matchPath(this.props.history.location.pathname, {
      path: "/articles/:id",
      exact: true,
      strict: false,
    }) as match<Params>;

  getArticleId = (): string | undefined => {
    const match: match<Params> | null = this.getMatch();
    return match ? match.params.id : undefined;
  };

  public fetchArticles = async (): Promise<Array<Article>> => {
    const response: Response = await fetch(`${apiUrl}/articles`);
    const articles: Array<Article> = await response.json();
    this.setState({ articles: articles });
    return articles;
  };

  public render(): JSX.Element {
    return (
      <div className={`Page`}>
        <div className="Page-area">
          <Switch>
            <Route path="/articles/:id">
              <div className="article-page left-side">
                <ArticleComponent />
              </div>
              <div className="article-page right-side">
                <Header>Zobacz inne:</Header>
                <SimilarArticles
                  articleId={this.getArticleId()}
                  articles={this.state.articles}
                />
              </div>
            </Route>
            <Route path="/">
              <div className="left-side">
                <Articles articles={this.state.articles} />
              </div>
              <div className="right-side">
                <Curiosities />
                <Quote />
                <Emoji />
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(Page);
