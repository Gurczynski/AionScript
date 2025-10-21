import React from 'react'
import AboutVisual from '../components/AboutVisual'
import SEO from '../components/SEO'

const Aion = () => {
  return (
    <div>
      <SEO 
        title="The Aion Language (.aion) — Author with Meaning"
        description=".aion is a human-readable language for intelligent data. Author structured data with semantics, context, and intent. Compile to .sJson."
        canonicalUrl="https://aionscript.com/aion"
      />
      <article aria-labelledby="page-title">
      <section className="hero hero--mini">
        <div className="hero-content">
          <h1 id="page-title" className="hero-title">The Aion Language (.aion)</h1>
          <p className="hero-subtitle">
            Human-readable authoring with meaning built-in. Author with intent; compile to deterministic .sJson.
          </p>
        </div>
      </section>

      <div className="container">
        <section className="about">
          <div className="about-content">
            <div className="about-text">
              <h3>Quick Example</h3>
              <div className="code-block-container">
                <pre className="code">
{`{A}
title: "Marketing plan"
owner @role: "PM"
audience @role: ["Design","Growth"]
goals: +["Increase signups","Clarify value"]
@directive(generate): brief for Q1 launch
{/A}`}
                </pre>
              </div>
              <p>
                In Aion, @role and @directive are explicit semantics - simple to read, powerful for AI.
              </p>

              <h2>Authoring Principles</h2>
              <ul>
                <li><strong>Semantics First:</strong> Meaning should be explicit, not implied</li>
                <li><strong>Human-Readable:</strong> Teams can collaborate on data definitions</li>
                <li><strong>Deterministic Machines:</strong> Always compile back to a canonical form</li>
                <li><strong>Portable:</strong> Works offline; independent of model/vendor</li>
              </ul>
              
              <h3>Why Aion</h3>
              <ul>
                <li><strong>Human-first:</strong> Readable like prose, precise like code. Teams reason together with clear roles, symbols, and directives</li>
                <li><strong>AI-native:</strong> Stop gluing prompts to flat JSON - embed context and confidence directly</li>
                <li><strong>Composable:</strong> Scale from single objects to complex systems without losing clarity</li>
                <li><strong>Deterministic:</strong> Compiles to canonical .sJson for consistent hashing and verification</li>
                <li><strong>Interoperable:</strong> Transforms to JSON while preserving semantics</li>
                <li><strong>Safe by Design:</strong> Strong typing and validated directives reduce runtime surprises</li>
              </ul>
              
              <h3>Smart Semantics</h3>
              <p>.aion adds meaning that compiles to .sJson:</p>
              <ul>
                <li><strong>Type Awareness:</strong> @type and @context make data self-describing</li>
                <li><strong>Context & Links:</strong> @link creates graph-like relationships between objects</li>
                <li><strong>Confidence:</strong> @confidence and @evidence provide ML-ready signals</li>
                <li><strong>Adaptation:</strong> Enable safe functions and hooks for self-execution</li>
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
                <a 
                  className="btn btn-secondary" 
                  href="/docs"
                >
                  Implementation Guide
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

export default Aion
