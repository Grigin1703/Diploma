import Button from "../Button/Button";
import ButtonIcon from "../../assets/icons/arrow-white.svg";
import { handleSubscribe } from "@/api/tours";
import { useState } from "react";
import "./Spam.scss";

export default function Spam() {
  const [email, setEmail] = useState("");
  return (
    <section className="spam">
      <div className="container">
        <div className="spam__content">
          <strong className="spam__title">не определились с выбором?</strong>
          <p className="spam__desc">
            Оставьте свою почту и наш специалист поможет вам с подбором тура
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="spam__input"
            placeholder="Email"
          />
          <Button
            children={"отправить"}
            icon={ButtonIcon}
            onClick={() => handleSubscribe(email)}
          />
        </div>
      </div>
    </section>
  );
}
