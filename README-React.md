# AionScript Website - React Version

This is the React version of the AionScript website, converted from the original HTML/CSS/JS implementation.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
This starts the development server at `http://localhost:3000`

### Build
```bash
npm run build
```
This creates a production build in the `dist` directory.

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Navbar.jsx      # Navigation component
│   ├── Footer.jsx      # Footer component
│   └── ContactForm.jsx # Contact form with Netlify function integration
├── pages/              # Page components
│   ├── Home.jsx        # Homepage
│   ├── Docs.jsx        # Documentation page
│   ├── SJson.jsx       # sJson format page
│   └── ...             # Other pages
├── styles/             # Modular CSS
│   ├── variables.css   # CSS custom properties
│   ├── reset.css       # CSS reset
│   ├── components/     # Component-specific styles
│   └── index.css       # Main CSS entry point
├── hooks/              # Custom React hooks
│   └── useReducedMotion.js
└── utils/              # Utility functions

netlify/
└── functions/          # Netlify serverless functions
    └── contact.js      # Contact form handler
```

## 🎨 CSS Architecture

The CSS has been modularized into component-specific files:
- `variables.css` - CSS custom properties and design tokens
- `reset.css` - Base styles and CSS reset
- `components/` - Individual component styles
- `utilities.css` - Utility classes
- `responsive.css` - Responsive breakpoints
- `accessibility.css` - Accessibility and reduced motion support

## 🔧 Features

- **React 18** with modern hooks
- **React Router** for client-side routing
- **Vite** for fast development and building
- **Modular CSS** architecture
- **Responsive design** with mobile-first approach
- **Accessibility** support including reduced motion
- **Contact form** integration with existing Netlify function
- **Canvas animations** for hero section

## 🚀 Deployment

The site is configured for Netlify deployment:
- Build command: `npm run build`
- Publish directory: `dist`
- Client-side routing redirects configured
- Netlify Functions for contact form

## 🔄 Migration Notes

This React version maintains:
- ✅ All original functionality
- ✅ Existing Netlify function compatibility
- ✅ Same visual design and animations
- ✅ SEO metadata and structured data
- ✅ Accessibility features
- ✅ Mobile responsiveness

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run legacy-build` - Run original build script

## 🤝 Contributing

The React version follows modern React patterns:
- Functional components with hooks
- Modular CSS architecture
- Accessible component design
- Performance optimizations
