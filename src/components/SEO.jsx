import { useEffect } from 'react'

const SEO = ({ 
  title, 
  description, 
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage = "/assets/og-image.png",
  twitterTitle,
  twitterDescription,
  twitterImage = "/assets/og-image.png"
}) => {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title
    }

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description)
    }

    // Update meta title
    let metaTitle = document.querySelector('meta[name="title"]')
    if (!metaTitle && title) {
      metaTitle = document.createElement('meta')
      metaTitle.setAttribute('name', 'title')
      document.head.appendChild(metaTitle)
    }
    if (metaTitle && title) {
      metaTitle.setAttribute('content', title)
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical && canonicalUrl) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    if (canonical && canonicalUrl) {
      canonical.setAttribute('href', canonicalUrl)
    }

    // Update Open Graph tags
    const updateOGTag = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag && content) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      if (tag && content) {
        tag.setAttribute('content', content)
      }
    }

    updateOGTag('og:title', ogTitle || title)
    updateOGTag('og:description', ogDescription || description)
    updateOGTag('og:image', ogImage)
    updateOGTag('og:url', canonicalUrl)

    // Update Twitter tags
    const updateTwitterTag = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`)
      if (!tag && content) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }
      if (tag && content) {
        tag.setAttribute('content', content)
      }
    }

    updateTwitterTag('twitter:title', twitterTitle || title)
    updateTwitterTag('twitter:description', twitterDescription || description)
    updateTwitterTag('twitter:image', twitterImage)

  }, [title, description, canonicalUrl, ogTitle, ogDescription, ogImage, twitterTitle, twitterDescription, twitterImage])

  return null
}

export default SEO
