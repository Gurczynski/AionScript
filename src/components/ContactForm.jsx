import React, { useState } from 'react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    company: '' // honeypot field
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Message sent successfully!' })
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: '',
          company: ''
        })
      } else {
        setSubmitStatus({ 
          type: 'error', 
          message: result.error || 'Failed to send message. Please try again.' 
        })
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Network error. Please check your connection and try again.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="contact">
      <div className="container">
        <div className="contact-content">
          <div className="section-header">
            <h2>Get in Touch</h2>
            <p>Have questions about AionScript? We'd love to hear from you.</p>
          </div>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="input"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="input"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* Honeypot field - hidden from users */}
          <div style={{ display: 'none' }}>
            <label htmlFor="company">Company (leave blank)</label>
            <input
              type="text"
              id="company"
              name="company"
              className="input"
              value={formData.company}
              onChange={handleChange}
              tabIndex="-1"
              autoComplete="off"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              className="input textarea"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          {submitStatus && (
            <div className={`form-status ${submitStatus.type}`}>
              {submitStatus.message}
            </div>
          )}
          
          <button 
            type="submit" 
            className="btn btn-primary btn-large btn-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
