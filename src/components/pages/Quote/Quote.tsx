import * as React from "react";
import { IQuoteState } from "./IQuoteState";
import { IQuoteProps } from "./IQuoteProps";
import "./Quote.scss";
import Header from "../../utils/Header/Header";
import { apiUrl, Quote } from "../../../utils";

class QuoteComponent extends React.Component<IQuoteProps, IQuoteState> {
  constructor(props: IQuoteProps) {
    super(props);
    this.state = {
      quote: undefined,
    };
  }

  componentDidMount() {
    this.fetchQuote();
  }

  fetchQuote = async (): Promise<Quote | undefined> => {
    const response: Response = await fetch(`${apiUrl}/quote`);
    const quote: Quote | undefined = await response.json();
    this.setState({ quote: quote });
    return quote;
  };

  public render(): JSX.Element {
    const { quote } = this.state;
    return (
      <div className={`Quote`}>
        <Header>Cytat</Header>

        <div className="quote-area">
          <p className="quote-content">
            <i className="icon-quote-left" /> {quote?.content}
          </p>
          <div className="quote-author">
            <span>{quote?.author}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default QuoteComponent;
