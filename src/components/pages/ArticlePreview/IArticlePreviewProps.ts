import { Article } from "../../../utils";

export interface IArticlePreviewProps {
  isRead: boolean;
  article: Article;
  onSelect?: (article: Article) => void;
}
