import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
        defaults: { ease: 'power3.out', duration: 0.8 },
      });

      tl.fromTo(leftRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1 })
        .fromTo(formRef.current, { x: 50, opacity: 0 }, { x: 0, opacity: 1 }, '-=0.6');
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="section-outer">
      {/* Wave transition from Light (Resume) to Dark (Contact) */}
      <div className="section-wave-container">
        <svg className="section-wave-svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,120 C480,18 960,98 1440,38 L1440,120 Z" fill="#1a1a1a" />
        </svg>
      </div>

      <section id="contact" className="contact-section" ref={containerRef}>
        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="contact-grid">
            <div className="contact-left" ref={leftRef}>
              <h2 className="about-heading" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                <span className="about-heading-text">LET'S</span><br />
                <span className="about-heading-text" style={{ fontStyle: 'normal', color: '#c0c0c0', marginLeft: '0.5em' }}>TALK.</span>
              </h2>
              <p className="contact-desc">
                I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
              <div className="contact-socials">
                <a href="mailto:rashikghosh1918@gmail.com" className="contact-link">Email</a>
                <a href="https://www.linkedin.com/in/rashik-ghosh12/" className="contact-link" target="_blank" rel="noreferrer">LinkedIn</a>
                <a href="https://github.com/Rashik2004" className="contact-link" target="_blank" rel="noreferrer">GitHub</a>
              </div>
            </div>
            
            <div className="contact-right" ref={formRef}>
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <input type="text" id="name" placeholder="Name" required className="contact-input" />
                </div>
                <div className="form-group">
                  <input type="email" id="email" placeholder="Email" required className="contact-input" />
                </div>
                <div className="form-group">
                  <textarea id="message" rows="4" placeholder="Message" required className="contact-input"></textarea>
                </div>
                <button type="submit" className="contact-btn" style={{ marginTop: '1rem', width: '100%' }}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
