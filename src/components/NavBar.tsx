export function NavBar() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a className="brand" href="#">
          <span className="brand-mark">◆</span> Nimbus
        </a>
        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#customers">Customers</a>
          <a href="#docs">Docs</a>
        </nav>
        <div className="nav-cta">
          <a className="btn btn-ghost" href="#">
            Sign in
          </a>
          <a className="btn btn-primary" href="#">
            Start free
          </a>
        </div>
      </div>
    </header>
  )
}
