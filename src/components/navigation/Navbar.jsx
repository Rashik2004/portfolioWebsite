import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Journey', href: '#journey' },
  { name: 'Resume', href: '#resume' },
];

/* ── Framer variants ───────────────────────────────────────── */

// Navbar bar drops in from top
const navbarVariants = {
  hidden: { y: -90, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
};

// Staggered children for nav links
const navContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.5 },
  },
};

const navLinkVariants = {
  hidden: { y: -10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

// Brand slides in from left
const brandVariants = {
  hidden: { x: -24, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.35 },
  },
};

// CTA slides in from right
const ctaVariants = {
  hidden: { x: 24, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.45 },
  },
};

// Mobile menu expand/collapse
const mobileMenuVariants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
  },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
};

// Mobile menu items stagger in
const mobileItemVariants = {
  hidden: { x: -16, opacity: 0 },
  visible: (i) => ({
    x: 0,
    opacity: 1,
    transition: { delay: i * 0.055, duration: 0.3, ease: 'easeOut' },
  }),
};

// Hamburger lines morph into X
const topLineVariants = {
  closed: { rotate: 0,  y: 0 },
  open:   { rotate: 45, y: 7 },
};
const midLineVariants = {
  closed: { opacity: 1, scaleX: 1 },
  open:   { opacity: 0, scaleX: 0 },
};
const botLineVariants = {
  closed: { rotate: 0,   y: 0 },
  open:   { rotate: -45, y: -7 },
};

/* ── Styles ────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

  .nb-root {
    position: fixed;
    top: 1.5rem;
    left: 50%;
    z-index: 100;
    width: 95%;
    max-width: 1100px;
    border-radius: 2rem;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    box-shadow:
      0 4px 24px rgba(0, 0, 0, 0.08),
      0 1px 0 rgba(255, 255, 255, 0.65) inset,
      0 0 0 1px rgba(255, 255, 255, 0.28) inset;
  }

  .nb-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.85rem 1.5rem;
  }

  .nb-brand {
    font-family: 'Great Vibes', cursive;
    font-weight: 400;
    font-size: 1.8rem;
    letter-spacing: 0.02em;
    color: rgba(15, 15, 30, 0.9);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    white-space: nowrap;
  }
  .nb-brand-icon {
    width: 28px; height: 28px;
    background: rgba(255,255,255,0.35);
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.55);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  .nb-brand-diamond {
    width: 11px; height: 11px;
    background: rgba(15,15,30,0.75);
    border-radius: 2px;
    transform: rotate(45deg);
  }

  .nb-nav { display: flex; align-items: center; gap: 0.15rem; }

  .nb-link {
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 0.9rem; font-weight: 400;
    color: rgba(15,15,30,0.55);
    text-decoration: none;
    padding: 0.45rem 1rem;
    border-radius: 999px;
    white-space: nowrap;
    position: relative;
  }
  .nb-link.active { color: rgba(15,15,30,0.95); font-weight: 500; }

  /* Shared active pill — layoutId animates it across links */
  .nb-link-bg {
    position: absolute; inset: 0;
    border-radius: 999px;
    background: rgba(255,255,255,0.45);
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    z-index: -1;
  }

  .nb-cta {
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 0.9rem; font-weight: 500;
    color: rgba(15,15,30,0.85);
    text-decoration: none;
    padding: 0.5rem 1.4rem;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.55);
    background: rgba(255,255,255,0.25);
    white-space: nowrap;
    display: inline-block;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  }

  .nb-hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 36px; height: 36px;
    background: transparent;
    border: none; cursor: pointer;
    border-radius: 50%;
    margin-left: 0.75rem;
    padding: 0;
  }
  .nb-hamburger:hover { background: rgba(255,255,255,0.3); }

  .nb-mobile-menu {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0 1rem;
  }
  .nb-mobile-menu.open { padding-bottom: 1rem; }

  .nb-divider {
    height: 1px;
    background: rgba(255,255,255,0.4);
    margin-bottom: 0.5rem;
  }
  .nb-mobile-link {
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 0.95rem; font-weight: 400;
    color: rgba(15,15,30,0.6);
    text-decoration: none;
    padding: 0.6rem 1rem;
    border-radius: 0.75rem;
    transition: color 0.2s, background 0.2s;
    display: block;
  }
  .nb-mobile-link:hover, .nb-mobile-link.active {
    color: rgba(15,15,30,0.95);
    background: rgba(255,255,255,0.35);
  }
  .nb-mobile-cta {
    margin-top: 0.35rem;
    text-align: center;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 0.9rem; font-weight: 500;
    color: rgba(15,15,30,0.85);
    text-decoration: none;
    padding: 0.65rem 1rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(255,255,255,0.5);
    background: rgba(255,255,255,0.2);
    transition: background 0.2s;
    display: block;
  }
  .nb-mobile-cta:hover { background: rgba(255,255,255,0.4); }

  @media (max-width: 767px) {
    .nb-nav      { display: none; }
    .nb-cta-wrap { display: none; }
    .nb-hamburger { display: flex; }
  }
`;

/* ── Component ─────────────────────────────────────────────── */
const Navbar = () => {
  const [activeLink, setActiveLink] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <style>{css}</style>

      {/* ── Main bar ── */}
      <motion.header
        className="nb-root"
        style={{ translateX: '-50%' }}
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="nb-inner">

          {/* Brand — slides from left */}
          <motion.a
            href="#hero"
            className="nb-brand"
            variants={brandVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ opacity: 0.65 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.div
              className="nb-brand-icon"
              whileHover={{ rotate: 15, scale: 1.12 }}
              transition={{ type: 'spring', stiffness: 320, damping: 14 }}
            >
              <div className="nb-brand-diamond" />
            </motion.div>
            Rashik Ghosh
          </motion.a>

          {/* Desktop nav — staggered drop-in */}
          <motion.nav
            className="nb-nav"
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={`nb-link${activeLink === link.name ? ' active' : ''}`}
                variants={navLinkVariants}
                onClick={() => setActiveLink(link.name)}
                whileHover={{ color: 'rgba(15,15,30,0.9)' }}
              >
                {/* Shared layout pill glides between active links */}
                <AnimatePresence>
                  {activeLink === link.name && (
                    <motion.span
                      className="nb-link-bg"
                      layoutId="active-pill"
                      initial={{ opacity: 0, scale: 0.82 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.82 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </AnimatePresence>
                {link.name}
              </motion.a>
            ))}
          </motion.nav>

          {/* Right — CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* CTA — slides from right */}
            <motion.div
              className="nb-cta-wrap"
              variants={ctaVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.a
                href="#contact"
                className="nb-cta"
                whileHover={{
                  background: 'rgba(255,255,255,0.45)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.94 }}
                transition={{ duration: 0.18 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Morphing hamburger → X */}
            <motion.button
              className="nb-hamburger"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.88 }}
            >
              {[topLineVariants, midLineVariants, botLineVariants].map((v, i) => (
                <motion.span
                  key={i}
                  style={{
                    display: 'block', width: 20, height: 2,
                    background: 'rgba(15,15,30,0.8)',
                    borderRadius: 2, transformOrigin: 'center',
                  }}
                  variants={v}
                  animate={menuOpen ? 'open' : 'closed'}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                />
              ))}
            </motion.button>
          </div>
        </div>

        {/* ── Mobile dropdown ── */}
        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              className="nb-mobile-menu open"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="nb-divider" />
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={`nb-mobile-link${activeLink === link.name ? ' active' : ''}`}
                  custom={i}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={() => { setActiveLink(link.name); setMenuOpen(false); }}
                  whileTap={{ scale: 0.97 }}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                className="nb-mobile-cta"
                custom={navLinks.length}
                variants={mobileItemVariants}
                initial="hidden"
                animate="visible"
                onClick={() => setMenuOpen(false)}
                whileTap={{ scale: 0.97 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Navbar;
