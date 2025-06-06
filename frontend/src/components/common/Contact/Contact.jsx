import "./Contact.scss";
import Maps from "@/components/common/Maps/Maps";
import Vk from "@/assets/icons/vk.svg";
import Ok from "@/assets/icons/ok.svg";
import Telegram from "@/assets/icons/telegram.svg";
import Whatsapp from "@/assets/icons/whatsapp.svg";

export default function Contact() {
  return (
    <section className="contact">
      <div className="container">
        <h1 className="contact__title">свяжитесь с нами</h1>
        <div className="about__contacts">
          <div className="about__contacts-grid">
            <div className="about__contacts-block">
              <h4 className="about__contacts-title">СВЯЗАТЬСЯ С НАМИ</h4>
              <div className="about__contacts-block-icon">
                <img src={Ok} alt="" />
                <img src={Vk} alt="" />
                <img src={Telegram} alt="" />
                <img src={Whatsapp} alt="" />
              </div>
            </div>
            <div className="about__contacts-block">
              <h4 className="about__contacts-title">КОНТАКТЫ</h4>
              <p className="about__contacts-desc">
                + 8 (495) 626-26-96
                <br />
                +8 (925) 826-26-96
                <br />
                anextourchertanovo@gmail.com
              </p>
            </div>
            <div className="about__contacts-block">
              <h4 className="about__contacts-title">АДРЕС</h4>
              <p className="about__contacts-desc">
                Москва, Россошанский проезд,
                <br />
                дом 3, (1‑й этаж)
              </p>
            </div>
          </div>
        </div>
        <Maps />
      </div>
    </section>
  );
}
