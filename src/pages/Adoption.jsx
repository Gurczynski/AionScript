import React from 'react'
import AboutVisual from '../components/AboutVisual'
import SEO from '../components/SEO'

const Adoption = () => {
  return (
    <div>
      <SEO 
        title="Adopt AionScript — From Open Source to Enterprise"
        description="Start with open-source CLI and SDK. Scale to enterprise with policy enforcement, governance dashboards, and data trust."
        canonicalUrl="https://aionscript.com/adoption"
      />
      <section className="hero hero--mini">
        <div className="hero-content">
          <h1 className="hero-title">Adopt AionScript</h1>
          <p className="hero-subtitle">
            Start open-source, scale to enterprise. Build AI-native data systems with meaning, trust, and governance.
          </p>
        </div>
      </section>

      <div className="container">
        <section className="about">
          <div className="about-content">
            <div className="about-text">
              <h2>Adoption Made Easy</h2>
              <p>
                AionScript v1.0 LTF is designed for flexible adoption. Start small with our free, 
                open-source tooling and gradually integrate it into your systems. Whether you're 
                a solo developer prototyping or an enterprise architect planning across teams, 
                AionScript meets you where you are.
              </p>
              
              <h3>For Developers (Open Source)</h3>
              <ul>
                <li><strong>SDK/CLI (MIT)</strong> - Canonicalize, sign/verify, validate (available on GitHub/npm)</li>
                <li><strong>Adapters</strong> - Built-in support for CSV, PDF, HTML, SQL, MongoDB, embeddings</li>
                <li><strong>Playground</strong> - Interactive web UI to validate schema, view canonical hash, verify signatures</li>
                <li><strong>Editor plugins</strong> - VSCode support (planned)</li>
              </ul>
              
              <h3>For Enterprises (Core Add-on)</h3>
              <ul>
                <li><strong>Provenance index</strong> - Complete chain of custody and audit trails</li>
                <li><strong>Signing & keys</strong> - Enterprise key management and digital signatures</li>
                <li><strong>Policy orchestration</strong> - Automated enforcement of classification, consent, retention</li>
                <li><strong>Governance dashboards</strong> - Management visibility and compliance reporting</li>
              </ul>
              
              <h3>Adoption Paths</h3>
              <ul>
                <li><strong>Greenfield</strong> - Use AionScript from day one in new projects</li>
                <li><strong>Wrapper</strong> - Incrementally add semantics on top of existing JSON</li>
                <li><strong>Gradual</strong> - Migrate critical payloads first, expand over time</li>
                <li><strong>Local AI</strong> - Works with local model setups for privacy-centric users</li>
                <li><strong>Hosted AI</strong> - Integrates with OpenAI, Anthropic, and other cloud AI services</li>
                <li><strong>Governance</strong> - Use roles and symbols to enforce policy from day one</li>
              </ul>
              
              <h3>Why Standardize on AionScript?</h3>
              <ul>
                <li><strong>Lower TCO</strong> - Eliminate countless custom schemas and parsing logic</li>
                <li><strong>Faster teams</strong> - Shared contracts reduce handoffs and integration errors</li>
                <li><strong>Risk reduction</strong> - Typed semantics prevent silent errors and improve reliability</li>
                <li><strong>No lock-in</strong> - Works with any database, file, or AI model that uses JSON</li>
                <li><strong>Future-proof</strong> - v1.0 LTF provides long-term stability and backward compatibility</li>
              </ul>
              
              <div className="hero-actions">
                <a 
                  className="btn btn-primary" 
                  href="https://github.com/aionscript" 
                  target="_blank" 
                  rel="noopener"
                >
                  Start with Open Source
                </a>
                <a 
                  className="btn btn-secondary" 
                  href="mailto:enterprise@aionscript.com"
                >
                  Contact for Enterprise
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

export default Adoption
