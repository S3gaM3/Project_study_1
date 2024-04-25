import Styles from "./NotFound.module.css";
import { useRouter } from "next/navigation";
export const NotFound = () => {
  const router = useRouter();
  return (
    <section className={Styles["not-found"]}>
      <h1>ОШИБКА</h1>
      <img src="../images/error.png" alt="Page not found" />
      <p>Извините, но запрашиваемая вами страница не найдена</p>
      <button
        className={Styles["not-found__back"]}
        onClick={() => router.back()}
      >
        Нажмите сюда, чтобы вернуться назад
      </button>
    </section>
  );
};
