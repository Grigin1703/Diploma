import { useState, useRef } from "react";
import Nav from "./Nav/Nav";
import Logo from "./logo/logo";
import Dropdawn from "./Dropdawn/Dropdawn";
import Button from "@/components/ui/Button/Button";

import location from "@/assets/icons/location.svg";
import tel from "@/assets/icons/tel.svg";

import "./Header.scss";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <>
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
            <div className="header__icon-tel">
              <img className="header__icon-btn-img" src={tel} alt="" />
              <div className="header__icon-dropdown">
                <div className="header__dropdown-wrapper">
                  <span>+ 8 (495) 626-26-96</span>
                  <span>+ 8 (925) 826-26-96</span>
                </div>
              </div>
            </div>
            <div className="header__icon-loc">
              <img className="header__icon-btn-img" src={location} alt="" />
              <div className="header__icon-dropdown">
                <div className="header__dropdown-wrapper">
                  <span>Москва, Россошанский проезд, дом 3, (1‑й этаж)</span>
                </div>
              </div>
            </div>
          </div>
          <button className="dropdawn-btn" onClick={toggleMenu} ref={buttonRef}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
      <Dropdawn isOpen={isMenuOpen} closeMenu={closeMenu} buttonRef={buttonRef}/>
    </>
  );
}
