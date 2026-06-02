import { useEffect, useState } from 'react';
import './Navbar.css';
import { useMatrixEffect } from './useMatrixEffect';

/* ────────────────────────────────────────────────────────── */
/* MATRIX LINK */
/* ────────────────────────────────────────────────────────── */

function MatrixLink({ label, href,scrollTo, onClick }) {

  const [text, setText] = useState(label);

  const handlers = useMatrixEffect(label, setText);

  const handleClick = (e) => {
    if (scrollTo) {
      e.preventDefault();
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth' });
    }
    onClick?.();
  };

  return (
    <a
      className="navbar-link"
      href={href ?? '#'}
      onClick={handleClick}
      {...handlers}
    >
      {text}
    </a>
  );
}

/* ────────────────────────────────────────────────────────── */
/* GRID ICON */
/* ────────────────────────────────────────────────────────── */

function GridIcon({ active, onClick }) {

  return (
    <button
      className={`navbar-grid ${active ? 'active' : ''}`}
      onClick={onClick}
      aria-label="Abrir menu"
      type="button"
    >
      <div className="navbar-grid-dot" />
      <div className="navbar-grid-dot" />
      <div className="navbar-grid-dot" />
      <div className="navbar-grid-dot" />
    </button>
  );
}

/* ────────────────────────────────────────────────────────── */
/* NAV LINKS */
/* ────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: 'WORK', href: '/work' },
  { label: 'CULTURE', href: '/culture' },
  { label: 'CONTACT', href: null, scrollTo: 'contact' },
];

/* ────────────────────────────────────────────────────────── */
/* COMPONENT */
/* ────────────────────────────────────────────────────────── */

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  /* SCROLL DETECTION */

  useEffect(() => {

    const handleScroll = () => {

      const isScrolled = window.scrollY > 80;

      setScrolled(isScrolled);

      /* FECHA MENU AO VOLTAR */

      if (!isScrolled) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);

  /* FECHA MENU AO CLICAR FORA */

  useEffect(() => {

    const closeMenu = (e) => {

      if (
        !e.target.closest('.navbar-grid') &&
        !e.target.closest('.dropdown-menu')
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => {
      document.removeEventListener('click', closeMenu);
    };

  }, []);

  return (

    <div className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>

      <nav className="navbar">

        {/* BRAND */}

        <a className="navbar-brand" href="/">
          David Cardoso
        </a>

        {/* LINKS DESKTOP */}

        <div className="navbar-links">

          {NAV_LINKS.map(({ label, href, scrollTo }) => (

            <MatrixLink
                key={label}
                label={label}
                href={href}
                scrollTo={scrollTo}
                onClick={() => setMenuOpen(false)}
              />
            ))}

        </div>

        {/* GRID ICON — sempre no DOM, CSS controla visibilidade */}

        <GridIcon
          active={menuOpen}
          onClick={() => setMenuOpen(prev => !prev)}
        />

      </nav>

      {/* DROPDOWN */}

      <div className={`dropdown-menu ${menuOpen ? 'show' : ''}`}>

        {NAV_LINKS.map(({ label, href, scrollTo }) => (

          <MatrixLink
            key={label}
            label={label}
            href={href}
            scrollTo={scrollTo}
            onClick={() => setMenuOpen(false)}
          />

        ))}

      </div>

    </div>
  );
}
