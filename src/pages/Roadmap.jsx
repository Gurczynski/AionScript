import React from 'react'
import SEO from '../components/SEO'

const Roadmap = () => {
  return (
    <div>
      <SEO 
        title="Roadmap - What’s Next for AionScript"
        description="AionScript development roadmap: upcoming features, releases, and platform improvements."
        canonicalUrl="https://aionscript.com/roadmap"
      />
      <article aria-labelledby="page-title">
      <section className="hero hero--mini">
        <div className="hero-content">
          <h1 id="page-title" className="hero-title">Roadmap</h1>
          <p className="hero-subtitle">
            What's coming next for AionScript
          </p>
        </div>
      </section>

      <section className="features">
        <div className="section-header">
          <h2>Development Roadmap</h2>
          <p>Our planned features and improvements</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <h3>Q1 2025</h3>
            <ul>
              <li>Core CLI and compiler</li>
              <li>Basic .aion to .sJson conversion</li>
              <li>Schema validation</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="14" rx="2" ry="2"/>
                <line x1="7" y1="8" x2="17" y2="8"/>
                <line x1="7" y1="12" x2="17" y2="12"/>
                <line x1="7" y1="16" x2="13" y2="16"/>
              </svg>
            </div>
            <h3>Q2 2025</h3>
            <ul>
              <li>Web playground</li>
              <li>Enhanced adapters</li>
              <li>Documentation improvements</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </div>
            <h3>Q3 2025</h3>
            <ul>
              <li>AionScript Cloud (Beta)</li>
              <li>Governance dashboards</li>
              <li>Enterprise features</li>
            </ul>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="8" rx="10" ry="4"/>
                <path d="M2 8v8c0 2.2 4.5 4 10 4s10-1.8 10-4V8"/>
                <path d="M2 12c0 2.2 4.5 4 10 4s10-1.8 10-4"/>
              </svg>
            </div>
            <h3>Q4 2025</h3>
            <ul>
              <li>AionScript DB</li>
              <li>Advanced analytics</li>
              <li>Ecosystem integrations</li>
            </ul>
          </div>
        </div>
      </section>
      </article>
    </div>
  )
}

export default Roadmap
