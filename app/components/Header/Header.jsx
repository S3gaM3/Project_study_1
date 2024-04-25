"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Overlay } from "../Overlay/Overlay";
import { AuthForm } from "../AuthForm/AuthForm";
import { Popup } from "../PopUp/Popup";
import { RegistrationForm } from "../RegistrationForm/RegistrationForm";
import Styles from "./Header.module.css";
import { useStore } from "@/app/store/app-store";
import { ProfilePage } from "../ProfilePage/ProfilePage";

export const Header = () => {
  const [authPopupIsOpened, setAuthPopupIsOpened] = useState(false);
  const [registrationPopupIsOpened, setRegistrationPopupIsOpened] = useState(false);
  const [profilePopupIsOpened, setProfilePopupIsOpened] = useState(false);
  const pathname = usePathname();
  const authContext = useStore();

  const openAuthPopup = () => {
    setAuthPopupIsOpened(true);
    document.body.style.overflow = "hidden";
  };

  const closeAuthPopup = () => {
    setAuthPopupIsOpened(false);
    document.body.style.overflow = "auto";
  };

  const openRegistrationPopup = () => {
    setRegistrationPopupIsOpened(true);
    document.body.style.overflow = "hidden";
  };

  const closeRegistrationPopup = () => {
    setRegistrationPopupIsOpened(false);
    document.body.style.overflow = "auto";
  };

  const openProfilePopup = () => {
    setProfilePopupIsOpened(true);
    document.body.style.overflow = "hidden";
  };

  const closeProfilePopup = () => {
    setProfilePopupIsOpened(false);
    document.body.style.overflow = "auto";
  };

  const handleLogout = () => {
    authContext.logout();
  };

  return (
    <header className={Styles["header"]}>
      {pathname === "/" ? (
        <div className={Styles["logo"]}>
          <img
            className={Styles["logo__image"]}
            src="../images/logo.svg"
            alt="Логотип Pindie"
          />
        </div>
      ) : (
        <Link href="/" className={Styles["logo"]}>
          <img
            className={Styles["logo__image"]}
            src="../images/logo.svg"
            alt="Логотип Pindie"
          />
        </Link>
      )}
      <nav className={Styles["menu"]}>
        <ul className={Styles["menu__list"]}>
          <li className={Styles["menu__item"]}>
            <Link
              href="/new"
              className={`${Styles["menu__link"]} ${
                pathname === "/new" ? Styles["menu__link_active"] : ""
              }`}
            >
              Новинки
            </Link>
          </li>
          <li className={Styles["menu__item"]}>
            <Link
              href="/popular"
              className={`${Styles["menu__link"]} ${
                pathname === "/popular" ? Styles["menu__link_active"] : ""
              }`}
            >
              Популярные
            </Link>
          </li>
          <li className={Styles["menu__item"]}>
            <Link
              href="/shooters"
              className={`${Styles["menu__link"]} ${
                pathname === "/shooters" ? Styles["menu__link_active"] : ""
              }`}
            >
              Шутеры
            </Link>
          </li>
          <li className={Styles["menu__item"]}>
            <Link
              href="/runners"
              className={`${Styles["menu__link"]} ${
                pathname === "/runners" ? Styles["menu__link_active"] : ""
              }`}
            >
              Ранеры
            </Link>
          </li>
          <li className={Styles["menu__item"]}>
            <Link
              href="/pixel-games"
              className={`${Styles["menu__link"]} ${
                pathname === "/pixel-games" ? Styles["menu__link_active"] : ""
              }`}
            >
              Пиксельные
            </Link>
          </li>
          <li className={Styles["menu__item"]}>
            <Link
              href="/tds"
              className={`${Styles["menu__link"]} ${
                pathname === "/tds" ? Styles["menu__link_active"] : ""
              }`}
            >
              TDS
            </Link>
          </li>
        </ul>
        <div className={Styles["auth"]}>
        {authContext.isAuth ? (
          <>
            <button className={Styles["auth__button"]} onClick={openProfilePopup}> {/* Кнопка для открытия попапа профиля */}
              Профиль
            </button>
            <button className={Styles["auth__button"]} onClick={handleLogout}>
              Выйти
            </button>
          </>
        ) : (
          <>
            <button className={Styles["auth__button"]} onClick={openAuthPopup}>
              Войти
            </button>
            <button className={Styles["auth__button"]} onClick={openRegistrationPopup}>
              Регистрация
            </button>
          </>
        )}
      </div>
      </nav>
      <Overlay isOpened={authPopupIsOpened || registrationPopupIsOpened || profilePopupIsOpened} isClosed={closeAuthPopup || closeRegistrationPopup || closeProfilePopup} />
      <Popup isOpened={authPopupIsOpened} isClosed={closeAuthPopup}>
        <AuthForm isClosed={closeAuthPopup} setAuth={authContext.setIsAuth} />
      </Popup>
      <Popup isOpened={registrationPopupIsOpened} isClosed={closeRegistrationPopup}>
        <RegistrationForm onClose={closeRegistrationPopup} setAuth={authContext.setIsAuth} />
      </Popup>
      <Popup isOpened={profilePopupIsOpened} isClosed={closeProfilePopup}>
        <ProfilePage />
      </Popup>
    </header>
  );
};