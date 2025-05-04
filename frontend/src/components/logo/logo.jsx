import { Link } from "react-router-dom";
import "./logo.scss";
import logo from "../../assets/logo/logo.svg";

export default function Logo() {
  return (
    <Link to="/">
      <img className="logo" src={logo} alt="logo" />
    </Link>
  );
}
