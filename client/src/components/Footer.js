import FacebookIcon from "@mui/icons-material/Facebook";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link, NavLink } from "react-router-dom";
import placentic from "../assets/logo/placentic.png";

const Footer = () => {
  return (
    <section className="footer__section">
      <div className="container">
        <div className="footer__content">
          <div className="footer__link">
            <ul className="link__list">
              <li className="link__item">
                <NavLink className="link" to="/term&condition">
                  Term & Condition
                </NavLink>
              </li>
              <li className="link__item">
                <NavLink className="link" to="/policy">
                  Policy
                </NavLink>
              </li>
              <li className="link__item">
                <NavLink className="link" to="/map">
                  Map
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="footer__logo">
            <Link to="/">
              <img className="logo" src={placentic} alt="brand-logo" />
            </Link>

            <span className="footer__text">
              © {new Date().getFullYear()}{" "}
              <Link className="brand__link" to="/">
                Placentic
              </Link>{" "}
              | All Rights Resevered.
            </span>
          </div>
          <div className="footer__social">
            <span className="social__text">Follow us on social</span>

            <ul className="social__list">
              <li className="social__item">
                <NavLink className="social__link" to="/map">
                  <TwitterIcon />
                </NavLink>
              </li>
              <li className="social__item">
                <NavLink className="social__link" to="/map">
                  <FacebookIcon />
                </NavLink>
              </li>
              <li className="social__item">
                <NavLink className="social__link" to="/map">
                  <RssFeedIcon />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
