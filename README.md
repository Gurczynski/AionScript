## AionScript Landing

React + TypeScript + Vite + Tailwind landing page with Framer Motion animations, Web3Forms submission, and GoatCounter analytics.

### Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure environment:

   - Copy `.env.example` to `.env` and set your Web3Forms key:

     ```bash
     cp .env.example .env
     # then edit .env and set VITE_WEB3FORMS_KEY
     ```

3. Run dev server:

   ```bash
   npm run dev
   ```

4. Build for production:

   ```bash
   npm run build
   npm run preview
   ```

### Deploying to Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Set env var `VITE_WEB3FORMS_KEY` in your Netlify site settings if you want the form to submit successfully.

