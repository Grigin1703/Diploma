import Nav from "../Nav/Nav";
import Logo from "../logo/logo";
import Button from "../Button/Button";

import location from "../../assets/icons/location.svg";
import tel from "../../assets/icons/tel.svg";

import "./Header.scss";

export default function Header({ toggleMenu, buttonRef }) {
  return (
    <header className="header">
      <div className="container header__container">
        <Logo />
        <Nav />
        <Button
          children="оставить заявку"
          variant="secondary_header"
          onClick={() => alert("Йоу")}
        />
        <div className="header__icon-btn">
          <button>
            <img className="header__icon-btn-img" src={tel} alt="" />
          </button>
          <button>
            <img className="header__icon-btn-img" src={location} alt="" />
          </button>
        </div>
        <button className="dropdawn-btn" onClick={toggleMenu} ref={buttonRef}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
