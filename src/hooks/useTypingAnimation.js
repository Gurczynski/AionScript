import { useEffect, useRef } from 'react'

const useTypingAnimation = () => {
  const visualRef = useRef(null)

  useEffect(() => {
    const visual = visualRef.current
    if (!visual) return

    // Check for reduced motion
    const root = document.documentElement
    if (root.classList.contains('reduce-motion')) return

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
    ]

    const typeInto = (overlay, content, cb) => {
      let i = 0
      const inner = overlay.querySelector('.code-overlay-inner')
      const caret = document.createElement('span')
      caret.className = 'code-caret'
      
      const step = () => {
        if (document.documentElement.classList.contains('reduce-motion')) return
        if (i <= content.length) {
          inner.textContent = content.slice(0, i)
          inner.appendChild(caret)
          i++
          setTimeout(step, 18 + Math.random() * 35)
        } else {
          setTimeout(cb, 1200)
        }
      }
      step()
    }

    // Create overlay elements
    const overlay = document.createElement('div')
    overlay.className = 'code-overlay'
    const inner = document.createElement('div')
    inner.className = 'code-overlay-inner'
    overlay.appendChild(inner)
    visual.appendChild(overlay)

    let n = Math.floor(Math.random() * snippets.length)
    
    const cycle = () => {
      const s = snippets[n]
      typeInto(overlay, s, () => {
        let t = inner.textContent
        const caret = document.createElement('span')
        caret.className = 'code-caret'
        
        const erase = () => {
          if (document.documentElement.classList.contains('reduce-motion')) return
          if (t.length > 0) {
            t = t.slice(0, -Math.max(1, Math.round(Math.random() * 3)))
            inner.textContent = t
            inner.appendChild(caret)
            setTimeout(erase, 8 + Math.random() * 20)
          } else {
            n = (n + 1) % snippets.length
            setTimeout(cycle, 250)
          }
        }
        erase()
      })
    }

    // Start animation with slight delay
    const timeoutId = setTimeout(cycle, 500)

    // Cleanup
    return () => {
      clearTimeout(timeoutId)
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay)
      }
    }
  }, [])

  return visualRef
}

export default useTypingAnimation
