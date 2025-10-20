import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import AboutVisual from '../components/AboutVisual'

const Home = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Hero orbital animation (matching original script.js)
    const canvas = canvasRef.current
    if (!canvas) return

    // Check for reduced motion
    const root = document.documentElement
    if (root.classList.contains('reduce-motion')) return

    const ctx = canvas.getContext('2d')
    let dpr = Math.max(1, window.devicePixelRatio || 1)
    let w = 0, h = 0, cx = 0, cy = 0
    let rafId = null

    const colors = [
      'rgba(118,197,240,0.9)',
      'rgba(21,87,176,0.9)',
      'rgba(118,197,240,0.6)'
    ]
    const particles = []
    const nodes = []
    const pulses = []
    let hubFlash = 0
    
    const NODE_LABELS = ['CSV','API','SQL','PDF','Vector','IoT','Docs']
    const NODE_COLORS = ['#76C5F0','#3FA9F5','#1557B0','#76C5F0','#3FA9F5','#76C5F0','#1557B0']
    let R_MIN = 110, R_MAX = 260
    let COUNT = 140

    function resize() {
      // Use setTimeout to ensure DOM has updated
      setTimeout(() => {
        const rect = canvas.getBoundingClientRect()
        // Make canvas square to fit the circular container perfectly
        const size = Math.max(200, Math.min(rect.width, rect.height)) // Minimum size for mobile
        w = size
        h = size
        canvas.width = Math.floor(w * dpr)
        canvas.height = Math.floor(h * dpr)
        canvas.style.width = w + 'px'
        canvas.style.height = h + 'px'
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        cx = w / 2
        cy = h / 2
        
        // Adjust animation parameters based on canvas size
        const scale = size / 520 // Base scale on 520px (original hero-shape size)
        R_MIN = Math.max(40, 110 * scale)
        R_MAX = Math.max(80, 260 * scale)
        COUNT = Math.max(40, Math.floor(140 * scale))
      }, 10)
    }

    function rand(a, b) { 
      return a + Math.random() * (b - a) 
    }

    function resetParticles() {
      particles.length = 0
      for (let i = 0; i < COUNT; i++) {
        const r = rand(R_MIN, R_MAX)
        const ang = rand(0, Math.PI * 2)
        const speed = (0.15 + Math.random() * 0.35) * (Math.random() < 0.5 ? 1 : -1)
        const size = rand(0.7, 2.2)
        const hue = colors[Math.floor(Math.random() * colors.length)]
        particles.push({ r, ang, speed, size, hue, drift: rand(-0.0008, 0.0008) })
      }
      
      nodes.length = 0
      const baseR = (R_MIN + R_MAX) / 2
      for (let i = 0; i < NODE_LABELS.length; i++) {
        const r = baseR + Math.sin(i) * 40 + rand(-20, 20)
        const ang = (i / NODE_LABELS.length) * Math.PI * 2 + rand(-0.2, 0.2)
        const speed = 0.12 + rand(0.02, 0.08) * (i % 2 ? 1 : -1)
        const size = 4.5 + rand(-0.8, 0.8)
        nodes.push({ 
          r, ang, speed, size, 
          label: NODE_LABELS[i], 
          color: NODE_COLORS[i % NODE_COLORS.length], 
          cooldown: rand(300, 1200) 
        })
      }
    }

    let last = 0
    function frame(ts) {
      if (root.classList.contains('reduce-motion')) return
      if (!last) last = ts
      const dt = Math.min(32, ts - last)
      last = ts

      // Fade trail effect
      ctx.save()
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0,0,0,0.08)'
      ctx.fillRect(0, 0, w, h)
      ctx.restore()

      // Draw orbital particles
      ctx.globalCompositeOperation = 'lighter'
      particles.forEach(p => {
        p.ang += (p.speed * dt) / 1000
        p.r += p.drift * dt
        if (p.r < R_MIN || p.r > R_MAX) p.drift *= -1
        const x = cx + Math.cos(p.ang) * p.r
        const y = cy + Math.sin(p.ang) * p.r
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 8)
        grad.addColorStop(0, p.hue)
        grad.addColorStop(1, 'rgba(118,197,240,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(x, y, p.size * 2.2, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalCompositeOperation = 'source-over'

      // Draw central hub glow
      const hubGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 70)
      hubGlow.addColorStop(0, `rgba(118,197,240,${0.25 + hubFlash * 0.4})`)
      hubGlow.addColorStop(1, 'rgba(118,197,240,0)')
      ctx.fillStyle = hubGlow
      ctx.beginPath()
      ctx.arc(cx, cy, 70, 0, Math.PI * 2)
      ctx.fill()

      // Draw nodes and connections
      ctx.globalCompositeOperation = 'screen'
      nodes.forEach((n, idx) => {
        n.ang += (n.speed * dt) / 1000
        const nx = cx + Math.cos(n.ang) * n.r
        const ny = cy + Math.sin(n.ang) * n.r
        
        // Connection line
        const lg = ctx.createLinearGradient(nx, ny, cx, cy)
        lg.addColorStop(0, n.color + 'AA')
        lg.addColorStop(1, 'rgba(118,197,240,0.0)')
        ctx.strokeStyle = lg
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.moveTo(nx, ny)
        ctx.lineTo(cx, cy)
        ctx.stroke()
        
        // Node circle
        ctx.fillStyle = n.color
        ctx.beginPath()
        ctx.arc(nx, ny, n.size, 0, Math.PI * 2)
        ctx.fill()
        
        // Node label
        ctx.fillStyle = 'rgba(232,234,237,0.9)'
        ctx.font = '12px ui-monospace, Menlo, Consolas, monospace'
        ctx.textAlign = 'center'
        ctx.fillText(n.label, nx, ny - (n.size + 8))
        
        // Generate pulses
        n.cooldown -= dt
        if (n.cooldown <= 0 && pulses.length < 24) {
          pulses.push({ 
            idx, 
            t: 0, 
            speed: 0.0012 + Math.random() * 0.0016, 
            payload: Math.random() < 0.4 
          })
          n.cooldown = 700 + Math.random() * 1400
        }
      })

      // Draw data pulses
      ctx.globalCompositeOperation = 'lighter'
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        const n = nodes[p.idx]
        const nx = cx + Math.cos(n.ang) * n.r
        const ny = cy + Math.sin(n.ang) * n.r
        p.t += p.speed * dt
        const x = nx + (cx - nx) * p.t
        const y = ny + (cy - ny) * p.t
        const sz = 3 + Math.sin(p.t * Math.PI) * 2
        
        const pg = ctx.createRadialGradient(x, y, 0, x, y, 10)
        pg.addColorStop(0, 'rgba(118,197,240,0.9)')
        pg.addColorStop(1, 'rgba(118,197,240,0)')
        ctx.fillStyle = pg
        ctx.beginPath()
        ctx.arc(x, y, sz, 0, Math.PI * 2)
        ctx.fill()
        
        // Data payload indicator
        if (p.payload) {
          ctx.fillStyle = 'rgba(118,197,240,0.9)'
          ctx.font = '10px ui-monospace, Menlo, Consolas, monospace'
          ctx.textAlign = 'left'
          ctx.fillText('{}', x + 6, y + 3)
        }
        
        if (p.t >= 1) {
          pulses.splice(i, 1)
          hubFlash = Math.min(1, hubFlash + 0.5)
        }
      }

      // Draw central AI Model label
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = 'rgba(232,234,237,0.95)'
      ctx.font = '600 14px system-ui, Segoe UI, Roboto, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('AI Model', cx, cy + 4)

      hubFlash = Math.max(0, hubFlash - dt * 0.0025)
      rafId = requestAnimationFrame(frame)
    }

    function start() {
      resize()
      resetParticles()
      rafId = requestAnimationFrame(frame)
    }

    function stop() {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = null
    }

    // Debounced resize handler
    let resizeTimeout = null
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        resize()
        resetParticles() // Reset particles when size changes
      }, 100)
    }
    
    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stop()
      } else if (!root.classList.contains('reduce-motion')) {
        rafId = requestAnimationFrame(frame)
      }
    }

    // Use ResizeObserver to detect container size changes
    let resizeObserver = null
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        handleResize()
      })
      // Observe the canvas itself for size changes
      resizeObserver.observe(canvas)
    }

    start()
    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Cleanup
    return () => {
      stop()
      if (resizeTimeout) clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1 className="hero-title">AionScript — The Language of Intelligent Data</h1>
          <p className="hero-subtitle">
            Data with meaning, built-in trust, and by-design governance. Author in .aion (the human-readable language), 
            compile to .sJson (structured JSON with semantics), and build AI‑native systems that are verifiable and reliable.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-large" to="/docs">Read the Docs</Link>
            <a 
              className="btn btn-secondary btn-large" 
              href="https://github.com/aionscript" 
              target="_blank" 
              rel="noopener"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-shape">
            <canvas ref={canvasRef} id="heroCanvas" aria-hidden="true"></canvas>
          </div>
        </div>
      </section>

      {/* What is AionScript Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>What is AionScript?</h2>
            <p>
              AionScript pairs a human‑first authoring language (.aion) with a canonical machine format (.sJson). 
              You author richly structured data with roles, symbols, and directives in .aion; you compile to 
              deterministic JSON (.sJson) that machines can validate and services can trust. In short, it upgrades 
              JSON with meaning so AI can truly understand your data.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="section-header">
          <h2>Why AionScript</h2>
          <p>The AI‑native language and standard for modern data</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
              </svg>
            </div>
            <h3>Human‑first</h3>
            <p>Readable like prose, precise like code. Teams reason together with clear roles, symbols, and directives.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3>Universal Meta Layer</h3>
            <p>Standard @type, @context, @source, @link, @confidence, @embedding, @timestamp, @transform across adapters.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9z"/>
              </svg>
            </div>
            <h3>Adapters</h3>
            <p>SQL, Mongo, API, CSV, PDF, Vector DB → Smart Object List.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 16l3-3 4 4 7-7 4 4"/>
              </svg>
            </div>
            <h3>AionScript Cloud (Soon)</h3>
            <p>Managed compile/validate and governance pipelines with APIs and dashboards.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="8" rx="10" ry="4"/>
                <path d="M2 8v8c0 2.2 4.5 4 10 4s10-1.8 10-4V8"/>
              </svg>
            </div>
            <h3>AionScript DB (Soon)</h3>
            <p>Semantic + vector-aware storage for .sjson with fast retrieval and lineage.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="14" rx="2" ry="2"/>
                <path d="M3 10h18"/>
              </svg>
            </div>
            <h3>Playground (Soon)</h3>
            <p>Try AionScript in the browser. See the <Link to="/roadmap">Roadmap</Link>.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18h6"/>
                <path d="M12 2a6 6 0 0 0-6 6c0 2.2 1.2 4.1 3 5.2V16h6v-2.8c1.8-1.1 3-3 3-5.2a6 6 0 0 0-6-6z"/>
              </svg>
            </div>
            <h3>Turns Data into Knowledge</h3>
            <p>Embed type, context, links, confidence, embeddings so models understand—not guess.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="8" width="18" height="12" rx="2" ry="2"/>
                <path d="M7 8V6a5 5 0 0 1 10 0v2"/>
              </svg>
            </div>
            <h3>Private & Local AI</h3>
            <p>Make your data AI model‑ready offline; keep control and privacy on‑prem.</p>
          </div>
        </div>
      </section>

      {/* Why Different Section */}
      <section className="features">
        <div className="section-header">
          <h2>Why AionScript is different</h2>
          <p>From structure → meaning: semantics, evidence, verifiability, and policy in the object itself.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Meaning built-in</h3>
            <p><code>@type</code>, <code>@context</code>, <code>@link</code>, <code>@confidence</code>, <code>@embedding</code>. No more guessing across tools and models.</p>
          </div>
          <div className="feature-card">
            <h3>Grounded by evidence</h3>
            <p><code>@coverage</code>, <code>@evidence[]</code>, and freshness gating. Gate weak answers and explain retrieval.</p>
          </div>
          <div className="feature-card">
            <h3>Verifiable</h3>
            <p>Canonicalize to <code>@hash</code> (SHA-256); optional Ed25519 <code>@sig/@keyId/@pubKey</code> for artifact trust &amp; audits.</p>
          </div>
          <div className="feature-card">
            <h3>Provenance &amp; policy</h3>
            <p><code>@provenanceChain</code>, <code>@classification</code>, <code>@consent</code>, <code>@retention</code>, <code>@license</code>, <code>@policyRef</code> — governance by construction.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <div className="container">
        <section className="about">
          <div className="about-content">
            <div className="about-text">
              <h2>How it works</h2>
              <ol>
                <li><strong>Author</strong> with intent in <code>.aion</code> (reserve <code>@</code> for semantics).</li>
                <li><strong>Compile &amp; validate</strong> to <code>.sJson</code> (strong schema, canonicalized, optionally signed).</li>
                <li><strong>Use everywhere</strong> — APIs, DBs, ML pipelines, governance tools.</li>
              </ol>
              <div className="stats">
                <div className="stat">
                  <span className="stat-number">v1.0 LTF</span>
                  <span className="stat-label">Stable Foundation</span>
                </div>
                <div className="stat">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Open Source</span>
                </div>
                <div className="stat">
                  <span className="stat-number">MIT</span>
                  <span className="stat-label">Licensed</span>
                </div>
                <div className="stat">
                  <span className="stat-number">AI-Native</span>
                  <span className="stat-label">Design</span>
                </div>
              </div>
            </div>
            <AboutVisual />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
