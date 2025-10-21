import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <Link to="/" className="footer-brand-link">
            <span className="footer-logo-brace" style={{color: '#76C5F0'}}>{'{'}</span>
            <span className="footer-logo-a" style={{color: '#E8EAED'}}>A</span>
            <span className="footer-logo-brace" style={{color: '#76C5F0'}}>{'}'}</span>
            <span className="footer-logo-text" style={{color: '#E8EAED'}}>AionScript™</span>
          </Link>
          <p>
            AionScript v1.0 LTF transforms static data into intelligent, self-describing information 
            that AI systems can truly understand. By embedding meaning, evidence, and governance 
            directly into data structures, we're building the semantic infrastructure for the 
            next generation of AI-native applications. Join thousands of developers and enterprises 
            who are already using AionScript to create more reliable, trustworthy, and governable 
            data systems.
          </p>
        </div>
        
        <div className="footer-links">
          <div className="footer-column">
            <h4>Product</h4>
            <Link to="/docs">Documentation</Link>
            <Link to="/aion">.aion Language</Link>
            <Link to="/sjson">.sJson Format</Link>
            <Link to="/adoption">Adopt AionScript</Link>
          </div>
          
          <div className="footer-column">
            <h4>Company</h4>
            <Link to="/about">About</Link>
            <Link to="/roadmap">Roadmap</Link>
            <Link to="/press">Press & Media</Link>
            <Link to="/beta">Early Access</Link>
          </div>
          
          <div className="footer-column">
            <h4>Resources</h4>
            <a href="https://github.com/aionscript" target="_blank" rel="noopener">GitHub</a>
            <Link to="/licensing">Licensing</Link>
            <Link to="/patent">Patent Info</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/trademark">Trademark</Link>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-copyright">
          <p>&copy; 2025 AionScript. All rights reserved.</p>
          <p className="footer-patent">Patent pending • Open specification • v1.0 LTF</p>
        </div>
        <div className="footer-social">
          <a 
            href="https://github.com/aionscript" 
            target="_blank" 
            rel="noopener" 
            aria-label="GitHub"
            className="social-link"
          >
            <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a 
            href="https://x.com/aionscript" 
            target="_blank" 
            rel="noopener" 
            aria-label="X (Twitter)"
            className="social-link"
          >
            <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.25 2h3.2l-7 8.01L22 22h-6.9l-5.4-7.07L3.6 22H.4l7.5-8.59L2 2h7l4.9 6.44L18.25 2Zm-2.4 18h1.77L8.23 4h-1.9l9.52 16Z"/>
            </svg>
          </a>
          <a 
            href="https://facebook.com/aionscript" 
            target="_blank" 
            rel="noopener" 
            aria-label="Facebook"
            className="social-link"
          >
            <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.3V12h2.3V9.7c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .2 2 .2V8h-1.1c-1.1 0-1.5.7-1.5 1.4V12h2.5l-.4 2.9h-2.1v7A10 10 0 0 0 22 12Z"/>
            </svg>
          </a>
          <a 
            href="https://www.npmjs.com/settings/aionscript/packages" 
            target="_blank" 
            rel="noopener" 
            aria-label="NPM"
            className="social-link"
          >
            <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"/>
            </svg>
          </a>
          <a 
            href="https://t.me/aionscript" 
            target="_blank" 
            rel="noopener" 
            aria-label="Telegram"
            className="social-link"
          >
            <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
