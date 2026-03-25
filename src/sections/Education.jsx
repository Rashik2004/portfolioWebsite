import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    id: 1,
    period: 'Aug 2023 – Present',
    degree: 'B.Tech in Computer Science and Engineering',
    institution: 'Lovely Professional University, Punjab',
    description:
      'Pursuing an intensive Computer Science engineering degree with core focuses on data structures, algorithms, machine learning, and advanced web technologies. Engaged in heavy coding logic and rigorous complex software development.',
    tags: ['B.Tech CSE', 'Algorithms', 'Full Stack Developer', 'Software Dev'],
  },
  {
    id: 2,
    period: 'April 2021 – March 2022',
    degree: 'Intermediate (Higher Secondary)',
    institution: 'TPS DAV Public School, Baharagora',
    description:
      'Graduated Intermediate. Developed the fundamental analytical methodologies, logic, and physical sciences groundwork necessary for high-level technical engineering studies.',
    tags: ['Intermediate', 'Physics', 'Chemistry', 'Mathematics','Computer Science'],
  },
  {
    id: 3,
    period: 'April 2019 – March 2020',
    degree: 'Matriculation (Secondary School)',
    institution: 'TPS DAV Public School, Baharagora',
    description:
      'Completed secondary education mapping early foundations into computer logic and structural mathematics that paved the way toward the B.Tech program.',
    tags: ['Secondary Education', 'Mathematics Foundation'],
  },
];

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

const Education = () => {
  const headingRef = useRef(null);
  const itemRefs   = useRef([]);

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

      itemRefs.current.forEach((item) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { x: -60, opacity: 0 },
          {
            x: 0, opacity: 1, ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              end: 'top 62%',
              scrub: 1,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="section-outer">
      {/* Wave: light (#f5f5f7) → dark (#1a1a1a) */}
      <div className="section-wave-container">
        <svg
          className="section-wave-svg"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,120 C480,18 960,98 1440,38 L1440,120 Z"
            fill="#1a1a1a"
          />
        </svg>
      </div>

      <section id="journey" className="education-section">
        <div className="relative z-10 w-full">
          {/* Heading */}
          <div ref={headingRef} className="section-heading-wrapper">
            <h2 className="about-heading">
              <span className="about-heading-text">MY</span>
              <StarBurst />
              <span className="about-heading-text">JOURNEY</span>
            </h2>
          </div>

          {/* Timeline */}
          <div className="timeline">
            {timeline.map((item, i) => (
              <div
                key={item.id}
                className="timeline-item"
                ref={(el) => (itemRefs.current[i] = el)}
              >
                <div className="timeline-dot" />
                <p className="timeline-year">{item.period}</p>
                <h3 className="timeline-degree">{item.degree}</h3>
                <p className="timeline-institution">{item.institution}</p>
                <p className="timeline-desc">{item.description}</p>
                <div className="timeline-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="timeline-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Education;
