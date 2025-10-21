import React from 'react'
import AboutVisual from '../components/AboutVisual'
import SEO from '../components/SEO'

const History = () => {
  return (
    <div>
      <SEO 
        title="History of AionScript - Origins and Evolution"
        description="Discover the story behind AionScript: why it was created and how it evolved to solve the 'dumb data' problem in AI systems."
        canonicalUrl="https://aionscript.com/history"
      />
      <article aria-labelledby="page-title">
      <section className="hero hero--mini">
        <div className="hero-content">
          <h1 id="page-title" className="hero-title">History</h1>
          <p className="hero-subtitle">
            The story behind AionScript
          </p>
        </div>
      </section>

      <div className="container">
        <section className="about">
          <div className="about-content">
            <div className="about-text">
              <h2>About AionScript</h2>
              <p>
                AionScript was created to solve the fundamental problem of "dumb data" 
                in AI systems. Traditional data formats lack the semantic context, 
                evidence tracking, and governance metadata that modern AI applications require.
              </p>
            </div>
            <AboutVisual />
          </div>
        </section>
      </div>
      </article>
    </div>
  )
}

export default History
