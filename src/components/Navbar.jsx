import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  const closeNav = () => {
    setIsNavOpen(false)
  }

  const toggleDropdown = (e) => {
    e.stopPropagation()
    setDropdownOpen(!dropdownOpen)
  }

  const closeDropdown = () => {
    setDropdownOpen(false)
  }

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link'
  }

  const isDropdownActive = () => {
    const dropdownPaths = ['/about', '/press', '/beta', '/roadmap']
    return dropdownPaths.includes(location.pathname)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setDropdownOpen(false)
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="nav-brand-link">
            <span className="nav-logo-brace" style={{color: '#76C5F0'}}>{'{'}</span>
            <span className="footer-logo-a" style={{color: '#E8EAED'}}>A</span>
            <span className="nav-logo-brace" style={{color: '#76C5F0'}}>{'}'}</span>
            <span className="nav-logo-text" style={{color: '#E8EAED'}}>AionScript™</span>
          </Link>
        </div>

        <div className="nav-menu">
          <Link to="/docs" className={isActive('/docs')}>Docs</Link>
          <Link to="/aion" className={isActive('/aion')}>.aion</Link>
          <Link to="/sjson" className={isActive('/sjson')}>.sJson</Link>
          <Link to="/adoption" className={isActive('/adoption')}>Adopt</Link>
          <div className={`dropdown ${dropdownOpen ? 'open' : ''}`}>
            <button 
              className={`dropdown-toggle ${isDropdownActive() ? 'active' : ''}`}
              onClick={toggleDropdown}
              aria-haspopup="true" 
              aria-expanded={dropdownOpen}
            >
              Company
              <svg className="caret" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </button>
            <div className="dropdown-menu" role="menu">
              <Link to="/about" className="dropdown-item" onClick={closeDropdown}>About</Link>
              <Link to="/roadmap" className="dropdown-item" onClick={closeDropdown}>Roadmap</Link>
              <Link to="/press" className="dropdown-item" onClick={closeDropdown}>Press</Link>
              <Link to="/beta" className="dropdown-item" onClick={closeDropdown}>Early Access</Link>
            </div>
          </div>
        </div>

        <div className="nav-actions">
          <a 
            href="https://github.com/aionscript" 
            className="btn btn-secondary" 
            aria-label="GitHub" 
            target="_blank" 
            rel="noopener"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                 viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 19c-5 1.5-5-2.5-7-3
                       m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61
                       c3.14-.35 6.44-1.54 6.44-7
                       A5.44 5.44 0 0 0 20 4.77
                       5.07 5.07 0 0 0 19.91 1
                       S18.73.65 16 2.48
                       a13.38 13.38 0 0 0-7 0
                       C6.27.65 5.09 1 5.09 1
                       A5.07 5.07 0 0 0 5 4.77
                       a5.44 5.44 0 0 0-1.5 3.78
                       c0 5.42 3.3 6.61 6.44 7
                       A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
          </a>
          <Link to="/beta" className="btn btn-primary">Get Started</Link>
          <button 
            className="nav-toggle"
            onClick={toggleNav}
            aria-expanded={isNavOpen}
            aria-controls="mobile-menu"
          >
            ☰
          </button>
        </div>
      </div>

      <div 
        className={`nav-overlay ${isNavOpen ? 'active' : ''}`}
        id="mobile-menu"
        aria-hidden={!isNavOpen}
      >
        <Link to="/" onClick={closeNav}>Home</Link>
        <Link to="/docs" onClick={closeNav}>Documentation</Link>
        <Link to="/aion" onClick={closeNav}>.aion Format</Link>
        <Link to="/sjson" onClick={closeNav}>.sJson Format</Link>
        <Link to="/adoption" onClick={closeNav}>Adopt AionScript</Link>
        <Link to="/about" onClick={closeNav}>About</Link>
        <Link to="/roadmap" onClick={closeNav}>Roadmap</Link>
        <Link to="/press" onClick={closeNav}>Press</Link>
        <Link to="/beta" onClick={closeNav}>Early Access</Link>
        <a href="https://github.com/aionscript" target="_blank" rel="noopener" onClick={closeNav}>GitHub</a>
      </div>
    </nav>
  )
}

export default Navbar
