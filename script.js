// AionScript interactions & animations (cleaned: no motion toggle; mobile nav overlay added)
document.addEventListener('DOMContentLoaded', function () {
  const root = document.documentElement;

  // --- Respect prefers-reduced-motion (no toggle UI) ---
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const applyReduced = (isReduced) => {
    if (isReduced) root.classList.add('reduce-motion');
    else root.classList.remove('reduce-motion');
  };
  applyReduced(prefersReduced.matches);
  if (prefersReduced.addEventListener) {
    prefersReduced.addEventListener('change', (e) => applyReduced(e.matches));
  } else if (prefersReduced.addListener) {
    // Safari <14
    prefersReduced.addListener((e) => applyReduced(e.matches));
  }

  // --- Mobile Nav Overlay (slide-in) ---
  const navToggle = document.querySelector('.nav-toggle');
  const navOverlay = document.querySelector('.nav-overlay');
  const overlayLinks = navOverlay ? navOverlay.querySelectorAll('a') : [];

  const openNav = () => {
    if (!navOverlay) return;
    navOverlay.classList.add('active');
    navOverlay.setAttribute('aria-hidden', 'false');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeNav = () => {
    if (!navOverlay) return;
    navOverlay.classList.remove('active');
    navOverlay.setAttribute('aria-hidden', 'true');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (navToggle && navOverlay) {
    // Initialize ARIA
    navToggle.setAttribute('aria-controls', 'mobile-menu');
    navToggle.setAttribute('aria-expanded', 'false');
    navOverlay.setAttribute('id', 'mobile-menu');
    navOverlay.setAttribute('aria-hidden', 'true');

    navToggle.addEventListener('click', () => {
      const isOpen = navOverlay.classList.contains('active');
      if (isOpen) closeNav();
      else openNav();
    });

    // Close on overlay click (but not when clicking inside a focusable child)
    navOverlay.addEventListener('click', (e) => {
      if (e.target === navOverlay) closeNav();
    });

    // Close on Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });

    // Close when any link is clicked
    overlayLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeNav();
      });
    });

    // Close on viewport resize to desktop
    const mqDesktop = window.matchMedia('(min-width: 901px)');
    const handleDesktop = () => {
      if (mqDesktop.matches) closeNav();
    };
    if (mqDesktop.addEventListener) mqDesktop.addEventListener('change', handleDesktop);
    else if (mqDesktop.addListener) mqDesktop.addListener(handleDesktop);
  }

  // --- Modal & misc guards (kept) ---
  const modal = document.getElementById('exampleModal');
  const openModalBtns = document.querySelectorAll('[data-modal="open"]');
  const closeModalBtns = document.querySelectorAll('.modal-close');
  if (modal) {
    openModalBtns.forEach((btn) =>
      btn.addEventListener('click', () => modal.classList.add('active'))
    );
    closeModalBtns.forEach((btn) =>
      btn.addEventListener('click', () => modal.classList.remove('active'))
    );
    const backdrop = modal.querySelector('.modal-backdrop');
    if (backdrop) backdrop.addEventListener('click', () => modal.classList.remove('active'));
  }

  // Dismiss notifications/toasts
  document.querySelectorAll('.notification-close, .toast-close').forEach((btn) => {
    btn.addEventListener('click', (e) => e.target.closest('.notification, .toast')?.remove());
  });

  // --- Typing overlay for .about-visual squares (Docs/About pages) ---
  const visuals = document.querySelectorAll('.about-visual');
  const reducedMotion = root.classList.contains('reduce-motion');
  if (visuals.length && !reducedMotion) {
    const snippets = [
`{A}
title: "Launch Plan"
owner @role: "PM"
goals: +["Ship v0.1","Gather feedback"]
@directive(generate): executive summary
{/A}`,
`{
  "@type": "WeatherReport",
  "@context": "weather.schema",
  "city": { "@value": "Daytona Beach", "@geo": [29.2108, -81.0228] },
  "temperature": { "@value": 82, "@unit": "F" },
  "@confidence": 0.98
}`,
`// .sJson Spec v0.1
"@type": string
"@id": string | URI
"@context": URI | object
"@embedding": number[]
"@timestamp": ISO8601`,
`aion compile note.aion  # -> note.sjson
aion validate data.sjson
aion export plan.aion --out plan.sjson`,
`{
  "@type": "DocumentChunk",
  "text": "Tailwind uses @custom-variant for dark mode",
  "@embedding": [0.02, -0.33, 0.81],
  "@source": "tailwindcss.com/docs/dark-mode"
}`
    ];

    const typeInto = (overlay, content, cb) => {
      let i = 0;
      const inner = overlay.querySelector('.code-overlay-inner');
      const caret = document.createElement('span');
      caret.className = 'code-caret';
      const step = () => {
        if (document.documentElement.classList.contains('reduce-motion')) return; // stop if toggled
        if (i <= content.length) {
          inner.textContent = content.slice(0, i);
          inner.appendChild(caret);
          i++;
          setTimeout(step, 18 + Math.random() * 35);
        } else {
          setTimeout(cb, 1200);
        }
      };
      step();
    };

    visuals.forEach((v, idx) => {
      if (v.hasAttribute('data-no-overlay')) return;
      const overlay = document.createElement('div');
      overlay.className = 'code-overlay';
      const inner = document.createElement('div');
      inner.className = 'code-overlay-inner';
      overlay.appendChild(inner);
      v.appendChild(overlay);
      let n = Math.floor(Math.random() * snippets.length);
      const cycle = () => {
        const s = snippets[n];
        typeInto(overlay, s, () => {
          let t = inner.textContent;
          const caret = document.createElement('span');
          caret.className = 'code-caret';
          const erase = () => {
            if (document.documentElement.classList.contains('reduce-motion')) return;
            if (t.length > 0) {
              t = t.slice(0, -Math.max(1, Math.round(Math.random() * 3)));
              inner.textContent = t;
              inner.appendChild(caret);
              setTimeout(erase, 8 + Math.random() * 20);
            } else {
              n = (n + 1) % snippets.length;
              setTimeout(cycle, 250);
            }
          };
          erase();
        });
      };
      setTimeout(cycle, idx * 250);
    });
  }

  // --- Homepage hero orbital animation (index only) ---
  const heroCanvas = document.getElementById('heroCanvas');
  let rafId = null;
  if (heroCanvas && !root.classList.contains('reduce-motion')) {
    const ctx = heroCanvas.getContext('2d');
    let dpr = Math.max(1, window.devicePixelRatio || 1);
    let w = 0, h = 0, cx = 0, cy = 0;
    const colors = [
      'rgba(118,197,240,0.9)',
      'rgba(21,87,176,0.9)',
      'rgba(118,197,240,0.6)'
    ];
    const particles = [];
    const nodes = [];
    const pulses = [];
    let hubFlash = 0;
    const NODE_LABELS = ['CSV','API','SQL','PDF','Vector','IoT','Docs'];
    const NODE_COLORS = ['#76C5F0','#3FA9F5','#1557B0','#76C5F0','#3FA9F5','#76C5F0','#1557B0'];
    const R_MIN = 110, R_MAX = 260;
    const COUNT = 140;

    function resize() {
      const rect = heroCanvas.getBoundingClientRect();
      w = Math.max(600, rect.width);
      h = Math.max(400, rect.height);
      heroCanvas.width = Math.floor(w * dpr);
      heroCanvas.height = Math.floor(h * dpr);
      heroCanvas.style.width = w + 'px';
      heroCanvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2; cy = h / 2;
    }
    function rand(a,b){ return a + Math.random()*(b-a); }
    function resetParticles() {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        const r = rand(R_MIN, R_MAX);
        const ang = rand(0, Math.PI*2);
        const speed = (0.15 + Math.random()*0.35) * (Math.random() < 0.5 ? 1 : -1);
        const size = rand(0.7, 2.2);
        const hue = colors[Math.floor(Math.random()*colors.length)];
        particles.push({ r, ang, speed, size, hue, drift: rand(-0.0008,0.0008) });
      }
      nodes.length = 0;
      const baseR = (R_MIN + R_MAX) / 2;
      for (let i = 0; i < NODE_LABELS.length; i++) {
        const r = baseR + Math.sin(i) * 40 + rand(-20, 20);
        const ang = (i / NODE_LABELS.length) * Math.PI * 2 + rand(-0.2,0.2);
        const speed = 0.12 + rand(0.02, 0.08) * (i % 2 ? 1 : -1);
        const size = 4.5 + rand(-0.8, 0.8);
        nodes.push({ r, ang, speed, size, label: NODE_LABELS[i], color: NODE_COLORS[i % NODE_COLORS.length], cooldown: rand(300, 1200) });
      }
    }

    let last = 0;
    function frame(ts) {
      if (root.classList.contains('reduce-motion')) return;
      if (!last) last = ts;
      const dt = Math.min(32, ts - last);
      last = ts;

      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0,0,w,h);
      ctx.restore();

      ctx.globalCompositeOperation = 'lighter';
      particles.forEach(p => {
        p.ang += (p.speed * dt) / 1000;
        p.r += p.drift * dt;
        if (p.r < R_MIN || p.r > R_MAX) p.drift *= -1;
        const x = cx + Math.cos(p.ang) * p.r;
        const y = cy + Math.sin(p.ang) * p.r;
        const grad = ctx.createRadialGradient(x,y,0,x,y,8);
        grad.addColorStop(0, p.hue);
        grad.addColorStop(1, 'rgba(118,197,240,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, p.size*2.2, 0, Math.PI*2);
        ctx.fill();
      });
      ctx.globalCompositeOperation = 'source-over';

      const hubGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 70);
      hubGlow.addColorStop(0, `rgba(118,197,240,${0.25 + hubFlash*0.4})`);
      hubGlow.addColorStop(1, 'rgba(118,197,240,0)');
      ctx.fillStyle = hubGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 70, 0, Math.PI*2);
      ctx.fill();

      ctx.globalCompositeOperation = 'screen';
      nodes.forEach((n, idx) => {
        n.ang += (n.speed * dt) / 1000;
        const nx = cx + Math.cos(n.ang) * n.r;
        const ny = cy + Math.sin(n.ang) * n.r;
        const lg = ctx.createLinearGradient(nx, ny, cx, cy);
        lg.addColorStop(0, n.color + 'AA');
        lg.addColorStop(1, 'rgba(118,197,240,0.0)');
        ctx.strokeStyle = lg;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(nx, ny);
        ctx.lineTo(cx, cy);
        ctx.stroke();
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(nx, ny, n.size, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = 'rgba(232,234,237,0.9)';
        ctx.font = '12px ui-monospace, Menlo, Consolas, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, nx, ny - (n.size + 8));
        n.cooldown -= dt;
        if (n.cooldown <= 0 && pulses.length < 24) {
          pulses.push({ idx, t: 0, speed: 0.0012 + Math.random()*0.0016, payload: Math.random() < 0.4 });
          n.cooldown = 700 + Math.random()*1400;
        }
      });

      ctx.globalCompositeOperation = 'lighter';
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const n = nodes[p.idx];
        const nx = cx + Math.cos(n.ang) * n.r;
        const ny = cy + Math.sin(n.ang) * n.r;
        p.t += p.speed * dt;
        const x = nx + (cx - nx) * p.t;
        const y = ny + (cy - ny) * p.t;
        const sz = 3 + Math.sin(p.t * Math.PI) * 2;
        const pg = ctx.createRadialGradient(x,y,0,x,y,10);
        pg.addColorStop(0, 'rgba(118,197,240,0.9)');
        pg.addColorStop(1, 'rgba(118,197,240,0)');
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(x, y, sz, 0, Math.PI*2);
        ctx.fill();
        if (p.payload) {
          ctx.fillStyle = 'rgba(118,197,240,0.9)';
          ctx.font = '10px ui-monospace, Menlo, Consolas, monospace';
          ctx.textAlign = 'left';
          ctx.fillText('{}', x + 6, y + 3);
        }
        if (p.t >= 1) {
          pulses.splice(i, 1);
          hubFlash = Math.min(1, hubFlash + 0.5);
        }
      }

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(232,234,237,0.95)';
      ctx.font = '600 14px system-ui, Segoe UI, Roboto, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('AI Model', cx, cy + 4);

      hubFlash = Math.max(0, hubFlash - dt * 0.0025);
      rafId = requestAnimationFrame(frame);
    }

    function start() {
      resize();
      resetParticles();
      rafId = requestAnimationFrame(frame);
    }
    function stop() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    }

    start();
    window.addEventListener('resize', () => resize());
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else if (!root.classList.contains('reduce-motion')) rafId = requestAnimationFrame(frame);
    });
  }
  // --- Contact form submission via Netlify Function + Resend ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const statusEl = document.getElementById('contactStatus');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const setStatus = (msg, ok = true) => {
      if (!statusEl) return;
      statusEl.textContent = msg || '';
      statusEl.style.color = ok ? '#9BE28D' : '#FF7A7A';
    };

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      setStatus('Sending...', true);
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }
      const formData = new FormData(contactForm);
      const body = Object.fromEntries(formData.entries());

      try {
        const res = await fetch('/.netlify/functions/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.error) {
          throw new Error(data.error || 'Failed to send');
        }
        setStatus('Thanks! Your message has been sent.', true);
        contactForm.reset();
      } catch (err) {
        setStatus('Sorry, something went wrong. Please try again later.', false);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        }
      }
    });
  }
});
