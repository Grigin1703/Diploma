import Button from "@/components/ui/Button/Button";
import ButtonIcon from "@/assets/icons/arrow-white.svg";
import { handleSubscribe } from "@/api/order";
import "./Spam.scss";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subscribeSchema } from "@/validation/subscribeSchema";

export default function Spam() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(subscribeSchema),
  });

  return (
    <section className="spam">
      <div className="container">
        <div className="spam__content">
          <strong className="spam__title">не определились с выбором?</strong>
          <p className="spam__desc">
            Оставьте свою почту и наш специалист поможет вам с подбором тура
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
              className="spam__input"
              placeholder="Email"
            />

            <Button children={"отправить"} icon={ButtonIcon} />
          </form>
        </div>
      </div>
    </section>
  );
}
