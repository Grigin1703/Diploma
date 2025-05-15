import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { LoadingProvider } from "@/context/LoadingContext.jsx";
import "./styles/global.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoadingProvider>
    <App />
  </LoadingProvider>
);
