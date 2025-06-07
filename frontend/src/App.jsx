import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import GlobalLoader from "@/components/ui/GlobalLoader/GlobalLoader";
import Home from "./pages/HomePage";
import Tours from "./pages/ToursPage";
import Countries from "./pages/CountriesPage";
import TourCardAll from "./pages/TourCardAllPage";
import NewsPage from "./pages/NewsPage";
import ContactPage from "./pages/СontactPage";
import AboutPage from "./pages/AboutPage";
import AdminNewsPage from "./pages/AdminNewsPage";
import PrivateRoute from "@/components/Admin/common/PrivateRoute/PrivateRoute";
import FormAdmin from "@/components/Admin/form/FormAdmin";
import AdminPanel from "./pages/AdminPanelPage";
import AdminTourPage from "./pages/AdminTourPage";

export default function App() {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  useEffect(() => {
    const hendleKeyDown = (e) => {
      if (e.shiftKey && e.key === "A") {
        setIsLoginVisible((prev) => !prev);
      }
    };

    window.addEventListener("keydown", hendleKeyDown);

    return () => {
      window.removeEventListener("keydown", hendleKeyDown);
    };
  }, []);
  return (
    <>
      <GlobalLoader />
      <Router>
        {isLoginVisible && (
          <FormAdmin onClose={() => setIsLoginVisible(false)} />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Tours" element={<Tours />} />
          <Route path="/HotTours" element={<Tours hot />} />
          <Route path="/Countries" element={<Countries />} />
          <Route path="/Tours/:id" element={<TourCardAll />} />
          <Route path="/Tours/news/:id" element={<NewsPage />} />
          <Route path="/Contact" element={<ContactPage />} />
          <Route path="/About" element={<AboutPage />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/edit/:id"
            element={
              <PrivateRoute>
                <AdminTourPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/add"
            element={
              <PrivateRoute>
                <AdminTourPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/news/edit/:id"
            element={
              <PrivateRoute>
                <AdminNewsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/news/add"
            element={
              <PrivateRoute>
                <AdminNewsPage addNews />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
