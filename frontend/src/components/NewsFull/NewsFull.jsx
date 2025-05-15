import "./NewsFull.scss";
import Hero from "@/components/Hero/Hero";
import Header from "@/components/HeaderWithMenu/HeaderWithMenu";

export default function NewsFull({ news }) {
  if (!news || news.length === 0) {
    return <div>Загрузка...</div>;
  }
  return (
    <>
      <Header />
      <main>
        <Hero imgBg={news[0].image} title={news[0].title} search={false} />
        <section className="news">
          <div className="container">
            <ul className="news__list">
              {news[0].content.map((item, index) => (
                <li key={index} className="news__item">
                  {Array.isArray(item.text) &&
                    item.text.length > 0 &&
                    item.text.map((block, i) => (
                      <div key={i} className="news__item-block">
                        {block.title && (
                          <h3 className="news__item-title">{block.title}</h3>
                        )}
                        {block.desc && (
                          <p className="news__item-text">{block.desc}</p>
                        )}
                      </div>
                    ))}
                  {Array.isArray(item.img) &&
                    item.img.length > 0 &&
                    item.img.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt={`news-img-${i}`}
                        className="news__item-img"
                      />
                    ))}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
