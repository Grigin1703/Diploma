import NewsFull from "@/components/pages/NewsFull/NewsFull";
import Footer from "@/components/layout/Footer/Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getIdNews } from "@/api/news";
export default function NewsPage() {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      const data = await getIdNews(id);
      setNews(data);
    };
    fetchTour();
  }, [id]);
  return (
    <div className="newsPage">
      <NewsFull news={news} />
      <Footer/>
    </div>
  );
}
