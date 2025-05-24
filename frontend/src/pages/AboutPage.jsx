import HeaderWithMenu from "@/components/HeaderWithMenu/HeaderWithMenu";
import Hero from "@/components/Hero/Hero";
import Img1 from "@/assets/images/home/about/img-1.png";
import Img2 from "@/assets/images/home/about/img-2.png";
import Footer from "@/components/Footer/Footer";

import { HeroContent } from "@/data/data";

export default function AboutPage() {
  return (
    <div className="aboutPage">
      <HeaderWithMenu />
      <main>
        <Hero
          search={HeroContent[5].search}
          title={HeroContent[5].title}
          imgBg={HeroContent[5].imgBg}
          disc={HeroContent[5].disc}
        />
        <section style={{ marginTop: 80, marginBottom: 80 }}>
          <div className="container">
            <div className="about__content">
              <div className="about__block">
                <p className="about__block-desc">
                  <span>МЫ</span> — команда профессионалов, влюбленных в
                  искусство путешествий. Наша история началась с мечты о том,
                  чтобы сделать каждое путешествие незабываемым, каждое
                  приключение уникальным.
                  <br />
                  <br />
                  Наша миссия — сделать путешествия доступными и незабываемыми.
                  Мы предлагаем вам не просто туры, а волшебные истории, которые
                  будут жить в вашем сердце навсегда. Независимо от того, ищете
                  ли вы релакс на пляже, культурные изыски или экстремальные
                  приключения, мы создадим для вас оптимальное путешествие,
                  подстроенное под ваши уникальные желания.
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
                  Мы гордимся нашей командой опытных специалистов, каждый из
                  которых разделяет страсть к туризму и стремление сделать ваше
                  путешествие незабываемым. Мы внимательно следим за последними
                  тенденциями в индустрии, чтобы предложить вам только лучшие и
                  самые актуальные варианты.
                </p>
              </div>
              <div className="about__block">
                <p className="about__block-desc">
                  Присоединяйтесь к нам в этом захватывающем путешествии! Мы
                  готовы подарить вам моменты радости, вдохновения и удивления в
                  каждом уголке нашего удивительного мира.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
}
