import React from 'react'
import AboutVisual from '../components/AboutVisual'
import SEO from '../components/SEO'

const About = () => {
  return (
    <div>
      <SEO 
        title="About AionScript — Why Intelligent Data Matters"
        description="AionScript was created to fix flat, untrustworthy JSON. Our mission: make intelligent, self-describing data the default for modern AI systems."
        canonicalUrl="https://aionscript.com/about"
      />
      <article aria-labelledby="page-title">
      <section className="hero hero--mini">
        <div className="hero-content">
          <h1 id="page-title" className="hero-title">About AionScript</h1>
          <p className="hero-subtitle">
            The origin story and vision behind the Language of Intelligent Data
          </p>
        </div>
      </section>

      <div className="container">
        <section className="about">
          <div className="about-content">
            <div className="about-text">
              <h2>The Origin of AionScript</h2>
              <p>
                JSON, while universal, fell short for AI applications. We needed a way to embed 
                intent and context directly in data. That led to the creation of AionScript - 
                a language that reads like structured prose and keeps meaning intact.
              </p>
              
              <p>
                The problem was clear: AI systems were working with "dumb data" - flat JSON 
                that lacked context, confidence, or governance information. This led to brittle 
                prompts, hallucinated responses, and compliance nightmares. Teams were spending 
                countless hours building custom schemas and parsing logic, only to lose semantic 
                meaning in translation.
              </p>
              
              <h3>Our Mission</h3>
              <p>
                To make intelligent data a universal standard. We believe data should carry its 
                own meaning, evidence, and policies - not require external interpretation. 
                AionScript transforms static data into self-aware, verifiable, and governable 
                information that AI systems can truly understand.
              </p>
              
              <h3>Core Principles</h3>
              <ul>
                <li><strong>Semantics First:</strong> Meaning should be explicit, not implied</li>
                <li><strong>Human-Readable:</strong> Teams can collaborate on data definitions</li>
                <li><strong>Deterministic Machines:</strong> Always compile back to a canonical form</li>
                <li><strong>Governance by Design:</strong> Data should carry its own policies and provenance</li>
              </ul>
              
              <h3>The v1.0 LTF Vision</h3>
              <p>
                AionScript v1.0 LTF (Long-Term Foundation) represents our commitment to stability 
                and backward compatibility. This isn't just another data format - it's a foundation 
                for the next generation of AI-native systems. We're building for the long term, 
                ensuring that organizations can adopt AionScript with confidence that their 
                investment will be protected.
              </p>
              
              <h3>Why Now?</h3>
              <p>
                As AI becomes central to every business process, the need for intelligent data 
                has never been greater. Traditional approaches of gluing prompts to flat JSON 
                simply don't scale. AionScript provides the semantic infrastructure that modern 
                AI systems require - with meaning, trust, and governance built-in from day one.
              </p>
              
              <div className="hero-actions">
                <a 
                  className="btn btn-primary" 
                  href="https://github.com/aionscript" 
                  target="_blank" 
                  rel="noopener"
                >
                  Join the Mission
                </a>
                <a 
                  className="btn btn-secondary" 
                  href="/beta"
                >
                  Early Access Program
                </a>
              </div>
            </div>
            <AboutVisual />
          </div>
        </section>
      </div>
      </article>
    </div>
  )
}

export default About
