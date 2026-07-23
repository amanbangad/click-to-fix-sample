export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">Mango</span>
          <h1 className="hero-title">Ship reliable software, faster.</h1>
          <p className="hero-sub">
            Nimbus gives your team one place to build, test, and release - with
            confidence baked into every single deploy.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary btn-lg" href="#">
              Start free trial
            </a>
            <a className="btn btn-ghost btn-lg" href="#">
              Book a demo
            </a>
          </div>
          <div className="hero-note">No credit card required - 14-day free trial</div>
        </div>

        <div className="hero-art">
          <div className="hero-card">
            <div className="hero-card-row">
              <span className="pill pill-green">DEPLOY</span>
              <span className="muted">2m ago</span>
            </div>
            <div className="hero-bar">
              <span style={{ width: '82%' }} />
            </div>
            <div className="hero-card-row">
              <span className="muted">Build #1284</span>
              <span className="pill pill-blue">Passing</span>
            </div>
            <div className="hero-card-row">
              <span className="muted">Coverage</span>
              <span className="mono">94.2%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
