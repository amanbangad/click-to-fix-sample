const NAMES = ['Northwind', 'Acme', 'Globex', 'Umbra', 'Initech', 'Hooli']

export function Logos() {
  return (
    <section className="logos">
      <div className="container">
        <p className="logos-label">Trusted by fast-moving teams</p>
        <div className="logos-row">
          {NAMES.map((n) => (
            <span key={n} className="logo-item">
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
