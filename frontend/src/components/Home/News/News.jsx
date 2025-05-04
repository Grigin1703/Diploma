import WhiteLine from "../../../assets/icons/white-line.svg";
import { NewsBg } from "../../../data/data";
import "./News.scss";

export default function News() {
  return (
    <section className="news">
      <div className="container">
        <h2 className="news__title">новости</h2>
        <span className="news__subtitle">события в мире туризма</span>
        <div className="news__grid">
          <div
            className="news__grid-block news__grid-block_big"
            style={{ backgroundImage: `url(${NewsBg[0].imgBg})` }}
          >
            <div className="news__grid-content">
              <h4 className="news__grid-title">
                отдых с детьми:
                <br />
                о чем нужно
                <br />
                помнить <br />в путешествии
              </h4>
              <div className="news__grid-read">
                <span>читать</span>
                <img src={WhiteLine} alt="" />
              </div>
            </div>
          </div>
          <div
            className="news__grid-block"
            style={{ backgroundImage: `url(${NewsBg[1].imgBg})` }}
          >
            <div className="news__grid-content">
              <h4 className="news__grid-title">
                ТОП-10 уникальных и завораживающих мест в ОАЭ
              </h4>
              <div className="news__grid-read">
                <span>читать</span>
                <img src={WhiteLine} alt="" />
              </div>
            </div>
          </div>
          <div
            className="news__grid-block"
            style={{ backgroundImage: `url(${NewsBg[2].imgBg})` }}
          >
            <div className="news__grid-content">
              <h4 className="news__grid-title">
                Отдых, близкий к природе и экологии
              </h4>
              <div className="news__grid-read">
                <span>читать</span>
                <img src={WhiteLine} alt="" />
              </div>
            </div>
          </div>
          <div
            className="news__grid-block"
            style={{ backgroundImage: `url(${NewsBg[3].imgBg})` }}
          >
            <div className="news__grid-content">
              <h4 className="news__grid-title">
                богатство культурных и исторических сокровищ разных стран
              </h4>
              <div className="news__grid-read">
                <span>читать</span>
                <img src={WhiteLine} alt="" />
              </div>
            </div>
          </div>
          <div
            className="news__grid-block news__grid-block_big"
            style={{ backgroundImage: `url(${NewsBg[4].imgBg})` }}
          >
            <div className="news__grid-content">
              <h4 className="news__grid-title">
                Как сделать <br />
                путешествие <br />
                незабываемым <br />
                для всех
              </h4>
              <div className="news__grid-read">
                <span>читать</span>
                <img src={WhiteLine} alt="" />
              </div>
            </div>
          </div>
          <div
            className="news__grid-block"
            style={{ backgroundImage: `url(${NewsBg[5].imgBg})` }}
          >
            <div className="news__grid-content">
              <h4 className="news__grid-title">
                путешествия, которые приведут вас в мир высот, глубин и скорости
              </h4>
              <div className="news__grid-read">
                <span>читать</span>
                <img src={WhiteLine} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
