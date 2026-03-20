# URJA VISION - Deployment & Setup Guide

## Project Overview

URJA VISION is an enterprise-grade solar energy platform built with React, TypeScript, and Tailwind CSS. The platform provides a complete ecosystem for solar solutions including products, packages, services, training, and job opportunities.

## System Architecture

```
Frontend (React + TypeScript)
  ├── Vite (Build tool)
  ├── Tailwind CSS (Styling)
  ├── Lucide React (Icons)
  └── Client-side Routing
```

## Prerequisites

- Node.js v18 or higher
- npm v9 or higher
- Git (for version control)

## Installation & Local Development

### 1. Clone the Project

```bash
cd urja-vision
npm install
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ServiceCard.tsx
│   ├── ProductCard.tsx
│   ├── PackageCard.tsx
│   ├── ContactForm.tsx
│   ├── SolarCalculator.tsx
│   ├── AnimatedSection.tsx
│   └── ... (20+ components)
├── pages/               # Page components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── SolarProducts.tsx
│   ├── SolarPackages.tsx
│   ├── Careers.tsx
│   └── ... (13 pages total)
├── layouts/            # Layout components
│   ├── MainLayout.tsx
│   ├── SectionWrapper.tsx
│   └── Container.tsx
├── utils/              # Utilities
│   ├── constants.ts   # App constants and config
│   ├── helpers.ts     # Helper functions
│   └── data.ts        # Mock data
├── styles/            # Global styles
│   └── theme.css      # Design system & animations
├── App.tsx            # Main app component with routing
├── main.tsx           # Entry point
└── index.css          # Global CSS

```

## Build for Production

### 1. Build the Project

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### 2. Preview Production Build Locally

```bash
npm run preview
```

## Deployment Options

### Option 1: Deploy to Vercel (Recommended)

Vercel is the creator of Next.js and provides excellent support for React applications.

```bash
npm i -g vercel
vercel
```

Follow the prompts to connect your Git repository and deploy.

### Option 2: Deploy to Netlify

```bash
npm run build
```

Then drag and drop the `dist/` folder to Netlify, or connect via Git for automatic deployments.

### Option 3: Deploy to AWS Amplify

```bash
npm i -g @aws-amplify/cli
amplify init
amplify publish
```

### Option 4: Traditional Server (Apache/Nginx)

1. Build the project: `npm run build`
2. Copy the `dist/` folder contents to your web server's public directory
3. Configure your server to serve `index.html` for all non-file requests (SPA routing)

#### Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    root /var/www/urja-vision/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### Apache Configuration (.htaccess)

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Option 5: Docker Deployment (Recommended for Ubuntu Server)

Use the built-in `docker-compose.yml` for a production-ready environment with the Express backend and SQLite database.

```bash
# 1. Build and start the containers in detached mode
docker compose up -d --build

# 2. Check logs (optional)
docker compose logs -f
```

This will:
- Build the React frontend
- Build the Express backend
- Initialize the SQLite database in `/app/data/urja.db`
- Mount a persistent volume from the host `./data` directory to `/app/data`
- Expose the app on port 3000
- Persist your production data even after container restarts

> [!IMPORTANT]
> Ensure the `./data` directory exists and has write permissions. The system will automatically create it and initialize the database if it doesn't exist.


## Environment Configuration

Create a `.env` file in the project root (for future backend integration):

```env
VITE_API_URL=https://api.yourdomain.com
VITE_APP_NAME=URJA VISION
VITE_APP_VERSION=1.0.0
```

## Performance Optimization

### Current Metrics

- CSS Bundle: 6.09 kB (gzipped)
- JS Bundle: 183.14 kB (gzipped)
- HTML: 0.39 kB (gzipped)

### Optimization Tips

1. **Code Splitting**: Use dynamic imports for less-used pages
2. **Image Optimization**: Replace placeholder images with optimized versions
3. **Bundle Analysis**: Run `npm run build` and check bundle size
4. **Caching**: Configure browser caching headers on your server

## SEO Configuration

The platform includes:

- Semantic HTML structure
- Proper heading hierarchy
- Meta descriptions (to be added in head)
- Mobile-first responsive design
- Fast page load times

### Add Meta Tags (Optional)

In `index.html`, enhance the head section:

```html
<meta name="description" content="URJA VISION - Complete Solar Energy Solutions for Homes, Businesses & Farmers">
<meta name="keywords" content="solar panels, solar installation, renewable energy, solar packages">
<meta name="author" content="Urja Vision Technologies">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta property="og:title" content="URJA VISION - Solar Energy Solutions">
<meta property="og:description" content="Complete solar ecosystem platform">
<meta property="og:image" content="logo-url">
```

## Features & Pages

### User-Facing Pages

1. **Home** - Hero, services, products, calculator
2. **About** - Company info, mission, values
3. **Solar Solutions** - Service offerings
4. **Solar Products** - 12+ products with specs
5. **Solar Packages** - 3 tiered packages
6. **Government Schemes** - Subsidy information
7. **Kisan Urja** - Agricultural solar solutions
8. **Vendor Partner** - Partnership program
9. **Training & Internship** - Course offerings
10. **Careers** - Job listings
11. **Solar Projects** - Portfolio showcase
12. **Knowledge Hub** - Blog articles
13. **Contact** - Contact form + map

### Key Features

- Responsive design (mobile, tablet, desktop)
- Smooth scroll animations
- Interactive solar calculator
- Form validation
- Contact integration ready
- WhatsApp integration ready
- Premium UI with micro-interactions
- Accessibility compliant

## Customization Guide

### Change Brand Colors

Edit `src/styles/theme.css`:

```css
:root {
  --solar-yellow: #FFC300;      /* Primary highlight color */
  --energy-green: #1E8449;      /* Primary color */
  /* ... other colors */
}
```

### Update Company Information

Edit `src/utils/constants.ts`:

```typescript
export const COMPANY_INFO = {
  name: 'Your Company Name',
  brandName: 'Your Brand',
  contact: {
    phone: '+91 XXXXXXXXXX',
    email: 'your@email.com',
  },
  // ... other info
};
```

### Add Content

Edit `src/utils/data.ts` for products, projects, articles, etc.

## Maintenance & Updates

### Regular Tasks

1. **Update Dependencies**: Run `npm update` monthly
2. **Security Audit**: Run `npm audit` regularly
3. **Performance Monitoring**: Check Core Web Vitals
4. **Content Updates**: Update data.ts with new content

### Backup & Version Control

```bash
git add .
git commit -m "Your message"
git push origin main
```

## Troubleshooting

### Port 5173 Already in Use

```bash
npm run dev -- --port 3000
```

### Build Fails

```bash
rm -rf node_modules dist
npm install
npm run build
```

### Changes Not Reflecting

Clear browser cache or do a hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

## Support & Contact

- **Email**: info@urjavision.com
- **Phone**: +91 72473 91595
- **Address**: Jabalpur, Madhya Pradesh, India

## License

This project is proprietary software of Urja Vision Technologies Private Limited.

## Version History

- **v1.0.0** - Initial release with all core features

---

**Last Updated**: March 2026
**Maintained By**: Urja Vision Technologies
