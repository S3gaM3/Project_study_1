"use client";
import { getGamesByCategory } from "./data/data-utils.js";
import { useEffect } from "react";
import { Banner } from "./components/Banner/Banner.jsx";
import { Promo } from "./components/Promo/Promo.jsx";
import { CardsListSection } from "./components/CardsListSection/CardsListSection.jsx";

export default function Home() {
  useEffect(() => {
    const getData = async (url) => {
      try {
        const response = await fetch(url);
        if (response.status !== 200) {
          throw new Error("Ошибка получения данных");
        }
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        return error;
      }
    };
    getData("https://api-code-2.practicum-team.ru/games");
  }, []);

  const popularGames = getGamesByCategory("popular");
  const newGames = getGamesByCategory("new");
  return (
    <main className="main">
      <Banner />
      <CardsListSection
        id="popular"
        title="Популярные"
        type="slider"
        data={popularGames}
      />
      <CardsListSection 
        id="new"
        title="Новые"
        type="slider"
        data={newGames} />
      <Promo />
    </main>
  );
}
