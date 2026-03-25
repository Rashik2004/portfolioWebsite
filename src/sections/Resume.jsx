import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 3v10M10 13l-3.5-3.5M10 13l3.5-3.5M3 17h14"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Resume = () => {
  const wrapperRef  = useRef(null);
  const eyebrowRef  = useRef(null);
  const titleRef    = useRef(null);
  const subtitleRef = useRef(null);
  const btnRef      = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top 80%',
          once: true,
        },
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(eyebrowRef.current,  { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
        .fromTo(titleRef.current,    { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.3')
        .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
        .fromTo(btnRef.current,      { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4');
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="section-outer">
      {/* Wave: dark (#1a1a1a) → light (#f5f5f7) */}
      <div className="section-wave-container">
        <svg
          className="section-wave-svg"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 C240,108 600,28 960,84 C1200,122 1360,54 1440,68 L1440,0 Z"
            fill="#f5f5f7"
          />
        </svg>
      </div>

      <section id="resume" className="resume-section" ref={wrapperRef}>
        {/* Decorative large background text */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 'clamp(12rem, 30vw, 28rem)',
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'rgba(0,0,0,0.03)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            userSelect: 'none',
            lineHeight: 1,
          }}
        >
          CV
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p ref={eyebrowRef} className="resume-eyebrow">— Download My —</p>

          <h2 ref={titleRef} className="resume-title">Résumé</h2>

          <p ref={subtitleRef} className="resume-subtitle">
            A concise overview of my experience, skills, education, and projects.
            Available as a PDF for your convenience.
          </p>

          <motion.a
            ref={btnRef}
            href="/resume.pdf"
            download
            className="resume-btn"
            whileHover={{ scale: 1.05, boxShadow: '0 16px 48px rgba(0,0,0,0.22)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
          >
            <DownloadIcon />
            Download PDF
          </motion.a>

          <p className="resume-note">PDF · Last updated 2024</p>
        </div>
      </section>
    </div>
  );
};

export default Resume;
