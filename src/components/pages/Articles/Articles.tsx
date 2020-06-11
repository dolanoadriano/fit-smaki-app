import * as React from "react";
import { IArticlesState } from "./IArticlesState";
import { IArticlesProps } from "./IArticlesProps";
import "./Articles.scss";
import { HashLink as Link } from "react-router-hash-link";
import ArticlePreview from "../ArticlePreview/ArticlePreview";
import Header from "../../utils/Header/Header";
import {
  Article,
  apiUrl,
  randomInteger,
  localstoargeVersion,
} from "../../../utils";

class Articles extends React.Component<IArticlesProps, IArticlesState> {
  public static readonly pageRange: number = 4;
  public articlesRef: React.RefObject<HTMLDivElement> = React.createRef();
  constructor(props: IArticlesProps) {
    super(props);
    this.state = {
      currentPage: 1,
      readArticleIds: [],
    };
  }

  public componentDidMount() {
    this.loadReadArticlesId();
  }

  public loadReadArticlesId = (): void => {
    try {
      const readArticleIdsString: string | null = localStorage.getItem(
        `${localstoargeVersion}-readArticleIds`
      );
      const readArticleIds: Array<number> = readArticleIdsString
        ? JSON.parse(readArticleIdsString)
        : [];
      this.setState({
        readArticleIds: readArticleIds,
      });
    } catch (e) {
      console.error(e);
    }
  };

  public handleSelectArticlePreview = (article: Article): void => {
    this.props.onSelectArticle && this.props.onSelectArticle(article);
  };

  public getPagesCount = (articles: Array<Article>): number =>
    Math.ceil(
      articles.filter((article: Article) => !article.hidden).length / 4
    );

  public handlePageButtonClick = (page: number) => {
    this.setState({
      currentPage: page,
    });
  };

  public renderPageButtons = (articles: Array<Article>): Array<JSX.Element> => {
    const { currentPage } = this.state;
    const pageButtons: Array<JSX.Element> = [];
    const pageCount: number = this.getPagesCount(articles);
    pageButtons.push(
      <Link to="/#articles">
        <button
          className={`page-button`}
          disabled={currentPage <= 1}
          onClick={() => this.handlePageButtonClick(currentPage - 1)}
        >
          <span>
            <i className="icon-left-open" />
          </span>
        </button>
      </Link>
    );
    for (let page = 1; page <= pageCount; ++page) {
      pageButtons.push(
        <Link to="/#articles">
          <button
            className={`page-button ${page === currentPage ? "active" : ""}`}
            disabled={page === currentPage}
            onClick={() => this.handlePageButtonClick(page)}
            key={page}
          >
            <span>{page}</span>
          </button>
        </Link>
      );
    }
    pageButtons.push(
      <Link to="/#articles">
        <button
          className={`page-button`}
          disabled={currentPage >= pageCount}
          onClick={() => this.handlePageButtonClick(currentPage + 1)}
        >
          <span>
            <i className="icon-right-open" />
          </span>
        </button>
      </Link>
    );
    return pageButtons;
  };

  public render(): JSX.Element {
    const { currentPage, readArticleIds } = this.state;
    const { articles } = this.props;
    const { pageRange } = Articles;
    return (
      <div className={"Articles"} ref={this.articlesRef}>
        <div id="articles" className="anchor"></div>
        <Header>Najnowsze artykuły</Header>

        <div className="articles-list">
          {articles &&
            articles
              .filter((article: Article) => !article.hidden)
              .slice(
                (currentPage - 1) * pageRange,
                (currentPage - 1) * pageRange + pageRange
              )
              .map((article: Article | any, i: number) => (
                <ArticlePreview
                  isRead={
                    readArticleIds.find(
                      (articleId: number) => articleId === article.id
                    )
                      ? true
                      : false
                  }
                  key={i}
                  article={article}
                  onSelect={this.handleSelectArticlePreview}
                />
              ))}
        </div>
        <div className="articles-pages">
          {articles && this.renderPageButtons(articles)}
        </div>
      </div>
    );
  }
}

export default Articles;
