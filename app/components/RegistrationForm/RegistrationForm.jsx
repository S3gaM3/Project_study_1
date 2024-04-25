import React from "react";
import { useState } from "react";
import Styles from "./RegistrationForm.module.css";

export const RegistrationForm = ({ onClose, setAuth }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setAuth(true);
      onClose();
    } catch (error) {
      console.error("Ошибка регистрации:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={Styles["registration-form"]}>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Имя пользователя"
        required
        className={Styles["registration-form__field-input"]}
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className={Styles["registration-form__field-input"]}
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Пароль"
        required
        className={Styles["registration-form__field-input"]}
      />
      <button type="submit" className={Styles["registration-form__submit"]}>Зарегистрироваться</button>
    </form>
  );
};
