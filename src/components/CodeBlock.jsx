import React, { useState } from 'react'

const CodeBlock = ({ children, className = '' }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      // Extract text content from children
      const textContent = typeof children === 'string' ? children : children.props?.children || ''
      await navigator.clipboard.writeText(textContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="code-block-container">
      <pre className={`code ${className}`}>
        <button 
          className="copy-button"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20,6 9,17 4,12"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          )}
          <span className="copy-text">{copied ? 'Copied!' : 'Copy'}</span>
        </button>
        {children}
      </pre>
    </div>
  )
}

export default CodeBlock
