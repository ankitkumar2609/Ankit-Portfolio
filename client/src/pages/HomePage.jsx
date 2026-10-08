import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Achievements from '../components/Achievements';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { useScrollSpy } from '../hooks/useScrollSpy';

const sectionIds = ['hero', 'about', 'skills', 'experience', 'projects', 'achievements', 'contact'];

const HomePage = () => {
  const activeSection = useScrollSpy(sectionIds, 150);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-darkBg text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar activeSection={activeSection} />

      <main className="flex-grow">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
