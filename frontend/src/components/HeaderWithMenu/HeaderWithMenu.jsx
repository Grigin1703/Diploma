import { useState, useRef} from "react";
import Header from "../Header/Header";
import Dropdawn from "../Dropdawn/Dropdawn";

export default function HeaderWithMenu() {
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
      <Header toggleMenu={toggleMenu} buttonRef={buttonRef}/>
      <Dropdawn isOpen={isMenuOpen} closeMenu={closeMenu} buttonRef={buttonRef} />
    </>
  );
}
