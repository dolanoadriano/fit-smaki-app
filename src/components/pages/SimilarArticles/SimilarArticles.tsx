import * as React from "react";
import { ISimilarArticlesState } from "./ISimilarArticlesState";
import { ISimilarArticlesProps } from "./ISimilarArticlesProps";
import "./SimilarArticles.scss";
import ArticlePreview from "../ArticlePreview/ArticlePreview";
import ArticleMini from "../ArticleMini/ArticleMini";
import { Article } from "../../../utils";

class SimilarArticles extends React.Component<
  ISimilarArticlesProps,
  ISimilarArticlesState
> {
  constructor(props: ISimilarArticlesProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate() {}

  renderArticles = () => {
    if (!this.props.articles) return;
    const { articleId, articles } = this.props;

    const articleIndex: number = articles.findIndex(
      (article: Article) => article.id === Number(articleId)
    );

    const shift: number =
      articleIndex > 0 ? (articleIndex < articles.length - 1 ? -1 : -3) : 1;
    return articles
      .slice(articleIndex + shift, articleIndex + shift + 4)
      .filter((article: Article) => article.id !== Number(articleId))
      .map((article: Article, i: number) => <ArticleMini article={article} />);
  };

  public render(): JSX.Element {
    const { articleId, articles } = this.props;

    return <div className={`SimilarArticles`}>{this.renderArticles()}</div>;
  }
}

export default SimilarArticles;
