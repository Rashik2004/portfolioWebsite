import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React.js', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'Tailwind CSS', 'Bootstrap', 'Framer Motion', 'JQuery']
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'Java', 'Python', 'C++', 'C', 'PHP']
  },
  {
    title: 'Database',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB']
  },
  {
    title: 'Tools & Soft Skills',
    skills: ['Git & GitHub', 'Postman', 'Vite', 'Figma', 'Problem-Solving', 'Project Management', 'Leadership', 'Adaptability']
  }
];

const Skills = () => {
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: headingRef.current, start: 'top 85%' } }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: i * 0.15, scrollTrigger: { trigger: card, start: 'top 90%' } }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="skills-section">
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Heading */}
        <div ref={headingRef} className="skills-heading-wrapper">
          <h2 className="skills-heading">
            <span className="skills-heading-text" style={{ color: '#111' }}>TECH</span>
            <span className="about-heading-star-wrapper">
              <svg className="about-star-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="10" fill="#111" />
                {Array.from({ length: 20 }).map((_, i) => {
                  const angle = (i * 360) / 20;
                  const rad = (angle * Math.PI) / 180;
                  const innerR = i % 2 === 0 ? 14 : 13;
                  const outerR = i % 2 === 0 ? 38 : 28;
                  return (
                    <line key={i} x1={40 + innerR * Math.cos(rad)} y1={40 + innerR * Math.sin(rad)} x2={40 + outerR * Math.cos(rad)} y2={40 + outerR * Math.sin(rad)} stroke="#111" strokeWidth={i % 2 === 0 ? '1.5' : '0.8'} />
                  );
                })}
              </svg>
            </span>
            <span className="skills-heading-text" style={{ color: '#111' }}>STACK</span>
          </h2>
        </div>

        {/* CSS 3-Column Grid */}
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div 
              key={category.title} 
              ref={(el) => (cardsRef.current[index] = el)} 
              className="skill-card"
            >
              <h3 className="skill-category-title">{category.title}</h3>
              <div className="skill-tags">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
