import { Link } from "react-router-dom";
import "./logo.scss";
import logo from "../../assets/logo/logo.svg";

export default function Logo({ admin }) {
  return (
    <Link to={admin ? "/admin" : "/"}>
      <img className="logo" src={logo} alt="logo" />
    </Link>
  );
}
