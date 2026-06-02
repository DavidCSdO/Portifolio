import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

import styles from "./Hero.module.css";
import RotatingText from "./RotatingText";

function Hero() {

  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {

    /* ───────────────────────────────────────────── */
    /* SPLIT TITLE */
    /* ───────────────────────────────────────────── */

    const split = new SplitType(titleRef.current, {
      types: "chars"
    });

    /* ───────────────────────────────────────────── */
    /* MASTER TIMELINE */
    /* ───────────────────────────────────────────── */

    const tl = gsap.timeline();

    /* TITLE */

    tl.fromTo(
      split.chars,
      {
        opacity: 0,
        yPercent: 110,
        rotateX: -90,
        filter: "blur(12px)"
      },
      {
        opacity: 1,
        yPercent: 0,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power4.out",
        stagger: 0.035
      }
    );

    /* INFO BOX */

    tl.fromTo(
      `.${styles.infoBox}`,
      {
        opacity: 0,
        y: 40,
        scale: 0.96,
        filter: "blur(10px)"
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power4.out"
      },
      "-=0.5"
    );

    /* FLOATING CARDS */

    tl.fromTo(
      cardsRef.current,
      {
        opacity: 0,
        y: 60,
        scale: 0.9,
        filter: "blur(8px)"
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power4.out",
        stagger: 0.12,
        clearProps: "transform,filter"
      },
      "-=0.5"
    );

    /* WAVES */

    gsap.to(`.${styles.wave}`, {
      xPercent: -10,
      duration: 12,
      ease: "none",
      repeat: -1,
      yoyo: true
    });

    return () => {
      split.revert();
    };

  }, []);

  return (

    <section className={styles.hero}>

      {/* BACKGROUND WAVES */}

      <div className={styles.waveSection}>

        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>

      </div>

      {/* HERO CONTENT */}

      <div className={styles.heroContent}>

        {/* LEFT SIDE */}

        <div className={styles.fullName}>

          <h1 ref={titleRef}>
            David
            <br />
            Cardoso
          </h1>

        </div>

        {/* RIGHT SIDE */}

        <div className={styles.infoBox}>

          <span className={styles.tag}>
            Desenvolvedor <RotatingText />
          </span>

          <h2>David Cardoso</h2>

          <p>
            Desenvolvedor de software com foco em desenvolvimento back-end.
            Possuo experiência profissional com ADVPL/TLPP, SQL e criação
            de soluções corporativas voltadas para automações,
            integrações e sistemas empresariais.
            <br /><br />
            Também tenho conhecimentos em Java, React, APIs REST
            e bancos de dados, além de experiência em processos
            administrativos hospitalares e compras.
          </p>

          <div className={styles.buttons}>

            <button className={styles.primaryBtn}>
              Ver Projetos
            </button>

            <button
              className={styles.secondaryBtn}
              onClick={() =>
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })
              }
            >
              Contato
            </button>

          </div>

        </div>

      </div>

      {/* FLOATING GLASS CARDS */}

      <div className={styles.floatingCards}>

        <div
          className={styles.waveCard}
          ref={(el) => (cardsRef.current[0] = el)}
        >
          <h3>+5 anos estudando tecnologia</h3>

          <p>
            Desenvolvimento web, arquitetura de software,
            React, APIs REST e sistemas corporativos.
          </p>
        </div>

        <div
          className={styles.waveCard}
          ref={(el) => (cardsRef.current[1] = el)}
        >
          <h3>Experiência Corporativa</h3>

          <p>
            ADVPL/TLPP, SQL, automações,
            integrações e sistemas empresariais.
          </p>
        </div>

        <div
          className={styles.waveCard}
          ref={(el) => (cardsRef.current[2] = el)}
        >
          <h3>Foco Atual</h3>

          <p>
            Interfaces modernas,
            animações fluidas,
            performance e experiências premium.
          </p>
        </div>

      </div>

    </section>
  );
}

export default Hero;