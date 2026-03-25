import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import SplashCursor from './components/cursors/SplashCursor';
import Navbar from './components/navigation/Navbar';
import Certifications from './sections/Certifications';
import Education from './sections/Education';
import Resume from './sections/Resume';

import Contact from './sections/Contact';
import Footer from './sections/Footer';
import ProgrammingStats from './sections/ProgrammingStats';

const App = () => {
  return (
    <main>
      <SplashCursor />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <ProgrammingStats/>
      <Skills />
      <Certifications />
      <Education />
      <Resume />
      <Contact />
      <Footer />
    </main>
  );
};

export default App;
