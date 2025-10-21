import React from 'react'
import AboutVisual from '../components/AboutVisual'
import SEO from '../components/SEO'

const Patent = () => {
  return (
    <div>
      <SEO 
        title="Patent Information - AionScript Technology"
        description="Patent status and intellectual property information related to AionScript systems, methods, and innovations."
        canonicalUrl="https://aionscript.com/patent"
      />
      <article aria-labelledby="page-title">
      <section className="hero hero--mini">
        <div className="hero-content">
          <h1 id="page-title" className="hero-title">Patent Information</h1>
          <p className="hero-subtitle">
            Intellectual property and patent status for AionScript technology
          </p>
        </div>
      </section>

      <div className="container">
        <section className="about">
          <div className="about-content">
            <div className="about-text">
              <h2>Patent Status</h2>
              <p>
                AionScript and its underlying systems may be protected by one or more patents (granted or pending) in the U.S. and other jurisdictions. These may include but are not limited to:
              </p>
              
              <ul>
                <li><strong>Semantic transformation pipelines</strong> for .aion → .sJson</li>
                <li><strong>Contextual runtime models</strong> for intelligent structured data</li>
                <li><strong>Systems enabling trust and provenance</strong> in human-authored schema</li>
              </ul>

              <h2>Innovation and Open Standards</h2>
              <p>
                While we protect our core innovations through patents, AionScript remains committed to open standards and community development. Our open-source tools and specifications are designed to foster innovation while respecting intellectual property rights.
              </p>
              
              <p>
                For questions about how patents may affect your use of AionScript technology, or to discuss licensing arrangements, please reach out to our legal team.
              </p>

              <h2>Compliance and Integration</h2>
              <p>
                If your organization requires a formal statement regarding patent status for compliance, procurement, or integration, please contact us at:
              </p>
              
              <div style={{backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', margin: '1.5rem 0', fontSize: '1rem', lineHeight: '1.6', color: '#444'}}>
                <p style={{marginBottom: '0.5rem', fontSize: '1rem'}}>
                  <strong>Patent Inquiries:</strong> <a href="mailto:patents@aionscript.com">patents@aionscript.com</a>
                </p>
                <p style={{marginBottom: 0, fontSize: '1rem'}}>
                  <strong>Legal Inquiries:</strong> <a href="mailto:legal@aionscript.com">legal@aionscript.com</a>
                </p>
              </div>

              <h2>Rights and Protections</h2>
              <p>
                All rights reserved. Unauthorized use or reproduction of patented systems may be subject to legal action.
              </p>
              
              <div style={{backgroundColor: '#fff3cd', padding: '1rem', borderRadius: '8px', border: '1px solid #ffeaa7', marginTop: '2rem', fontSize: '1rem', lineHeight: '1.6', color: '#856404'}}>
                <p style={{marginBottom: 0, fontSize: '1rem'}}>
                  <strong>Important:</strong> This page provides general information about patent status. For specific legal advice or formal patent statements, please consult with our legal team using the contact information provided above.
                </p>
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

export default Patent
