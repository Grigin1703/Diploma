import "./FormAdmin.scss";
import { loginAdmin } from "@/api/tours";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FormAdmin({ onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const token = await loginAdmin(username, password);
      localStorage.setItem("token", token);
      onClose();
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="formAdmin">
      <div className="formAdmin__content">
        <h2>Вход</h2>
        <form onSubmit={handleLogin} className="formAdmin__form">
          <input
            type="text"
            placeholder="Логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p>{error}</p>}

          <button type="submit" className="formAdmin__btn-entry">
            Войти
          </button>
          <button
            type="button"
            className="formAdmin__btn-exit"
            onClick={onClose}
          >
            назад
          </button>
        </form>
      </div>
    </div>
  );
}
