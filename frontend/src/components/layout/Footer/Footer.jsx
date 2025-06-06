import "./Footer.scss";
import { handleSubscribe } from "@/api/order";
import Nav from "../header/Nav/Nav";
import Logo from "../header/logo/logo";
import EmailIcon from "@/assets/icons/email.svg";
import Arrow from "@/assets/icons/arrow-white.svg";
import Ok from "@/assets/icons/ok-f.svg";
import Telega from "@/assets/icons/telegram-f.svg";
import Vk from "@/assets/icons/vk-f.svg";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subscribeSchema } from "@/validation/subscribeSchema";

export default function Footer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(subscribeSchema),
  });
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__header">
          <Logo footer />
          <form
            onSubmit={handleSubmit((data) => {
              handleSubscribe(data.email);
              reset();
            })}
            className="footer__content-block"
            data-desc="Узнавайте о горящих турах первыми"
            noValidate
          >
            <img src={EmailIcon} alt="" />
            <input
              type="email"
              {...register("email")}
              placeholder="Введите почту"
            />
            <button type="submit">
              <img src={Arrow} alt="" />
            </button>
          </form>
          {errors.email && <span style={{color: "white"}}>{errors.email.message}</span>}
        </div>
        <Nav footer />
        <div className="footer__footer">
          <img src={Ok} alt="" />
          <img src={Telega} alt="" />
          <img src={Vk} alt="" />
        </div>
      </div>
    </footer>
  );
}
