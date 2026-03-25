import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Aurora from '../components/backgrounds/Aurora';


const Hero = () => {
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      headingRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 }
    )
      .fromTo(
        subheadingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        '-=0.6'
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.4'
      );
  }, []);

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Soft Aurora Background */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={['#c8c8cc', '#e5e5eb', '#c8c8cc']}
          amplitude={1.2}
          blend={0.5}
          speed={0.5}
        />
      </div>


      {/* Gradient overlay for text readability */}
      <div className="hero-overlay absolute inset-0 z-[1] pointer-events-none" />

      {/* Content */}
      {/* Content */}
      <div
        className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full px-6 py-8 gap-12"
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      >
        {/* Left Column (Text & CTAs) */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-[800px]">
          <motion.p
            className="font-[Inter,system-ui,sans-serif] text-[1.25rem] md:text-[1.4rem] font-normal text-[#6b6b73] tracking-[4px] uppercase mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hi, I'm
          </motion.p>

          <h1
            ref={headingRef}
            className="font-['Race_Sport',Inter,system-ui,sans-serif] text-[clamp(3.5rem,8.5vw,7.5rem)] font-extrabold leading-[1.05] tracking-[0.02em] m-0 text-[#0e0e0e] [text-shadow:0_1px_4px_rgba(0,0,0,0.08)]"
          >
            <span className="block bg-gradient-to-br from-[#111113] via-[#2a2a2e] to-[#0a0a0c] bg-clip-text text-transparent">
              Rashik Ghosh
            </span>
          </h1>

          <p
            ref={subheadingRef}
            className="font-[Inter,system-ui,sans-serif] text-[clamp(1.15rem,2.5vw,1.6rem)] font-light text-[#4a4a52] mt-6 tracking-[0.5px] [text-shadow:0_1px_2px_rgba(0,0,0,0.05)]"
          >
            Full-Stack Developer &amp; Creative Technologist
          </p>

          <div ref={ctaRef} className="flex flex-nowrap justify-center md:justify-start" style={{ marginTop: '80px', gap: '24px' }}>
            <motion.a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full whitespace-nowrap font-[Inter,system-ui,sans-serif] font-medium no-underline cursor-pointer transition-all duration-300 bg-gradient-to-br from-[#d4d4dc] to-[#e8e8f0] text-[#1a1a1a] border-none hover:from-[#e8e8f0] hover:to-[#f5f5f7]"
              style={{ padding: '18px 42px', fontSize: '1.4rem' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212, 212, 220, 0.35)' }}
              whileTap={{ scale: 0.97 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full whitespace-nowrap font-[Inter,system-ui,sans-serif] font-medium no-underline cursor-pointer transition-all duration-300 bg-transparent text-[#52525b] border border-black/12 backdrop-blur-sm hover:border-[rgba(212,212,220,0.5)] hover:text-[#1a1a1a]"
              style={{ padding: '18px 42px', fontSize: '1.4rem' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Get In Touch
            </motion.a>
          </div>
        </div>

        {/* Right Column (Avatar) */}
        <div className="flex-shrink-0 relative mt-16 md:mt-0 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="relative w-[400px] md:w-[750px] translate-y-4 md:translate-y-8"
          >
            <img
              src="/avatar2.png"
              alt="Rashik Ghosh Avatar"
              className="w-full h-auto object-contain mix-blend-multiply drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — positioned at bottom of hero */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-[38px] border-2 border-black/15 rounded-[14px] flex justify-center pt-1.5">
          <div className="w-[3px] h-2 bg-[#d4d4dc] rounded-full animate-scroll-pulse" />
        </div>
        <span className="font-[Inter,system-ui,sans-serif] text-[0.7rem] text-black/35 tracking-[2px] uppercase">
          Scroll Down
        </span>
      </motion.div>
    </section>
  );
};

export default Hero;
