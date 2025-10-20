import React from 'react'
import AboutVisual from '../components/AboutVisual'
import CodeBlock from '../components/CodeBlock'
import SEO from '../components/SEO'

const SJson = () => {
  return (
    <div>
      <SEO 
        title="Structured JSON (.sJson) — Canonical, Trusted Data"
        description=".sJson is the output of AionScript: standard JSON with semantics, evidence, trust, and governance. Fully AI-ready and verifiable."
        canonicalUrl="https://aionscript.com/sjson"
      />
      <section className="hero hero--mini">
        <div className="hero-content">
          <h1 className="hero-title">Structured JSON (.sJson)</h1>
          <p className="hero-subtitle">
            Canonical JSON with meaning, trust, and governance built-in. Works wherever JSON works.
          </p>
        </div>
      </section>

      <div className="container">
        <section className="about">
          <div className="about-content">
            <div className="about-text">
              <h2>What is .sJson?</h2>
              <p>
                .sJson (structured JSON) is the compiled, canonical output format of AionScript v1.0 LTF. 
                It's standard JSON enhanced with semantic metadata, evidence tracking, and governance 
                information. Because it's still JSON, it works with any existing JSON-compatible system.
              </p>
              
              <h3>Universal Meta Layer</h3>
              <p>Every .sJson object can include these standardized fields:</p>
              <ul>
                <li><strong>@type, @context:</strong> Self-describing data with semantic types</li>
                <li><strong>@confidence, @evidence:</strong> ML-ready signals for AI model grounding</li>
                <li><strong>@hash, @sig, @keyId:</strong> Cryptographic verification and integrity</li>
                <li><strong>@timestamp, @source:</strong> Provenance and freshness tracking</li>
                <li><strong>@classification, @consent:</strong> Built-in governance and policy</li>
                <li><strong>@embedding:</strong> Vector representations for semantic search</li>
              </ul>
              
              <h3>Why .sJson Works</h3>
              <ul>
                <li><strong>JSON Compatible:</strong> Drop-in replacement for existing JSON workflows</li>
                <li><strong>Self-Describing:</strong> Data carries its own meaning and context</li>
                <li><strong>Verifiable:</strong> Canonical serialization enables consistent hashing</li>
                <li><strong>AI-Ready:</strong> Confidence and evidence fields improve model accuracy</li>
                <li><strong>Governable:</strong> Policy metadata travels with the data</li>
              </ul>

              <h3>Example Structure</h3>
              <CodeBlock>
{`{
  "@type": "Person",
  "@context": "https://schema.org/",
  "@confidence": 0.95,
  "@evidence": ["user_input", "validation_check"],
  "name": "John Doe",
  "email": "john@example.com",
  "@hash": "sha256:abc123...",
  "@timestamp": "2024-01-01T00:00:00Z",
  "@classification": "internal",
  "@consent": "analytics_approved"
}`}
              </CodeBlock>
              
              <p>
                This .sJson object is both human-readable and machine-processable, with built-in 
                governance, verification, and AI-readiness.
              </p>
              
              <div className="hero-actions">
                <a 
                  className="btn btn-primary" 
                  href="https://github.com/aionscript" 
                  target="_blank" 
                  rel="noopener"
                >
                  View Specification
                </a>
                <a 
                  className="btn btn-secondary" 
                  href="/aion"
                >
                  Learn .aion Authoring
                </a>
              </div>
            </div>
            <AboutVisual />
          </div>
        </section>
      </div>
    </div>
  )
}

export default SJson
