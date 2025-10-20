import { useEffect } from 'react'

const useReducedMotion = () => {
  useEffect(() => {
    const root = document.documentElement
    
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    
    const applyReduced = (isReduced) => {
      if (isReduced) {
        root.classList.add('reduce-motion')
      } else {
        root.classList.remove('reduce-motion')
      }
    }
    
    // Apply initial state
    applyReduced(prefersReduced.matches)
    
    // Listen for changes
    const handleChange = (e) => applyReduced(e.matches)
    
    if (prefersReduced.addEventListener) {
      prefersReduced.addEventListener('change', handleChange)
    } else if (prefersReduced.addListener) {
      // Safari <14 fallback
      prefersReduced.addListener(handleChange)
    }
    
    // Cleanup
    return () => {
      if (prefersReduced.removeEventListener) {
        prefersReduced.removeEventListener('change', handleChange)
      } else if (prefersReduced.removeListener) {
        prefersReduced.removeListener(handleChange)
      }
    }
  }, [])
}

export default useReducedMotion
