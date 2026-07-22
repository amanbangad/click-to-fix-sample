export function Testimonial() {
  return (
    <section id="customers" className="section">
      <div className="container">
        <blockquote className="quote">
          <p className="quote-text">
            "We cut our release time in half and stopped shipping regressions.
            Nimbus is the first tool the whole team actually agrees on."
          </p>
          <footer className="quote-by">
            <span className="quote-avatar">JL</span>
            <span>
              <strong>Jordan Lee</strong>
              <br />
              <span className="muted">VP Engineering, Globex</span>
            </span>
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
