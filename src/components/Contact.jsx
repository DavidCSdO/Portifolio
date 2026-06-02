import { useEffect, useRef } from "react";
import styles from "./Contact.module.css";

function Contact() {
  const featureRef = useRef(null);
  const opaqueRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const feature = featureRef.current;
    const opaque = opaqueRef.current;
    const section = sectionRef.current;
    if (!feature || !section) return;

    /* ── detect browser (blur only on Chrome/Safari) ── */
    const isChrome =
      /Chrome/.test(navigator.userAgent) &&
      /Google Inc/.test(navigator.vendor);
    const isSafari =
      /Safari/.test(navigator.userAgent) &&
      /Apple Computer/.test(navigator.vendor);
    const supportsBlur = isChrome || isSafari;

    /* ── initial size ── */
    const BASE_PERCENT = 2.5; // matches background-size: 250%
    let size = BASE_PERCENT * feature.offsetWidth;

    const onScroll = () => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const fromTop = Math.max(0, window.scrollY - sectionTop);
      const newSize = size - fromTop / 3;

      if (newSize > feature.offsetWidth) {
        feature.style.backgroundSize = `${newSize}px`;

        if (supportsBlur) {
          const blur = fromTop / 100;
          feature.style.webkitFilter = `blur(${blur}px)`;
          feature.style.opacity = String(
            Math.max(0, 1 - (fromTop / (window.innerHeight * 1.2)) * 1.3)
          );
        } else if (opaque) {
          opaque.style.opacity = String(fromTop / 5000);
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className={styles.contactSection} ref={sectionRef} id="contact">

      {/* PARALLAX BG */}
      <div className={styles.feature} ref={featureRef}>
        {/* fallback overlay for non-Webkit browsers */}
        <div className={styles.opaque} ref={opaqueRef} />
      </div>

      {/* CONTENT */}
      <div className={styles.content}>

        <p className={styles.eyebrow}>Vamos conversar</p>

        <h2 className={styles.heading}>
          Tem um projeto<br />em mente?
        </h2>

        <p className={styles.sub}>
          Estou disponível para oportunidades freelance, empregos e colaborações.
          Me manda uma mensagem — responderei em breve.
        </p>

        {/* CONTACT LINKS */}
        <div className={styles.links}>

          <a
            href="mailto:cardosodavid92@gmail.com"
            className={styles.linkItem}
          >
            <span className={styles.linkIcon}>✉</span>
            <span>cardosodavid92@gmail.com</span>
            <span className={styles.linkArrow}>↗</span>
          </a>

          <a
            href="https://www.linkedin.com/in/david-cardoso-659239215/"
            target="_blank"
            rel="noreferrer"
            className={styles.linkItem}
          >
            <span className={styles.linkIcon}>in</span>
            <span>linkedin.com/in/david-cardoso</span>
            <span className={styles.linkArrow}>↗</span>
          </a>

          <a
            href="https://github.com/DavidCSdOo"
            target="_blank"
            rel="noreferrer"
            className={styles.linkItem}
          >
            <span className={styles.linkIcon}>⌥</span>
            <span>github.com/DavidCSdO</span>
            <span className={styles.linkArrow}>↗</span>
          </a>

        </div>

        {/* CTA BUTTON */}
        <a href="mailto:cardosodavid92@gmail.com" className={styles.ctaBtn}>
          Enviar mensagem
        </a>
        <a 
          href="https://wa.me/5524992928110"
          target="_blank"
          rel="noreferrer"
          className={styles.ctWpp}
        >
          Enviar mensagem pelo Whatsapp
        </a>

        {/* FOOTER BAR */}
        <div className={styles.footerBar}>
          <span>© {new Date().getFullYear()} David Cardoso</span>
          <span>Desenvolvido com React</span>
        </div>

      </div>
    </section>
  );
}

export default Contact;
