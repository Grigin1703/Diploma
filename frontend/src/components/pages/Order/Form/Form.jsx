import "./Form.scss";
import InputMask from "react-input-mask";

import { useForm } from "react-hook-form";
import { forwardRef } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { orederSchema } from "@/validation/orederSchema";
import { subscribeSchema } from "@/validation/subscribeSchema";

const OrderForm = forwardRef((props, ref) => {
  const combinedSchema = z.object({
    ...orederSchema.shape,
    ...subscribeSchema.shape,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(combinedSchema),
  });

  const onSubmit = (data) => {
    localStorage.setItem("order", JSON.stringify(data));
    props.onSuccess?.();
  };

  return (
    <form className="orderForm" onSubmit={handleSubmit(onSubmit)} ref={ref} noValidate>
      <div className="orderForm__block" data-error={errors.username && `${errors.username.message}`}>
        <label htmlFor="username">
          Имя (латиницей)<span>*</span>
        </label>
        <input
          type="text"
          placeholder="Григорий"
          id="username"
          name="username"
          {...register("username")}
        />
      </div>
      <div className="orderForm__block" data-error={errors.phone && `${errors.phone.message}`}>
        <label htmlFor="phone">
          Телефон<span>*</span>
        </label>
        <InputMask
          mask="+7 (999) 999 99 99"
          placeholder="+7 (999) 999 99 99"
          id="phone"
          {...register("phone")}
        >
          {(inputProps) => (
            <input type="tel" className="spam__input" {...inputProps} />
          )}
        </InputMask>
      </div>
      <div className="orderForm__block" data-error={errors.email && `${errors.email.message}`}>
        <label htmlFor="email">
          E-mail (Gmail)<span>*</span>
        </label>
        <input
          type="email"
          placeholder="grigorij@gmail.com"
          id="email"
          name="email"
          {...register("email")}
        />
      </div>
    </form>
  );
});

export default OrderForm;
