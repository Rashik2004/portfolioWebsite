import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    id: 1,
    title: 'Introduction to Generative AI Studio',
    issuer: 'Simplilearn',
    date: 'Sep 2025',
    category: 'Generative AI',
    link: 'https://drive.google.com/file/d/1rcaKAgcl--5PaWXexlOyPrjKpon9usQF/view?usp=share_link',
  },
  {
    id: 2,
    title: 'Build a Full Website using WordPress',
    issuer: 'Coursera',
    date: 'May 2025',
    category: 'Web Dev',
    link: 'https://drive.google.com/file/d/1BbjH6Hbg4e0HN1IzH0kwBwtnoRcMKuWq/view?usp=share_link',
  },
  {
    id: 3,
    title: 'Introduction to Hardware and Operating Systems',
    issuer: 'Coursera',
    date: 'Sep 2024',
    category: 'IT / Systems',
    link: 'https://drive.google.com/file/d/1BbjH6Hbg4e0HN1IzH0kwBwtnoRcMKuWq/view?usp=share_link',
  },
  {
    id: 4,
    title: 'Databases and SQL for Data Science with Python',
    issuer: 'Coursera',
    date: 'Apr 2024',
    category: 'Data Science',
    link: 'https://drive.google.com/file/d/1Xy5GFP0Z_A0Vpp06pCzaEsGtfHN1e7wV/view?usp=share_link',
  },
  {
    id: 5,
    title: 'MERN: Advanced MERN Development',
    issuer: 'Independent',
    date: 'Sep 20, 2025',
    category: 'Full Stack Web',
    link: '#',
  },
  {
    id: 6,
    title: 'Cloud Computing',
    issuer: 'NPTL',
    date: 'Jan 2026',
    category: 'Cloud',
    link: '#',
  }
];

/* Reusable star burst — same as About section */
const StarBurst = () => (
  <span className="about-heading-star-wrapper">
    <svg className="about-star-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="10" fill="white" />
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
            stroke="white"
            strokeWidth={i % 2 === 0 ? '1.5' : '0.8'}
          />
        );
      })}
    </svg>
  </span>
);

const ArrowIcon = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Certifications = () => {
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              end: 'top 68%',
              scrub: 1,
            },
            delay: (i % 3) * 0.06,
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="section-outer">
      {/* Wave: Projects light (#f3f4f6) → dark (#1a1a1a) */}
      <div className="section-wave-container">
        <svg
          className="section-wave-svg"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,120 C360,28 720,82 1080,36 C1260,8 1380,56 1440,28 L1440,120 Z"
            fill="#1a1a1a"
          />
        </svg>
      </div>

      <section id="certifications" className="certs-section">
        <div className="relative z-10 w-full">
          {/* Heading */}
          <div ref={headingRef} className="section-heading-wrapper">
            <h2 className="about-heading">
              <span className="about-heading-text">MY</span>
              <StarBurst />
              <span className="about-heading-text">CERTS</span>
            </h2>
          </div>

          {/* Grid */}
          <div className="certs-grid">
            {certifications.map((cert, i) => (
              <div
                key={cert.id}
                ref={(el) => (cardsRef.current[i] = el)}
                className="cert-card"
              >
                <span className="cert-category">{cert.category}</span>
                <h3 className="cert-title">{cert.title}</h3>
                <div className="cert-meta">
                  <span className="cert-issuer">{cert.issuer}</span>
                  <span className="cert-date">{cert.date}</span>
                </div>
                <a href={cert.link} className="cert-link" target="_blank" rel="noopener noreferrer">
                  View Credential <ArrowIcon />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Certifications;
