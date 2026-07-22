interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc">{description}</p>
    </div>
  )
}

export function Features() {
  return (
    <section id="features" className="section">
      <div className="container">
        <h2 className="section-title">Everything you need to ship</h2>
        <p className="section-sub">
          From first commit to production, without the guesswork.
        </p>
        <div className="feature-grid">
          <FeatureCard
            icon="⚡"
            title="Instant previews"
            description="Every branch gets a live URL in seconds, so reviews happen on the real UI."
          />
          <FeatureCard
            icon="🛡️"
            title="Safe deploys"
            description="Automatic rollbacks and health checks keep bad releases out of production."
          />
          <FeatureCard
            icon="📊"
            title="Clear insights"
            description="See build times, coverage, and error rates in one shared dashboard."
          />
          <FeatureCard
            icon="🔌"
            title="Fits your stack"
            description="First-class integrations for GitHub, Slack, and the tools you already use."
          />
        </div>
      </div>
    </section>
  )
}
