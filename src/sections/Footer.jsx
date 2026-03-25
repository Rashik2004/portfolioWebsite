const Footer = () => {
  return (
    <footer className="footer-section">
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="footer-content">
          <p className="footer-text">
            © {new Date().getFullYear()} Rashik Ghosh. Crafted with passion.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="footer-back-to-top"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
