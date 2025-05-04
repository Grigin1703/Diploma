import Button from "../Button/Button";
import ButtonIcon from "../../assets/icons/arrow-white.svg";
import "./Spam2.scss";


export default function Spam2() {
  return (
    <section className="spam2">
      <div className="container">
        <div className="spam2__content">
          <strong className="spam2__title">МЫ ПОМОЖЕМ СОЗДАТЬ ВАШЕ ПУТЕШЕСТВИЕ</strong>
          <p className="spam2__desc">
          Оставьте заявку на подбор идеального путешествия
          </p>
          <input type="email" className="spam2__input" placeholder="Email" />
          <Button
            children={"отправить"}
            icon={ButtonIcon}
            onClick={() => alert("Clen")}
          />
        </div>
      </div>
    </section>
  );
}
