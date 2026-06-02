import { useState, useEffect } from "react";
import styles from "./Hero.module.css";

const palavras = ["Back-End", "Java", "React", "SQL", "APIs REST", "ADVPL"];

export default function RotatingText() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setIndex((i) => (i + 1) % palavras.length);
        setVisible(true);
      }, 400);
    }, 2000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <span
      className={`${styles.rotatingText} ${visible ? styles.visible : styles.hidden}`}
    >
      {palavras[index]}
    </span>
  );
}