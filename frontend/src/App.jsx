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
// import FormAdmin from "@/components/Admin/FormAdmin/FormAdmin";
// import AdminPanel from "./pages/AdminPanelPage";
// import PrivateRoute from "@/components/Admin/PrivateRoute/PrivateRoute";
// import EditTourPage from "./pages/EditTourPage";
// import AddTourPage from "./pages/AddTourPage";
// import EditNewsPage from "./pages/EditNewsPage"
// import AddNewsPage from "./pages/AddNewsPage"

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
          <Route path="/HotTours" element={<Tours hot/>} />
          <Route path="/Countries" element={<Countries />} />
          <Route path="/Tours/:id" element={<TourCardAll />} />
          <Route path="/Tours/news/:id" element={<NewsPage />} />
          <Route path="/Contact" element={<ContactPage />} />
          <Route path="/About" element={<AboutPage />} />
          {/* <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            }
          /> */}
          {/* <Route
            path="/admin/edit/:id"
            element={
              <PrivateRoute>
                <EditTourPage />
              </PrivateRoute>
            }
          /> */}
          {/* <Route
            path="/admin/add"
            element={
              <PrivateRoute>
                <AddTourPage />
              </PrivateRoute>
            }
          /> */}
          {/* <Route
            path="/admin/news/edit/:id"
            element={
              <PrivateRoute>
                <EditNewsPage />
              </PrivateRoute>
            }
          /> */}
          {/* <Route
            path="/admin/news/add"
            element={
              <PrivateRoute>
                <AddNewsPage />
              </PrivateRoute>
            }
          /> */}
        </Routes>
      </Router>
    </>
  );
}
