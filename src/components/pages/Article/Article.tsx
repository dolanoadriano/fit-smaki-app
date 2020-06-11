import * as React from "react";
import { IArticleState } from "./IArticleState";
import { IArticleProps } from "./IArticleProps";
import "./Article.scss";
import Header from "../../utils/Header/Header";
import { withRouter } from "react-router-dom";
import articles from "../Articles/articles.mock.json";
import {
  apiUrl,
  Article,
  scrollToRef,
  localstoargeVersion,
} from "../../../utils";
import { RouteComponentProps } from "react-router";

type Params = {
  id: string | undefined;
};

class ArticleComponent extends React.Component<
  RouteComponentProps<Params>,
  IArticleState
> {
  contentAnchorRef: React.RefObject<HTMLDivElement> = React.createRef();
  constructor(props: RouteComponentProps<Params>) {
    super(props);
    this.state = {
      article: undefined,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    let id: number = Number(match.params.id);
    this.fetchArticle(id);
    this.saveArticleId(id);
    this.scrollToContent();
  }

  componentDidUpdate(oldProps: RouteComponentProps<Params>) {
    const { match } = this.props;
    if (match.params.id !== oldProps.match.params.id) {
      let id: number = Number(match.params.id);
      this.fetchArticle(Number(id));
      this.saveArticleId(id);
      this.scrollToContent();
    }
  }

  saveArticleId = (articleId: number) => {
    console.log(localStorage);
    const readArticleIdsString: string | null = localStorage.getItem(
      `${localstoargeVersion}-readArticleIds`
    );
    const readArticleIds: Array<number> = readArticleIdsString
      ? JSON.parse(readArticleIdsString)
      : [];
    const articleIdIndex: number = readArticleIds.findIndex(
      (readArticleId: number, i: number) => articleId === readArticleId
    );
    if (articleIdIndex !== -1) return;
    try {
      localStorage.setItem(
        `${localstoargeVersion}-readArticleIds`,
        JSON.stringify([...readArticleIds, articleId])
      );
    } catch (e) {
      console.error(e);
    }
  };

  scrollToContent = () => {
    window.scroll(0, 538);
  };

  fetchArticle = async (articleId: number): Promise<Article | undefined> => {
    let article: Article | undefined = undefined;
    try {
      const response: Response = await fetch(`${apiUrl}/articles/${articleId}`);
      article = await response.json();

      this.setState({ article: article });
    } catch (e) {
      return undefined;
    }
    return article;
  };

  public render(): JSX.Element {
    const { article } = this.state;
    return (
      <div className={`Article`}>
        <div id="content" ref={this.contentAnchorRef} className="anchor"></div>
        <Header isBig={true}>{article?.title}</Header>
        <article>{article?.content}</article>
      </div>
    );
  }
}

export default withRouter(ArticleComponent);
