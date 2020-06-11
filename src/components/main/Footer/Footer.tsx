import * as React from "react";
import { IFooterState } from "./IFooterState";
import { IFooterProps } from "./IFooterProps";
import "./Footer.scss";
import Header from "../../utils/Header/Header";
import { AboutMe, apiUrl, Contact } from "../../../utils";

class Footer extends React.Component<IFooterProps, IFooterState> {
  constructor(props: IFooterProps) {
    super(props);
    this.state = {
      aboutMe: undefined,
      contact: undefined,
    };
  }

  componentDidMount() {
    this.fetchAboutMe();
    this.fetchContact();
  }

  fetchAboutMe = async (): Promise<AboutMe | undefined> => {
    const response: Response = await fetch(`${apiUrl}/about-me`);
    const aboutMe: AboutMe | undefined = await response.json();
    this.setState({
      aboutMe: aboutMe,
    });
    return aboutMe;
  };

  fetchContact = async (): Promise<Contact | undefined> => {
    const response: Response = await fetch(`${apiUrl}/contact`);
    const contact: Contact | undefined = await response.json();
    this.setState({
      contact,
    });
    return contact;
  };

  public render(): JSX.Element {
    const { aboutMe, contact } = this.state;
    return (
      <div className={`Footer`}>
        <div id="contact" className="anchor"></div>
        <div className="Footer-area">
          <div className="left-side">
            <Header>O mnie</Header>
            <div className="about-me">
              <div className="avatar-wrapper">
                <div className="avatar"></div>
              </div>
              <div className="content-wrapper">
                <h3>{aboutMe?.header}</h3>
                <p className="content">{aboutMe?.description}</p>
              </div>
            </div>
          </div>
          <div className="right-side">
            <Header>Odwiedź mój Instagram</Header>
            <div className="instagram-area">
              <iframe
                src={contact?.instagramUrl}
                width="470"
                height="54"
                frameBorder="0"
                scrolling="no"
              ></iframe>
            </div>
            <Header>Kontakt</Header>
            <div className="contacts">
              <div className="contact-area">
                <div className="icon">
                  <i className="icon-mail-alt"></i>
                </div>
                <div className="content">
                  <span>{contact?.mailContact}</span>
                </div>
              </div>
              <div className="contact-area">
                <div className="icon">
                  <i className="icon-user"></i>
                </div>
                <div className="content">
                  <span>{contact?.alternativeContact}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
