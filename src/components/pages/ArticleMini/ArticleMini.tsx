import * as React from "react";
import { IArticleMiniState } from "./IArticleMiniState";
import { IArticleMiniProps } from "./IArticleMiniProps";
import "./ArticleMini.scss";
import { Article, apiUrl, getImageUrl } from "../../../utils";
import { HashLink as Link } from "react-router-hash-link";

class ArticleMini extends React.Component<
  IArticleMiniProps,
  IArticleMiniState
> {
  constructor(props: IArticleMiniProps) {
    super(props);
    this.state = {
      article: undefined,
    };
  }

  componentDidMount() {}

  componentDidUpdate(oldProps: IArticleMiniProps) {}

  public render(): JSX.Element {
    const { article } = this.props;
    return (
      <Link to={`/articles/${article?.id}/#content`}>
        <div className={`ArticleMini`}>
          <div className="cover">
            <div className="shadow"></div>
            <div
              className="image"
              style={{
                backgroundImage: `url(${
                  article && getImageUrl(article.image)
                })`,
              }}
            ></div>
          </div>
          <div className="title">
            <h3>{article?.title}</h3>
          </div>
        </div>
      </Link>
    );
  }
}

export default ArticleMini;
