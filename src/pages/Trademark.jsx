import React from 'react'
import AboutVisual from '../components/AboutVisual'
import SEO from '../components/SEO'

const Trademark = () => {
  return (
    <div>
      <SEO 
        title="Trademark Policy - AionScript"
        description="Guidelines for using AionScript trademarks and branding, including permitted and restricted uses and permission requests."
        canonicalUrl="https://aionscript.com/trademark"
      />
      <article aria-labelledby="page-title">
      <section className="hero hero--mini">
        <div className="hero-content">
          <h1 id="page-title" className="hero-title">Trademark Policy</h1>
          <p className="hero-subtitle">
            Guidelines for using AionScript™ trademarks and branding
          </p>
        </div>
      </section>

      <div className="container">
        <section className="about">
          <div className="about-content">
            <div className="about-text">
              <h2>Protected Trademarks</h2>
              <p>
                The following terms are protected trademarks of AionScript and its creator(s):
              </p>
              <ul>
                <li><strong>AionScript™</strong></li>
                <li><strong>.aion and .sJson</strong> (in relation to semantic structured data formats)</li>
                <li><strong>AionScript Cloud™</strong></li>
                <li>Any logos, marks, or icons associated with AionScript branding</li>
              </ul>

              <h2>What You May Do</h2>
              <div style={{backgroundColor: '#e8f5e8', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '1rem', lineHeight: '1.6', color: '#2d5a2d'}}>
                <ul style={{marginBottom: 0}}>
                  <li style={{marginBottom: '0.5rem', fontSize: '1rem'}}>✅ Refer to AionScript by name when describing integration or usage (e.g., "built with AionScript")</li>
                  <li style={{fontSize: '1rem'}}>✅ Use logos in news articles or technical documentation with proper attribution</li>
                </ul>
              </div>

              <h2>What You May Not Do</h2>
              <div style={{backgroundColor: '#ffe8e8', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '1rem', lineHeight: '1.6', color: '#5a2d2d'}}>
                <ul style={{marginBottom: 0}}>
                  <li style={{marginBottom: '0.5rem', fontSize: '1rem'}}>❌ Use the name or logo in product names, domains, or company branding (e.g., "aionscript-engine.com")</li>
                  <li style={{marginBottom: '0.5rem', fontSize: '1rem'}}>❌ Create modified versions of the AionScript logo or visual identity</li>
                  <li style={{fontSize: '1rem'}}>❌ Imply endorsement or partnership without written permission</li>
                </ul>
              </div>

              <h2>Contact for Permissions</h2>
              <p>
                For inquiries or permission requests, please contact us at:
              </p>
              <p>
                <strong>Email:</strong> <a href="mailto:legal@aionscript.com">legal@aionscript.com</a>
              </p>
              
              <div style={{backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginTop: '2rem', fontSize: '1rem', lineHeight: '1.6', color: '#444'}}>
                <p style={{marginBottom: 0, fontSize: '1rem'}}>
                  <strong>Note:</strong> This trademark policy helps protect the AionScript brand while allowing reasonable use by the community. When in doubt, please reach out to us for clarification.
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

export default Trademark
