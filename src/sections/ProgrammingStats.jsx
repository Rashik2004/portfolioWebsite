import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const languages = [
  { name: 'JavaScript / TypeScript', pct: 92 },
  { name: 'Python',                  pct: 60 },
  { name: 'Java',                    pct: 78 },
  { name: 'SQL',                     pct: 75 },
  { name: 'C / C++',                 pct: 70 },
];

const techStack = [
  'React', 'Next.js', 'Node.js', 'Express',
  'TailwindCSS', 'GSAP', 'Framer Motion',
  'MongoDB', 'PostgreSQL', 'Firebase',
  'REST APIs', 'GraphQL',
  'Docker', 'AWS', 'Git & GitHub',
  'TensorFlow', 'Vite',
];

const counters = [
  { value: 2,  suffix: '+', label: 'Years Experience' },
  { value: 20, suffix: '+', label: 'Projects Built'   },
  { value: 6,  suffix: '',  label: 'Certifications'   },
  { value: 3,  suffix: '+', label: 'Open Source'      },
];

/* Dark star variant for light sections */
const StarBurstDark = () => (
  <span className="about-heading-star-wrapper">
    <svg className="about-star-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="10" fill="#0e0e0e" />
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i * 360) / 20;
        const rad = (angle * Math.PI) / 180;
        const innerR = i % 2 === 0 ? 14 : 13;
        const outerR = i % 2 === 0 ? 38 : 28;
        return (
          <line
            key={i}
            x1={40 + innerR * Math.cos(rad)} y1={40 + innerR * Math.sin(rad)}
            x2={40 + outerR * Math.cos(rad)} y2={40 + outerR * Math.sin(rad)}
            stroke="#0e0e0e"
            strokeWidth={i % 2 === 0 ? '1.5' : '0.8'}
          />
        );
      })}
    </svg>
  </span>
);

const ProgrammingStats = () => {
  const headingRef  = useRef(null);
  const barsRef     = useRef([]);
  const counterRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Heading */
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 90%',
            end: 'top 60%',
            scrub: 1,
          },
        }
      );

      /* Skill bars */
      barsRef.current.forEach((bar) => {
        if (!bar) return;
        const target = bar.dataset.width + '%';
        gsap.to(bar, {
          width: target,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 88%',
            once: true,
          },
        });
      });

      /* Counters */
      counterRefs.current.forEach((el) => {
        if (!el) return;
        const end = parseInt(el.dataset.value, 10);
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: end,
            duration: 1.8,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }
        );
      });
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
            d="M0,0 C360,90 720,42 1080,88 C1260,112 1380,58 1440,74 L1440,0 Z"
            fill="#f5f5f7"
          />
        </svg>
      </div>

      <section id="skills" className="stats-section">
        {/* Heading */}
        <div ref={headingRef} className="section-heading-wrapper">
          <h2 className="about-heading about-heading--light">
            <span className="about-heading-text">MY</span>
            <StarBurstDark />
            <span className="about-heading-text">SKILLS</span>
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="stats-layout">
          {/* Left — Language bars */}
          <div>
            <p className="stats-col-title">Languages</p>
            {languages.map((lang, i) => (
              <div key={lang.name} className="skill-bar-row">
                <div className="skill-bar-label">
                  <span className="skill-bar-name">{lang.name}</span>
                  <span className="skill-bar-pct">{lang.pct}%</span>
                </div>
                <div className="skill-bar-track">
                  <div
                    className="skill-bar-fill"
                    data-width={lang.pct}
                    ref={(el) => (barsRef.current[i] = el)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right — Tech stack tags */}
          <div>
            <p className="stats-col-title">Frameworks & Tools</p>
            <div className="tech-tags">
              {techStack.map((tag) => (
                <span key={tag} className="tech-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Stat counters */}
        <div className="stat-counters">
          {counters.map((item, i) => (
            <div key={item.label} className="stat-counter-item">
              <div className="stat-counter-number">
                <span
                  ref={(el) => (counterRefs.current[i] = el)}
                  data-value={item.value}
                >
                  {item.value}
                </span>
                {item.suffix}
              </div>
              <p className="stat-counter-label">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProgrammingStats;
