import React from 'react'
import ContactForm from '../components/ContactForm'
import AboutVisual from '../components/AboutVisual'

const Beta = () => {
  return (
    <div>
      <section className="hero hero--mini">
        <div className="hero-content">
          <h1 className="hero-title">Early Access Program</h1>
          <p className="hero-subtitle">
            Join the AionScript v1.0 LTF early access program and help shape the future of intelligent data
          </p>
        </div>
      </section>

      <div className="container">
        <section className="about">
          <div className="about-content">
            <div className="about-text">
              <h2>Join the Early Access Program</h2>
              <p>
                Be among the first to experience AionScript v1.0 LTF's production-ready features. 
                Get early access to tools, provide feedback, and help shape the future 
                of AI-native data systems with meaning, trust, and governance built-in.
              </p>
              
              <h3>What You'll Get</h3>
              <ul>
                <li>Early access to AionScript v1.0 LTF CLI and compiler</li>
                <li>Priority support and direct feedback channels</li>
                <li>Influence on feature development and enterprise roadmap</li>
                <li>Access to comprehensive documentation and tutorials</li>
                <li>Invitation to our private community for discussions</li>
              </ul>
              
              <h3>Why Join Now?</h3>
              <p>
                This early access program is your opportunity to experiment with AionScript's 
                stable v1.0 foundation and influence its development. You'll get to try the 
                Playground, use the CLI on your own data, and ensure the standard meets your needs 
                before wider adoption.
              </p>
            </div>
            <AboutVisual />
          </div>
        </section>
      </div>

      <ContactForm />
    </div>
  )
}

export default Beta
