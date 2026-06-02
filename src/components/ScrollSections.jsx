import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import Lenis from "@studio-freight/lenis";

import "./ScrollSections.css";

import apImg from '../assets/AP.jpg';
import eaImg from '../assets/EA.jpg';
import ea2Img from '../assets/EA2.jpg';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function ScrollSections() {

  const containerRef = useRef(null);

  useEffect(() => {

    /* ── LENIS ── */

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    /* ── COR DE FUNDO ── */

    const sections = containerRef.current.querySelectorAll(".colorSection");

    sections.forEach((section, index) => {

      const prevBg   = index === 0 ? "#ffffff" : sections[index - 1].dataset.bgcolor;
      const prevText = index === 0 ? "#000000" : sections[index - 1].dataset.textcolor;

      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        onEnter: () => {
          gsap.to("body", {
            backgroundColor: section.dataset.bgcolor,
            color: section.dataset.textcolor,
            duration: 0.5
          });
        },
        onLeaveBack: () => {
          gsap.to("body", {
            backgroundColor: prevBg,
            color: prevText,
            duration: 0.5
          });
        }
      });

    });

    /* ── ANIMAÇÕES DE ENTRADA ── */

    sections.forEach((section) => {

      const h2      = section.querySelector("h2");
      const img     = section.querySelector("img");
      const eyebrow = section.querySelector(".eyebrow");
      const line    = section.querySelector(".section-line");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
          toggleActions: "play none none none"
        }
      });

      /* LINHA DECORATIVA */
      if (line) {
        tl.fromTo(line,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.7, ease: "power3.out" },
          0
        );
      }

      /* EYEBROW */
      if (eyebrow) {
        tl.fromTo(eyebrow,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          0.1
        );
      }

      /* TÍTULO — letra por letra */
      if (h2) {
        const split = new SplitText(h2, { type: "lines,words" });
        tl.fromTo(split.words,
          { opacity: 0, yPercent: 110, rotateX: -20 },
          {
            opacity: 1,
            yPercent: 0,
            rotateX: 0,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.06
          },
          0.15
        );
      }

      /* IMAGEM — clip reveal + scale */
      if (img) {
        tl.fromTo(img,
          {
            clipPath: "inset(100% 0% 0% 0%)",
            scale: 1.08
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.1,
            ease: "power4.inOut"
          },
          0.2
        );
      }

    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };

  }, []);

  return (

    <main ref={containerRef}>

      <section
        className="colorSection"
        data-bgcolor="#bcb8ad"
        data-textcolor="#032f35"
      >
        <div className="section-text">
          <div className="section-line" />
          <span className="eyebrow">01 — Development</span>
          <h2>Frontend Development</h2>
        </div>

        <div className="section-image">
          <img
            src={apImg}
            alt="Frontend Development"
          />
        </div>
      </section>

      <section
        className="colorSection"
        data-bgcolor="#536fae"
        data-textcolor="#ffffff"
      >
        <div className="section-text">
          <div className="section-line" />
          <span className="eyebrow">02 — Design</span>
          <h2>Creative UI Design</h2>
        </div>

        <div className="section-image">
          <img
            src={eaImg}
            alt="Creative UI Design"
          />
        </div>
      </section>

      <section
        className="colorSection"
        data-bgcolor="#111111"
        data-textcolor="#f5f5f5"
      >
        <div className="section-text">
          <div className="section-line" />
          <span className="eyebrow">03 — Interaction</span>
          <h2>Modern Interactions</h2>
        </div>

        <div className="section-image">
          <img
            src={ea2Img}
            alt="Modern Interactions"
          />
        </div>
      </section>

    </main>

  );
}
