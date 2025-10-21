import React from 'react'
import AboutVisual from '../components/AboutVisual'
import SEO from '../components/SEO'

const Press = () => {
  return (
    <div>
      <SEO 
        title="Press & Media – AionScript v1.0 LTF Launch Info"
        description="Explore AionScript's origin, impact, and strategic vision. Logos, product facts, and quotes for media coverage."
        canonicalUrl="https://aionscript.com/press"
      />
      <article aria-labelledby="page-title">
      <section className="hero hero--mini">
        <div className="hero-content">
          <h1 id="page-title" className="hero-title">Press & Media</h1>
          <p className="hero-subtitle">
            AionScript v1.0 LTF - The Language of Intelligent Data with meaning, trust, and governance built-in
          </p>
        </div>
      </section>

      <div className="container">
        <section className="about">
          <div className="about-content">
            <div className="about-text">
              <h2>About AionScript</h2>
              <p>
                <strong>One-liner:</strong> AionScript is the first AI-native data language that embeds meaning, 
                trust, and governance directly into data structures, solving the "dumb data" problem that 
                plagues modern AI systems.
              </p>
              
              <h3>Key Facts</h3>
              <ul>
                <li><strong>Launched:</strong> 2025 (v1.0 LTF - Long-Term Foundation)</li>
                <li><strong>Core components:</strong> .aion (authoring syntax), .sJson (structured JSON)</li>
                <li><strong>Open source:</strong> Yes (MIT license for SDK/CLI)</li>
                <li><strong>Standard status:</strong> Open specification (patent pending)</li>
                <li><strong>Target users:</strong> Developers (open-source SDK) and Enterprises (governance add-ons)</li>
                <li><strong>Website:</strong> aionscript.com</li>
                <li><strong>GitHub:</strong> github.com/aionscript</li>
              </ul>
              
              <h3>The Problem AionScript Solves</h3>
              <p>
                Most AI systems today work with "dumb data" - flat JSON that lacks context, confidence, 
                or governance information. This leads to brittle prompts, hallucinated responses, and 
                compliance nightmares. AionScript transforms static data into "intelligent data" that 
                carries its own meaning, evidence, and policies.
              </p>
              
              <h3>How It Works</h3>
              <ol>
                <li><strong>Author</strong> in .aion - a human-readable format with roles, symbols, and directives</li>
                <li><strong>Compile</strong> to .sJson - canonical JSON with embedded semantics and optional signatures</li>
                <li><strong>Use everywhere</strong> - APIs, databases, ML pipelines, governance tools</li>
              </ol>

              <h3>Why It's Brilliant (TL;DR)</h3>
              <ul>
                <li><strong>Technical:</strong> Solves prompt brittleness by embedding context and confidence directly in data</li>
                <li><strong>AI:</strong> Reduces hallucinations and improves model accuracy with self-describing data</li>
                <li><strong>Business:</strong> Eliminates custom parsing logic and reduces integration overhead</li>
                <li><strong>Philosophical:</strong> Data should carry its own meaning, not require external interpretation</li>
                <li><strong>Strategic:</strong> Open standard that organizations can adopt without vendor lock-in</li>
              </ul>
              
              <h3>Press Kit</h3>
              <ul>
                <li><strong>Logo downloads:</strong> Available on request</li>
                <li><strong>Founder quotes:</strong> Available for interviews</li>
                <li><strong>Technical demos:</strong> Live playground and CLI examples</li>
                <li><strong>Use cases:</strong> RAG systems, compliance automation, AI model training</li>
              </ul>
              
              <h3>Contact</h3>
              <p>
                For interviews, demos, or additional information, please reach out via GitHub or our contact form. 
                We're happy to provide technical demonstrations and discuss how AionScript is transforming 
                AI-native data systems.
              </p>
              
              <div className="hero-actions">
                <a 
                  className="btn btn-primary" 
                  href="https://github.com/aionscript" 
                  target="_blank" 
                  rel="noopener"
                >
                  View on GitHub
                </a>
                <a 
                  className="btn btn-secondary" 
                  href="mailto:press@aionscript.com"
                >
                  Media Inquiries
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

export default Press
