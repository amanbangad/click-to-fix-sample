export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a className="brand" href="#">
            <span className="brand-mark">◆</span> Nimbus
          </a>
          <p className="muted">Ship reliable software, faster.</p>
        </div>
        <div className="footer-cols">
          <div className="footer-col">
            <h4>Product</h4>
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">Changelog</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span className="muted">© 2026 Nimbus, Inc.</span>
      </div>
    </footer>
  )
}
