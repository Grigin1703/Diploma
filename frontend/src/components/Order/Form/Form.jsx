import "./Form.scss";
import { useState } from "react";

export default function OrderForm() {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
  });

  return (
    <form className="orderForm">
      <div>
        <label htmlFor="username">Имя (латиницей)<span>*</span></label>
        <input
          type="text"
          placeholder="Григорий"
          id="username"
          name="username"
          required
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="phone">Мобильный телефон<span>*</span></label>
        <input
          type="tel"
          placeholder="+ 7 (999) 000 00 00"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="email">E-mail (Gmail)<span>*</span></label>
        <input
          type="email"
          placeholder="grigorij@gmail.com"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
    </form>
  );
}
