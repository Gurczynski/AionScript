import React from 'react'
import { Link } from 'react-router-dom'
import AboutVisual from '../components/AboutVisual'
import SEO from '../components/SEO'

const Docs = () => {
  return (
    <div>
      <SEO 
        title="AionScript Documentation — Language, Format, Examples"
        description="Learn how to author in .aion, compile to .sJson, and integrate AionScript into your AI-native data systems."
        canonicalUrl="https://aionscript.com/docs"
      />
      {/* Hero Section */}
      <section className="hero hero--mini">
        <div className="hero-content">
          <h1 className="hero-title">Documentation</h1>
          <p className="hero-subtitle">
            Learn how to use AionScript v1.0 LTF to build AI-native data systems with meaning, trust, and governance
          </p>
        </div>
      </section>

      {/* Documentation Content */}
      <div className="container">
        <section className="about">
          <div className="about-content">
            <div className="about-text">
              <h2>Getting Started</h2>
              <p>
                AionScript v1.0 LTF (Long-Term Foundation) is a stable, production-ready standard 
                designed to make your data AI-ready by embedding meaning, evidence, and governance 
                directly into the data structure.
              </p>
              
              <h3>What is AionScript?</h3>
              <p>
                AionScript pairs a human‑first authoring language (.aion) with a canonical machine format (.sJson). 
                You author richly structured data with roles, symbols, and directives in .aion; you compile to 
                deterministic JSON (.sJson) that machines can validate and services can trust.
              </p>
              
              <h3>Quick Start</h3>
              <ol>
                <li><strong>Install</strong> the AionScript CLI: <code>npm install -g aionscript</code></li>
                <li><strong>Create</strong> your first .aion file with semantic metadata</li>
                <li><strong>Compile</strong> to .sJson format: <code>aionc example.aion {'>'} example.sjson</code></li>
                <li><strong>Use</strong> the structured JSON in your AI applications</li>
              </ol>

              <h3>Key Concepts</h3>
              <ul>
                <li><strong>.aion files</strong> - Human-readable source format</li>
                <li><strong>.sJson files</strong> - Compiled, canonical JSON format</li>
                <li><strong>Meta fields</strong> - @type, @context, @confidence, etc.</li>
                <li><strong>Evidence</strong> - @coverage, @evidence[] for grounding</li>
                <li><strong>Governance</strong> - Built-in policy and provenance</li>
              </ul>

              <div className="hero-actions">
                <a 
                  className="btn btn-primary" 
                  href="https://github.com/aionscript" 
                  target="_blank" 
                  rel="noopener"
                >
                  View on GitHub
                </a>
                <Link className="btn btn-secondary" to="/sjson">
                  Learn sJson
                </Link>
              </div>
            </div>
            <AboutVisual />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Docs
