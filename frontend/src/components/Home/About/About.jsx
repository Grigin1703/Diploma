import "./about.scss";
import Img1 from '../../../assets/images/home/about/img-1.png';
import Img2 from '../../../assets/images/home/about/img-2.png';
import Vk from '../../../assets/icons/vk.svg';
import Ok from '../../../assets/icons/ok.svg';
import Telegram from '../../../assets/icons/telegram.svg';
import Whatsapp from '../../../assets/icons/whatsapp.svg';

export default function About() {
  return (
    <section className="about">
      <div className="container">
        <div className="about__title-block">
          <h2 className="about__title">о нас</h2>
          <span className="about__subtitle">Вдохновляем мир на путешествия</span>
        </div>
        <div className="about__content">
          <div className="about__block">
            <p className="about__block-desc">
              <span>МЫ</span> — команда профессионалов, влюбленных в искусство
              путешествий. Наша история началась с мечты о том, чтобы сделать
              каждое путешествие незабываемым, каждое приключение уникальным.
              <br />
              <br />
              Наша миссия — сделать путешествия доступными и незабываемыми. Мы
              предлагаем вам не просто туры, а волшебные истории, которые будут
              жить в вашем сердце навсегда. Независимо от того, ищете ли вы
              релакс на пляже, культурные изыски или экстремальные приключения,
              мы создадим для вас оптимальное путешествие, подстроенное под ваши
              уникальные желания.
            </p>
          </div>
          <div className="about__block">
            <img src={Img1} alt="" />
          </div>
          <div className="about__block">
            <img src={Img2} alt="" />
          </div>
          <div className="about__block">
            <p className="about__block-desc">
              Мы гордимся нашей командой опытных специалистов, каждый из которых
              разделяет страсть к туризму и стремление сделать ваше путешествие
              незабываемым. Мы внимательно следим за последними тенденциями в
              индустрии, чтобы предложить вам только лучшие и самые актуальные
              варианты.
            </p>
          </div>
          <div className="about__block">
            <p className="about__block-desc">
              Присоединяйтесь к нам в этом захватывающем путешествии! Мы готовы
              подарить вам моменты радости, вдохновения и удивления в каждом
              уголке нашего удивительного мира.
            </p>
          </div>
        </div>
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
      </div>
    </section>
  );
}
