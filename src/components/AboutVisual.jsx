import React from 'react'
import useTypingAnimation from '../hooks/useTypingAnimation'

const AboutVisual = () => {
  const visualRef = useTypingAnimation()

  return (
    <div className="about-visual" ref={visualRef}>
      <div className="about-shape"></div>
    </div>
  )
}

export default AboutVisual
