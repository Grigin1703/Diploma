import Button from "../Button/Button";
import ButtonIcon from "../../assets/icons/arrow-white.svg";
import "./Spam.scss";

export default function Spam() {
  return (
    <section className="spam">
      <div className="container">
        <div className="spam__content">
          <strong className="spam__title">не определились с выбором?</strong>
          <p className="spam__desc">
            Оставьте свой номер и наш специалист поможет вам с подбором тура
          </p>
          <input type="email" className="spam__input" placeholder="Email" />
          <Button
            children={"отправить"}
            icon={ButtonIcon}
            onClick={() => alert("Йоу")}
          />
        </div>
      </div>
    </section>
  );
}
