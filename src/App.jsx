import styles from "./App.module.css";
import BG from "./assets/BG2.png";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ScrollSections from "./components/ScrollSections";
import Contact from './components/Contact';

function App() {
  return (
    <main className={styles.app}>
      <section
        className={styles.heroSection}
        style={{ backgroundImage: `url(${BG})` }}
      >
        <Navbar />
        <Hero />
        <ScrollSections />
        <Contact />

      </section>


    </main>
  );
}

export default App;