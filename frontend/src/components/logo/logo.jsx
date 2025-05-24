import { Link } from "react-router-dom";
import "./logo.scss";
import logo from "../../assets/logo/logo.svg";
import logoFooter from "../../assets/logo/logo-footer.svg";

export default function Logo({ admin, footer }) {
  return (
    <Link to={admin ? "/admin" : "/"}>
      <img className={footer ? "logo__footer" : "logo"} src={footer ? logoFooter : logo} alt="logo" />
    </Link>
  );
}
