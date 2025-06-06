import Button from "@/components/ui/Button/Button";
import ButtonIcon from "@/assets/icons/arrow-white.svg";
import "./Spam2.scss";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subscribeSchema } from "@/validation/subscribeSchema";
import { handleSubscribe } from "@/api/order";

export default function Spam2() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(subscribeSchema),
  });
  return (
    <section className="spam2">
      <div className="container">
        <div className="spam2__content">
          <strong className="spam2__title">
            МЫ ПОМОЖЕМ СОЗДАТЬ ВАШЕ ПУТЕШЕСТВИЕ
          </strong>
          <p className="spam2__desc">
            Оставьте заявку на подбор идеального путешествия
          </p>
          <form
            onSubmit={handleSubmit((data) => {
              handleSubscribe(data.email);
              reset();
            })}
            className="spam__form"
            data-error={errors.email && errors.email.message}
          >
            <input
              type="email"
              {...register("email")}
              className="spam2__input"
              placeholder="Email"
            />
            <Button children={"отправить"} icon={ButtonIcon} />
          </form>
        </div>
      </div>
    </section>
  );
}
