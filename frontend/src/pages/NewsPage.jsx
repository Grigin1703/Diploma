import NewsFull from "@/components/NewsFull/NewsFull";
import Footer from "@/components/Footer/Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getIdNews } from "@/api/tours";
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
