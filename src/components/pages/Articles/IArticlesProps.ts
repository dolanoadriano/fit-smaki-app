import { Article } from "../../../utils";

export interface IArticlesProps {
  articles?: Array<Article>;
  onSelectArticle?: (article: Article) => void;
}
