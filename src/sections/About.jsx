import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Icons ──
const BookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
);
const ChipIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
);
const ArrowUpRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
);
const ArrowUpRightIconLg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
);

const About = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 90%',
            end: 'top 60%',
            scrub: 1,
          },
        }
      );

      // Row 1
      const r1 = row1Ref.current?.children;
      if (r1) {
        gsap.fromTo(r1[0], { x: -80, opacity: 0 }, {
          x: 0, opacity: 1, ease: 'power3.out',
          scrollTrigger: { trigger: row1Ref.current, start: 'top 88%', end: 'top 60%', scrub: 1 },
        });
        gsap.fromTo(r1[1], { x: 80, opacity: 0 }, {
          x: 0, opacity: 1, ease: 'power3.out',
          scrollTrigger: { trigger: row1Ref.current, start: 'top 88%', end: 'top 60%', scrub: 1 },
        });
      }

      // Row 2
      const r2 = row2Ref.current?.children;
      if (r2) {
        gsap.fromTo(r2[0], { x: -80, opacity: 0 }, {
          x: 0, opacity: 1, ease: 'power3.out',
          scrollTrigger: { trigger: row2Ref.current, start: 'top 88%', end: 'top 60%', scrub: 1 },
        });
        gsap.fromTo(r2[1], { x: 80, opacity: 0 }, {
          x: 0, opacity: 1, ease: 'power3.out',
          scrollTrigger: { trigger: row2Ref.current, start: 'top 88%', end: 'top 60%', scrub: 1 },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="about-outer">
      {/* SVG Curve — the wavy top edge of the dark section */}
      <div className="curve-wave-container">
        <svg
          className="curve-wave-svg"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,120 C240,10 480,90 720,50 C960,10 1200,90 1440,40 L1440,120 Z"
            fill="#1a1a1a"
          />
        </svg>
      </div>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="relative z-10 w-full">
          {/* Large Heading */}
          <div ref={headingRef} className="about-heading-wrapper">
            <h2 className="about-heading">
              <span className="about-heading-text">ABOUT</span>
              <span className="about-heading-star-wrapper">
                <svg
                  className="about-star-icon"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="40" cy="40" r="10" fill="white" />
                  {Array.from({ length: 20 }).map((_, i) => {
                    const angle = (i * 360) / 20;
                    const rad = (angle * Math.PI) / 180;
                    const innerR = i % 2 === 0 ? 14 : 13;
                    const outerR = i % 2 === 0 ? 38 : 28;
                    const x1 = 40 + innerR * Math.cos(rad);
                    const y1 = 40 + innerR * Math.sin(rad);
                    const x2 = 40 + outerR * Math.cos(rad);
                    const y2 = 40 + outerR * Math.sin(rad);
                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="white"
                        strokeWidth={i % 2 === 0 ? '1.5' : '0.8'}
                      />
                    );
                  })}
                </svg>
              </span>
              <span className="about-heading-text">ME</span>
            </h2>
          </div>

          {/* Content Row 1: Photo Left, Text Right */}
          <div ref={row1Ref} className="about-row">
            <div className="about-image-block">
              <img
                src="/profile.png"
                alt="Rashik Ghosh"
                className="about-photo"
              />
            </div>
            <div className="about-text-block">
              <p className="about-text">
                I am passionate full-stack developer based in Jamshedpur, India. As a Computer Science Engineering student with hands-on experience in modern web technologies, I thrive at the intersection of frontend innovation, backend architecture, and algorithmic problem-solving. My passion lies in building scalable web applications and implementing secure, user-centric solutions that bridge complex technical challenges with intuitive user experiences.
              </p>
              <p className="about-text">
                I am a quick learner with a strong foundation in computer science fundamentals and a proven ability to adapt to new technologies. My goal is to leverage my technical skills and problem-solving mindset to deliver high-quality software solutions that drive real business value.
              </p>
              <div className="about-stats-container">
                {/* Top Cards */}
                <div className="about-top-cards">
                  <div className="about-info-card about-card-blue">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span className="icn"><BookIcon/></span>
                      <span className="lbl" style={{fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em'}}>EDUCATION</span>
                    </div>
                    <div>
                      <div className="val" style={{ fontWeight: 800, fontSize: '1.25rem', lineHeight: 1.1 }}>3rd Year BTech</div>
                      <div className="sub" style={{ fontSize: '0.8rem', marginTop: '6px', fontWeight: 500 }}>LPU, Phagwara</div>
                    </div>
                  </div>

                  <div className="about-info-card about-card-green">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span className="icn"><ChipIcon/></span>
                      <span className="lbl" style={{fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em'}}>FOCUS</span>
                    </div>
                    <div>
                      <div className="val" style={{ fontWeight: 800, fontSize: '1.25rem', lineHeight: 1.1 }}>Full Stack Developer</div>
                      <div className="sub" style={{ fontSize: '0.8rem', marginTop: '6px', fontWeight: 500 }}>Computer Science & Engineering</div>
                    </div>
                  </div>

                  <div className="about-info-card about-card-white">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span className="icn"><ArrowUpRightIconLg/></span>
                      <span className="lbl" style={{fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em'}}>TECHNICAL</span>
                    </div>
                    <div>
                      <div className="val" style={{ fontWeight: 800, fontSize: '1.25rem', lineHeight: 1.1 }}>5+ Languages</div>
                      <div className="sub" style={{ fontSize: '0.8rem', marginTop: '6px', fontWeight: 500 }}>Building & Learning</div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="about-stat-row">
                  <div className="about-stat-box about-stat-light">
                    <div className="about-stat-num">5+</div>
                    <div className="about-stat-lbl">LANGUAGES MASTERED</div>
                  </div>
                  <div className="about-stat-box about-stat-dark">
                    <div className="about-stat-num">12+</div>
                    <div className="about-stat-lbl">PROJECTS BUILT</div>
                  </div>
                  <div className="about-stat-box about-stat-light">
                    <div className="about-stat-num">20+</div>
                    <div className="about-stat-lbl">CERTIFICATIONS</div>
                  </div>
                  <div className="about-stat-box about-stat-dark">
                    <div className="about-stat-num">200+</div>
                    <div className="about-stat-lbl">LEETCODE SOLVED</div>
                  </div>
                </div>

                {/* Links */}
                <div className="about-links-row mt-4">
                  <a href="https://github.com/Rashik2004" target="_blank" rel="noreferrer" className="about-pill about-pill-light">
                    GitHub Profile <ArrowUpRightIcon />
                  </a>
                  <a href="https://linkedin.com/in/rashik-ghosh12" target="_blank" rel="noreferrer" className="about-pill about-pill-light">
                    LinkedIn <ArrowUpRightIcon />
                  </a>
                  <a href="/ResumeTest.pdf" target="_blank" rel="noopener noreferrer" className="about-pill about-pill-dark">
                    View Resume <ArrowUpRightIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
