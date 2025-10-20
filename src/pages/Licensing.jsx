import React from 'react'
import AboutVisual from '../components/AboutVisual'

const Licensing = () => {
  return (
    <div>
      <section className="hero hero--mini">
        <div className="hero-content">
          <h1 className="hero-title">Licensing</h1>
          <p className="hero-subtitle">
            Open specifications, MIT tools, and proprietary services
          </p>
        </div>
      </section>

      <div className="container">
        <section className="about">
          <div className="about-content">
            <div className="about-text">
              <h2>1. AionScript Language Specification (.aion and .sJson)</h2>
              <p>
                The AionScript language and specification—including the .aion syntax and .sJson structured JSON format—are licensed under the <strong>AionScript Open Specification License v1.0 (AOSL-1.0)</strong>.
              </p>
              <p>
                This license permits unrestricted implementation of the specification in any programming language or system, provided implementations acknowledge and preserve the semantic intent of .aion and .sJson.
              </p>
              <p>
                <strong>License URL:</strong> <a href="#" target="_blank" rel="noopener">[Link to AOSL-1.0 PDF or GitHub repo]</a>
              </p>

              <h2>2. Open-Source Tooling</h2>
              <p>
                All official developer tools provided by AionScript (CLI, SDKs, VS Code extension) are released under the <strong>MIT License</strong>, allowing free use, distribution, and modification.
              </p>
              <p>
                <strong>MIT License Summary:</strong> <a href="#" target="_blank" rel="noopener">[Link to GitHub or open repo]</a>
              </p>
              <p>
                You may use these tools in personal, academic, commercial, or enterprise settings.
              </p>

              <h3>What the MIT License means for our tools:</h3>
              <ul>
                <li>Free to use in any project</li>
                <li>No licensing fees</li>
                <li>Can be modified and redistributed</li>
                <li>Commercial use allowed</li>
                <li>Minimal restrictions and requirements</li>
              </ul>

              <h2>3. Proprietary Services and IP</h2>
              <p>
                The <strong>AionScript Engine</strong>, <strong>AionScript Cloud™</strong>, and advanced inference/runtime systems are proprietary software. Access and use are governed by the <a href="/terms">Terms of Service</a>.
              </p>
              <p>
                Source code for these systems is not publicly licensed and may not be reverse-engineered or redistributed.
              </p>

              <h3>Summary</h3>
              <div style={{backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginTop: '2rem', fontSize: '1rem', lineHeight: '1.6', color: '#444'}}>
                <ul style={{marginBottom: 0}}>
                  <li style={{marginBottom: '0.5rem', fontSize: '1rem'}}><strong>Language Specification:</strong> AOSL-1.0 (Open)</li>
                  <li style={{marginBottom: '0.5rem', fontSize: '1rem'}}><strong>Developer Tools:</strong> MIT License (Open Source)</li>
                  <li style={{fontSize: '1rem'}}><strong>Engine & Cloud Services:</strong> Proprietary</li>
                </ul>
              </div>
            </div>
            <AboutVisual />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Licensing
