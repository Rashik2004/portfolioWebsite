import { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

/* ─── Project Data ─── */
const projects = [
  {
    id: 'project-1',
    category: 'AI / Web',
    title: 'StressFree Portal',
    image: '/Stressmanagement.png',
    description: 'A comprehensive Stress Management Portal. Engineered a rule-based NLP chatbot (MindfulBot) using regex-driven intent classification. Developed a heuristic stress-scoring engine that normalizes questionnaire responses into a 0-100% stress index, delivering personalized meditation schedules. Built with React 19, Node.js, Express, MongoDB, and JWT authentication.',
    link: 'https://stress-free-stress-management-porta.vercel.app/',
  },
  {
    id: 'project-2',
    category: 'Full Stack SaaS',
    title: 'Question Generation Web-App',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    description: 'An automated SaaS platform for academic assessment, integrating Bloom’s Taxonomy and algorithmic constraint satisfaction. Features a relational MySQL database with B-tree indexing to maintain referential integrity. Frontend built with React.js and real-time DOM updates.',
    link: 'https://github.com/Rashik2004/Rash_Projects/tree/main/ExamPaperGenrater',
  },
  {
    id: 'project-3',
    category: 'AI / NLP',
    title: 'Resume Analyser',
    image: '/AlchymeResume.png',
    description: 'An AI-powered ATS resume analyzer deploying NLP techniques for keyword extraction and entity recognition. Evaluates ATS compatibility and delivers real-time visual categorization via Recharts. Tech stack includes React.js, TypeScript, Tailwind CSS, shadcn-ui, and Zod.',
    link: 'https://resume-alchemy-score.lovable.app/',
  },
  {
    id: 'project-4',
    category: 'Communication & Sockets',
    title: 'WeConnect-Fi',
    image: '/weconnectfiThubnail.png',
    description: 'A robust, real-time communication platform engineered using advanced Socket programming. Designed to facilitate ultra-low latency, persistent bi-directional data streams across distributed network clients.',
    link: '#',
  },
  {
    id: 'project-5',
    category: 'Algorithms / DSA',
    title: 'Greedy Bus Scheduler',
    image: '/busschedulerthumbnail.png',
    description: 'An intelligent transit management system engineered with a custom Greedy Scheduling algorithm to seamlessly resolve route conflicts. Features distance-based fare estimation using the Haversine formula and optimized backend CSV processing pipelines.',
    link: '#',
  },
  {
    id: 'project-6',
    category: 'Open Source',
    title: 'Dev Tools CLI',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    description: 'A powerful command-line toolkit for developers that automates boilerplate generation, linting, testing, and deployment workflows.',
    link: '#',
  }
];

const Projects = () => {
  const [selectedId, setSelectedId] = useState(null);
  const bannerRef = useRef(null);
  const flipStateRef = useRef(null);

  // banner scroll effects remain exactly the same
  const { scrollYProgress: bannerEnter } = useScroll({
    target: bannerRef,
    offset: ['start end', 'center center'],
  });
  const { scrollYProgress: bannerExit } = useScroll({
    target: bannerRef,
    offset: ['center center', 'end start'],
  });
  const smoothEnter = useSpring(bannerEnter, { stiffness: 80, damping: 20 });
  const smoothExit  = useSpring(bannerExit,  { stiffness: 80, damping: 20 });
  const scaleEnter   = useTransform(smoothEnter, [0, 1], [0.72, 1]);
  const opacityEnter = useTransform(smoothEnter, [0, 0.55], [0, 1]);
  const scaleExit    = useTransform(smoothExit,  [0, 1], [1, 0.88]);
  const opacityExit  = useTransform(smoothExit,  [0.4, 1], [1, 0]);

  const handleCardClick = (id) => {
    if (selectedId) return;
    flipStateRef.current = Flip.getState('.flip-image');
    setSelectedId(id);
  };

  const handleClose = useCallback(() => {
    if (!selectedId) return;

    // Animate out scrim and text first
    gsap.to('.modal-scrim, .modal-content-inner', {
      opacity: 0,
      y: (index, target) => target.classList.contains('modal-content-inner') ? 20 : 0,
      duration: 0.3,
      onComplete: () => {
        flipStateRef.current = Flip.getState('.flip-image');
        setSelectedId(null);
      }
    });
  }, [selectedId]);

  useLayoutEffect(() => {
    if (!flipStateRef.current) return;

    Flip.from(flipStateRef.current, {
      targets: '.flip-image',
      duration: 0.8,
      ease: 'power4.inOut',
      absolute: true,
      zIndex: 100,
      props: 'borderRadius', // Flips the border radius seamlessly!
    });

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (selectedId) {
      // Fade in modal scrim and content
      gsap.fromTo('.modal-scrim', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });
      gsap.fromTo('.modal-content-inner', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: 'power3.out' });

      // Hide scrollbar and pad body to prevent layout shift
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    flipStateRef.current = null;
  }, [selectedId]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    if (selectedId) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedId, handleClose]);

  const selectedProject = projects.find((p) => p.id === selectedId);

  return (
    <>
      {/* ═══ BANNER ═══ */}
      <section
        id="projects"
        ref={bannerRef}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#1a1a1a',
        }}
      >
        <motion.div style={{ scale: scaleEnter, opacity: opacityEnter }}>
          <motion.div
            style={{
              scale: scaleExit,
              opacity: opacityExit,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '0 1.5rem',
            }}
          >
            <h2
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '0.04em',
                color: 'white',
                margin: 0,
              }}
            >
              Projects
            </h2>
            <p
              style={{
                marginTop: '1rem',
                maxWidth: '34rem',
                fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.48)',
                lineHeight: 1.75,
                letterSpacing: '0.03em',
              }}
            >
              "The only way to do great work is to love what you do."
            </p>
            <p
              style={{
                marginTop: '0.3rem',
                fontSize: '0.68rem',
                color: 'rgba(255,255,255,0.26)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              — Steve Jobs
            </p>
          </motion.div>
        </motion.div>

        <div
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '7rem',
            background: 'linear-gradient(to top, #f3f4f6, transparent)',
            pointerEvents: 'none',
          }}
        />
      </section>

      {/* ═══ GRID ═══ */}
      <section style={{ width: '100%', background: '#f3f4f6', padding: '40px 12px 100px' }}>
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            margin: '0 auto',
            maxWidth: 1400,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '20px'
          }}
        >
          {projects.map((p) => (
            <div
              key={p.id}
              onClick={() => handleCardClick(p.id)}
              className="group"
              style={{
                height: 400,
                position: 'relative',
                borderRadius: 16,
                cursor: 'pointer',
                background: '#e5e7eb',
              }}
            >
              {selectedId !== p.id && (
                <img
                  className="flip-image"
                  data-flip-id={`img-${p.id}`}
                  src={p.image}
                  alt={p.title}
                  style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 16,
                  }}
                />
              )}

              {/* Grid Card Text Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 16,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
                  opacity: selectedId === p.id ? 0 : 1,
                  transition: 'opacity 0.3s',
                  pointerEvents: 'none',
                  overflow: 'hidden'
                }}
              />
              <div
                style={{
                  position: 'absolute', top: 20, left: 20, zIndex: 10,
                  opacity: selectedId === p.id ? 0 : 1,
                  transition: 'opacity 0.3s',
                  pointerEvents: 'none'
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {p.category}
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white', marginTop: 4, lineHeight: 1.25, maxWidth: 220 }}>
                  {p.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ MODAL ═══ */}
      {selectedId && selectedProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Scrim */}
          <div
            className="modal-scrim"
            onClick={handleClose}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(10px)'
            }}
          />

          {/* Modal Container */}
          <div
            style={{
              position: 'relative',
              width: '90vw',
              maxWidth: 560,
              borderRadius: 24,
              zIndex: 70,
              background: '#1c1c1e',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
              overflow: 'hidden'
            }}
          >
            {/* The Image Container in Modal */}
            <div style={{ position: 'relative', height: 320, width: '100%' }}>
              <img
                className="flip-image"
                data-flip-id={`img-${selectedId}`}
                src={selectedProject.image}
                alt={selectedProject.title}
                style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '100%', height: '100%', objectFit: 'cover',
                  borderTopLeftRadius: 24, borderTopRightRadius: 24,
                  borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
                }}
              />
              <button
                onClick={handleClose}
                aria-label="Close"
                style={{
                  position: 'absolute', top: 16, right: 16,
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
                  border: 'none', cursor: 'pointer', zIndex: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                }}
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M1 1l12 12M13 1L1 13" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="modal-content-inner" style={{ padding: '2rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                {selectedProject.category}
              </span>
              <h3 style={{ fontSize: '2rem', fontWeight: 700, color: 'white', marginTop: '0.5rem', lineHeight: 1.1 }}>
                {selectedProject.title}
              </h3>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', marginTop: '1rem', lineHeight: 1.6 }}>
                {selectedProject.description}
              </p>
              <a
                href={selectedProject.link}
                style={{
                  display: 'inline-block', marginTop: '1.5rem',
                  padding: '0.75rem 1.75rem', borderRadius: 9999,
                  background: 'white', color: '#111',
                  fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none',
                }}
              >
                Visit Website →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
