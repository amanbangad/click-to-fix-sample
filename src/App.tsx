import { NavBar } from './components/NavBar'
import { Hero } from './components/Hero'
import { Logos } from './components/Logos'
import { Features } from './components/Features'
import { Pricing } from './components/Pricing'
import { Testimonial } from './components/Testimonial'
import { CTA } from './components/CTA'
import { Footer } from './components/Footer'

export function App() {
  return (
    <div className="page">
      <NavBar />
      <main>
        <Hero />
        <Logos />
        <Features />
        <Pricing />
        <Testimonial />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
