interface PricingCardProps {
  name: string
  price: string
  period: string
  features: string[]
  highlighted?: boolean
  cta: string
}

function PricingCard({ name, price, period, features, highlighted, cta }: PricingCardProps) {
  return (
    <div className={`price-card ${highlighted ? 'highlighted' : ''}`}>
      {highlighted && <span className="price-flag">Most popular</span>}
      <h3 className="price-name">{name}</h3>
      <div className="price-amount">
        {price}
        <span className="price-period">/{period}</span>
      </div>
      <ul className="price-features">
        {features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <a className={`btn ${highlighted ? 'btn-primary' : 'btn-ghost'} btn-block`} href="#">
        {cta}
      </a>
    </div>
  )
}

export function Pricing() {
  return (
    <section id="pricing" className="section section-alt">
      <div className="container">
        <h2 className="section-title">Simple, predictable pricing</h2>
        <p className="section-sub">Start free. Upgrade when your team grows.</p>
        <div className="price-grid">
          <PricingCard
            name="Starter"
            price="$0"
            period="mo"
            cta="Get started"
            features={['1 project', 'Preview deploys', 'Community support']}
          />
          <PricingCard
            name="Team"
            price="$49"
            period="mo"
            highlighted
            cta="Start free trial"
            features={['Unlimited projects', 'Safe deploys + rollbacks', 'Slack + GitHub', 'Priority support']}
          />
          <PricingCard
            name="Enterprise"
            price="Custom"
            period="yr"
            cta="Contact sales"
            features={['SSO + SAML', 'Audit logs', 'Dedicated support', '99.99% uptime SLA']}
          />
        </div>
      </div>
    </section>
  )
}
