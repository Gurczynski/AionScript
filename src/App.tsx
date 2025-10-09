import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function useCountdown(daysFromNow = 30) {
  const target = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + daysFromNow)
    return d
  }, [daysFromNow])
  const [now, setNow] = useState(Date.now())

  if (typeof window !== 'undefined') {
    setTimeout(() => setNow(Date.now()), 1000)
  }

  const diff = Math.max(0, target.getTime() - now)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const mins = Math.floor((diff / (1000 * 60)) % 60)
  const secs = Math.floor((diff / 1000) % 60)

  return { days, hours, mins, secs }
}

function Countdown() {
  const { days, hours, mins, secs } = useCountdown(30)
  return (
    <div className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
      <span className="font-mono tabular-nums text-white">{String(days).padStart(2, '0')}d</span>
      <span className="font-mono tabular-nums">{String(hours).padStart(2, '0')}h</span>
      <span className="font-mono tabular-nums">{String(mins).padStart(2, '0')}m</span>
      <span className="font-mono tabular-nums">{String(secs).padStart(2, '0')}s</span>
    </div>
  )
}

export default function App() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    setSubmitted(false)

    try {
      const fd = new FormData()
      const key = import.meta.env.VITE_WEB3FORMS_KEY || ''
      if (!key) {
        throw new Error('Missing VITE_WEB3FORMS_KEY in environment')
      }
      fd.append('access_key', key)
      fd.append('email', email)
      if (message) fd.append('message', message)
      fd.append('subject', 'AionScript: New waitlist signup')
      fd.append('from_name', 'AionScript Landing')

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: fd,
      })

      const json = await res.json()
      if (!res.ok || json?.success === false) {
        throw new Error(json?.message || 'Submission failed')
      }

      setSubmitted(true)
      setEmail('')
      setMessage('')
    } catch (err: any) {
      setError(err?.message || 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0 radial-mask" aria-hidden />

        <header className="relative z-10">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-md bg-gradient-to-br from-cyan-400 to-fuchsia-500" />
              <span className="text-sm font-semibold tracking-wide text-zinc-200">AionScript</span>
            </div>
            <nav className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">
              <a className="hover:text-white" href="#features">Features</a>
              <a className="hover:text-white" href="#contact">Waitlist</a>
              <a className="hover:text-white" href="#faq">FAQ</a>
            </nav>
          </div>
        </header>

        <main>
          {/* Hero */}
          <section className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-10 text-center">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                <span className="inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                Private beta opens soon
              </div>
              <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                Build AI workflows, not boilerplate
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
                AionScript helps you prototype, orchestrate, and ship AI features fast — with a clean developer experience.
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <a href="#contact" className="rounded-xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 px-5 py-3 font-semibold text-black hover:brightness-110 active:brightness-95">
                  Join the waitlist
                </a>
                <Countdown />
              </div>
            </motion.div>
          </section>

          {/* Features */}
          <section id="features" className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-4 px-6 py-8 md:grid-cols-3">
            {[
              {
                title: 'TypeScript-first',
                desc: 'Strong types, DX-focused APIs, instant feedback.',
              },
              {
                title: 'Composable flows',
                desc: 'Chain tools, models, and logic without glue code.',
              },
              {
                title: 'Production ready',
                desc: 'Observability, retries, and guardrails out-of-the-box.',
              },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="mb-4 h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-400 to-fuchsia-500" />
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{f.desc}</p>
              </motion.div>
            ))}
          </section>

          {/* Contact / Waitlist */}
          <section id="contact" className="relative z-10 mx-auto max-w-5xl px-6 py-20 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-4 text-3xl font-semibold tracking-tight md:text-5xl"
            >
              Contact / Waitlist
            </motion.h2>
            <p className="mx-auto max-w-xl text-zinc-400">
              Drop your email to get a one-time launch update. No spam.
            </p>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mx-auto mt-8 w-full max-w-lg space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full rounded-xl bg-black/40 px-4 py-3 text-white outline-none ring-1 ring-white/15 focus:ring-cyan-400"
              />
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Optional message"
                rows={3}
                className="w-full rounded-xl bg-black/40 px-4 py-3 text-white outline-none ring-1 ring-white/15 focus:ring-cyan-400"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 px-5 py-3 font-semibold text-black hover:brightness-110 active:brightness-95 disabled:opacity-60"
              >
                {submitting ? 'Sending…' : 'Send Message'}
              </button>
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-3 text-left"
                  >
                    <div className="h-6 w-6 rounded-md bg-gradient-to-br from-cyan-400 to-fuchsia-500" />
                    <p className="text-zinc-200">Thanks! We'll be in touch soon.</p>
                  </motion.div>
                )}
              </AnimatePresence>
              {error && <p className="pt-2 text-sm text-red-400">{error}</p>}
              <p className="mt-3 text-xs text-zinc-400">
                By joining, you agree to receive one-time launch updates. No spam.
              </p>
            </motion.form>
          </section>
        </main>

        <footer className="relative z-10 border-t border-white/10/20 bg-black/40 py-8">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 text-sm text-zinc-400 md:flex-row">
            <p>© {new Date().getFullYear()} AionScript. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Privacy</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

