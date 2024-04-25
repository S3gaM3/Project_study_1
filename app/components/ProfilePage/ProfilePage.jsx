// ProfilePage.jsx
"use client";
import React, { useEffect, useState } from "react";
import { useStore } from "@/app/store/app-store";
import { endpoints } from "@/app/api/config";

export const ProfilePage = () => {
  const authStore = useStore();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false); // Добавляем состояние загрузки

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!authStore.token) {
          setUserData(null); // Сброс данных пользователя, если токен отсутствует
          return;
        }
        setLoading(true); // Устанавливаем состояние загрузки
        const response = await fetch(endpoints.me, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Ошибка при получении данных пользователя");
        }
        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // В любом случае снимаем состояние загрузки
      }
    };

    fetchUserData();
  }, [authStore.token]);

  const handleLogout = () => {
    authStore.logout();
    // Перенаправление пользователя на главную страницу или другую страницу после выхода из профиля
    // Например, с использованием next/router
    // router.push("/");
  };

  if (loading) { // Если данные загружаются, показываем состояние загрузки
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Error: Unable to fetch user data.</div>; // Если данные пользователя отсутствуют, показываем сообщение об ошибке
  }

  return (
    <div>
      <h1>Профиль пользователя</h1>
      <p>Имя пользователя: {userData.username}</p>
      <p>Email: {userData.email}</p>
      <button onClick={handleLogout}>Выйти из профиля</button>
    </div>
  );
};
