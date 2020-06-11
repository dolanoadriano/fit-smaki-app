import * as React from "react";
import { Link } from "react-router-dom";
import { IArticlePreviewState } from "./IArticlePreviewState";
import { IArticlePreviewProps } from "./IArticlePreviewProps";
import "./ArticlePreview.scss";
import { getImageUrl } from "../../../utils";

class ArticlePreview extends React.Component<
  IArticlePreviewProps,
  IArticlePreviewState
> {
  constructor(props: IArticlePreviewProps) {
    super(props);
    this.state = {};
  }

  public handleArticlePreviewClick = () => {
    this.props.onSelect && this.props.onSelect(this.props.article);
  };

  public getDate = (datetime: Date): string => {
    let [date, time] = datetime.toString().split("T");
    time = time.split(".")[0];
    return `${date} ${time}`;
  };

  public render(): JSX.Element {
    const { article, isRead } = this.props;
    return (
      <Link
        to={`/articles/${article.id}/#content`}
        className={`ArticlePreview`}
        onClick={this.handleArticlePreviewClick}
      >
        <div className="timeline">
          <div className="line"></div>
          <div className={`pointer ${isRead ? "read" : "un-read"}`}>
            <div className="pulsator"></div>
          </div>
        </div>
        <div className="cover">
          <div className="shadow"></div>
          <div
            className="image"
            style={{ backgroundImage: `url(${getImageUrl(article.image)})` }}
          ></div>
        </div>
        <div className="content">
          <div className="title">
            <h2>{article.title}</h2>
          </div>
          <div className="date">
            <span>{this.getDate(article.created_at)}</span>
          </div>
          <div className="description-preview">
            <p>{article.content.substring(0, 300)}...</p>
          </div>
        </div>
      </Link>
    );
  }
}

export default ArticlePreview;
