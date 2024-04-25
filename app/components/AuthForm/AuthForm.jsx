"use client";
import Styles from "./AuthForm.module.css";
import { useStore } from "@/app/store/app-store";
import { useState } from "react";
import { endpoints } from "@/app/api/config";
import { isResponseOk, authorize } from "@/app/api/api-utils";
import { useEffect } from "react";

export const AuthForm = (props) => {
  const authContext = useStore();
  const [authData, setAuthData] = useState({ identifier: "", password: "" });
  const [message, setMessage] = useState({ status: null, text: null });
  const handleInput = (e) => {
    const newAuthData = authData;
    newAuthData[e.target.name] = e.target.value;
    setAuthData(newAuthData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await authorize(endpoints.auth, authData);
    if (isResponseOk(userData)) {
      authContext.login(userData.user, userData.jwt);
      setMessage({ status: "success", text: "Вы авторизовались!" });
    } else {
      setMessage({ status: "error", text: "Неверные почта или пароль" });
    }
  };
  useEffect(() => {
    let timer;
    if (authContext.user) {
      timer = setTimeout(() => {
        setMessage({ status: null, text: null });
        props.isClosed();
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [authContext.user]);
  return (
    <form onSubmit={handleSubmit} className={Styles["form"]}>
      <h2 className={Styles["form__title"]}>Авторизация</h2>
      <div className={Styles["form__fields"]}>
        <label className={Styles["form__field"]}>
          <span className={Styles["form__field-title"]}>Email</span>
          <input
            onInput={handleInput}
            className={Styles["form__field-input"]}
            type="email"
            name="identifier"
            placeholder="hello@world.com"
          />
        </label>
        <label className={Styles["form__field"]}>
          <span className={Styles["form__field-title"]}>Пароль</span>
          <input
            onInput={handleInput}
            name="password"
            className={Styles["form__field-input"]}
            type="password"
            placeholder="***********"
          />
        </label>
      </div>
      {message.status && (
        <p className={Styles["form__message"]}>{message.text}</p>
      )}
      <div className={Styles["form__actions"]}>
        <button className={Styles["form__reset"]} type="reset">
          Очистить
        </button>
        <button className={Styles["form__submit"]} type="submit">
          Войти
        </button>
      </div>
    </form>
  );
};