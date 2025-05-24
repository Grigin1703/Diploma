import "./Footer.scss";
import { handleSubscribe } from "@/api/tours";
import { useState } from "react";
import Nav from "../Nav/Nav";
import Logo from "@/components/logo/logo";
import EmailIcon from "@/assets/icons/email.svg";
import Arrow from "@/assets/icons/arrow-white.svg";
import Ok from "@/assets/icons/ok-f.svg";
import Telega from "@/assets/icons/telegram-f.svg";
import Vk from "@/assets/icons/vk-f.svg";

export default function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__header">
          <Logo footer />
          <div
            className="footer__content-block"
            data-desc="Узнавайте о горящих турах первыми"
          >
            <img src={EmailIcon} alt="" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите почту"
            />
            <button onClick={() => handleSubscribe(email)}>
              <img src={Arrow} alt="" />
            </button>
          </div>
        </div>
        <Nav footer />
        <div className="footer__footer">
          <img src={Ok} alt="" />
          <img src={Telega} alt="" />
          <img src={Vk} alt="" />
        </div>
      </div>
    </footer>
  );
}
