import WhiteLine from "../../../assets/icons/white-line.svg";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getNews } from "@/api/tours";
import "./News.scss";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import { useLoading } from "@/context/LoadingContext";

export default function News() {
  const { isLoading } = useLoading();
  const [news, setNews] = useState([]);
  const newsRef = useRef();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();
        setNews(data);
      } catch (err) {
        console.error("Ошибка", err);
      }
    };
    fetchNews();
  }, []);

  return (
    <section className="news" ref={newsRef}>
      <div className="container">
        <h2 className="news__title">новости</h2>
        <span className="news__subtitle">события в мире туризма</span>
        <div className="news__grid">
          {isLoading || news.length === 0
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className={`news__grid-block ${
                    index === 0 || index === 4 ? "news__grid-block_big" : ""
                  }`}
                >
                  <div className="news__grid-wrapper">
                    <div className="news__grid-content">
                      <h4 className="news__grid-title">
                        <Skeleton height={80} width="100%" />
                      </h4>
                      <div className="news__grid-read">
                        <span style={{ color: "white" }}>читать</span>
                        <img src={WhiteLine} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : news.slice(0, 6).map((item, index) => (
                <motion.div
                  key={index}
                  whileInView="visible"
                  initial="hidden"
                  viewport={{ amount: 0.25 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className={`news__grid-block ${
                    index == 0 || index == 4 ? "news__grid-block_big" : ""
                  } `}
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <Link to={`/tours/news/${item.id}`}>
                    <div className="news__grid-wrapper">
                      <div className="news__grid-content">
                        <h4 className="news__grid-title">{item.title}</h4>
                        <div className="news__grid-read">
                          <span>читать</span>
                          <img src={WhiteLine} alt="" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}
