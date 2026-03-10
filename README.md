# URJA VISION - Solar Energy Ecosystem Platform

## Overview

URJA VISION is a premium, enterprise-grade solar energy platform designed for complete renewable energy solutions. Built with modern web technologies, it provides a comprehensive ecosystem connecting homeowners, businesses, farmers, vendors, and trainers in the solar energy industry.

## 🌞 Key Features

### For Homeowners
- **Solar Packages**: Pre-configured 2kW, 5kW, and 10kW systems
- **Solar Calculator**: Real-time ROI and savings calculations
- **Product Marketplace**: Browse and compare solar products
- **Government Subsidies**: Information on solar schemes and subsidies
- **Project Showcase**: View successful installations

### For Farmers (Kisan Urja)
- **Solar Irrigation Pumps**: Subsidy-eligible solutions
- **Solar Fencing**: Crop protection without electricity
- **Farm Electrification**: Complete power solutions
- **Cold Storage**: Reduce post-harvest losses

### For Businesses & Industries
- **Commercial Solutions**: Large-scale installations
- **Industrial Power Plants**: Up to 100kW+ capacity
- **EPC Services**: Complete project management
- **Consultancy**: Feasibility studies and planning

### For Partners & Vendors
- **Vendor Network**: Join the growing partner ecosystem
- **Equipment Supply**: Access to premium products
- **Training & Certification**: Upskill your team
- **Job Opportunities**: Career growth in renewable energy

### Platform Features
- 🎨 **Premium UI**: Modern glassmorphism design
- 📱 **Fully Responsive**: Perfect on all devices
- ⚡ **Fast Performance**: Optimized for speed
- 🔄 **Smooth Animations**: Micro-interactions and transitions
- 📊 **Interactive Calculator**: Real-time ROI estimation
- 📋 **Form Validation**: Smart form handling
- ♿ **Accessible**: WCAG compliant design

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm v9+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd urja-vision

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see your application.

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 📊 Project Statistics

- **Pages**: 13 fully functional pages
- **Components**: 20+ reusable UI components
- **Products**: 12+ solar products with specs
- **Projects**: 6 showcase projects
- **Courses**: 4 training programs
- **Jobs**: 5 career positions
- **CSS Bundle**: 6.09 KB (gzipped)
- **JS Bundle**: 183.14 KB (gzipped)

## 🎨 Design System

### Color Palette
- **Primary**: Energy Green (#1E8449)
- **Secondary**: Solar Yellow (#FFC300)
- **Surface**: Soft Zinc (#F4F4F5)
- **Text**: Dark Gray (#1F1F1F)

### Typography
- **Headings**: Bold, geometric sans-serif
- **Body**: Inter with 1.8 line-height
- **Micro-copy**: Uppercase with tracking

### Components
- Cards with premium shadows
- Glass-morphism effects
- Smooth transitions (300ms cubic-bezier)
- Responsive grid layouts

## 📱 Mobile Experience

- Thumb-driven navigation
- Bottom-sheet compatible design
- Touch-optimized interactions
- Responsive breakpoints at 640px, 768px, 1024px

## 🔧 Technology Stack

```
Frontend Framework:    React 18.3
Language:             TypeScript
Build Tool:           Vite
Styling:              Tailwind CSS 3.4
Icons:                Lucide React
Routing:              Client-side (no external lib)
State Management:     React Hooks
```

## 📁 Project Structure

```
src/
├── components/        # 20+ reusable components
├── pages/            # 13 page components
├── layouts/          # Layout wrappers
├── utils/            # Constants, helpers, data
├── styles/           # Theme and animations
├── App.tsx           # Main app with routing
└── main.tsx          # Entry point
```

## 🎯 Pages Available

1. **Home** - Hero section, services, products preview
2. **About** - Company information, mission, values
3. **Solar Solutions** - Service descriptions
4. **Solar Products** - Product marketplace with filters
5. **Solar Packages** - Tiered pricing packages
6. **Government Schemes** - Subsidy and scheme info
7. **Kisan Urja** - Agricultural solar solutions
8. **Vendor Partner** - Partnership program
9. **Training & Internship** - Course listings
10. **Careers** - Job opportunities
11. **Solar Projects** - Portfolio showcase
12. **Knowledge Hub** - Blog and articles
13. **Contact** - Contact form and information

## 🎨 UI Enhancements

- **Smooth Scrolling**: Fade-in-up animations
- **Hover Effects**: Scale and glow effects
- **Form Interactions**: Focus states and validation feedback
- **Navigation**: Active state indicators with smooth transitions
- **Cards**: Lift on hover with shadow depth

## 📊 Features by Page

### Home
- Hero banner with CTA
- Service overview grid
- Product showcase
- Package comparison
- Solar calculator preview
- Project portfolio
- Testimonials
- Blog preview
- Newsletter signup

### Products
- Category filtering
- Product cards with specs
- Quick view functionality
- Request quote button

### Packages
- Three-tier pricing
- Feature comparison
- ROI calculations
- Component lists
- CTA buttons

### Forms
- Contact form with validation
- Newsletter signup
- Lead capture forms
- Success messages
- Error handling

## 🔐 Security

- Input validation on all forms
- Email and phone validation
- XSS protection (React built-in)
- HTTPS ready
- No sensitive data in client code

## ♿ Accessibility

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- High contrast colors (WCAG AA)
- Focus states on interactive elements

## ⚡ Performance

- Lazy loading ready
- Optimized CSS (6.09 KB gzipped)
- Efficient JS bundling (183.14 KB gzipped)
- Mobile-first responsive design
- Core Web Vitals optimized

## 🌍 SEO Features

- Semantic HTML structure
- Proper heading hierarchy
- Mobile responsive
- Fast page load times
- Meta tags ready
- Sitemap compatible structure

## 🚀 Future Enhancements

- [ ] Backend API integration
- [ ] User authentication
- [ ] Database persistence
- [ ] Payment integration
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Admin dashboard

## 📝 Customization

### Change Colors
Edit `src/styles/theme.css` - all colors use CSS variables

### Update Content
Edit `src/utils/data.ts` - contains all page content

### Modify Company Info
Edit `src/utils/constants.ts` - COMPANY_INFO object

### Add Pages
1. Create component in `src/pages/`
2. Import in `App.tsx`
3. Add route in `renderPage()` function

## 🐛 Known Issues

None currently. Report issues in the repository.

## 📞 Support

**Email**: info@urjavision.com
**Phone**: +91 72473 91595
**Address**: 390/1 Premnagar, Jabalpur, MP 482001

## 📄 License

Proprietary - Urja Vision Technologies Private Limited

## 👥 Team

- **Design & Development**: Urja Vision Tech Team
- **Strategy**: Solar Energy Division

## 🙏 Credits

- React Team
- Tailwind CSS
- Lucide React Icons
- Vite

## 📈 Version

**Current**: v1.0.0
**Last Updated**: March 2026

---

**Ready to deploy? See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.**
