# CarbonTrack Frontend

Modern web application for carbon emissions tracking.

## Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **State Management:** React Query + Zustand
- **Charts:** Recharts
- **Icons:** Lucide React

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173

## Features

### Current
- ✅ Dashboard with emissions overview
- ✅ Quick calculator (real-time API integration)
- ✅ Activity logging interface
- ✅ Reports page
- ✅ Responsive design
- ✅ Clean, professional UI

### Coming Soon
- User authentication
- Organization management
- Data visualization (charts & graphs)
- Export functionality (PDF, CSV, Excel)
- Multi-language support

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Route pages
│   ├── Dashboard.jsx
│   ├── Calculate.jsx
│   ├── Activities.jsx
│   └── Reports.jsx
├── services/         # API integration
├── hooks/            # Custom React hooks
├── utils/            # Helper functions
├── App.jsx           # Root component
├── main.jsx          # Entry point
└── index.css         # Global styles
```

## Available Scripts

```bash
# Development
npm run dev          # Start dev server with HMR

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Lint code with ESLint
```

## API Integration

The frontend connects to the backend API via proxy (configured in `vite.config.js`):

```javascript
// Development: proxies /api/* to http://localhost:3000
fetch('/api/v1/calculate', { ... })

// Production: set VITE_API_URL environment variable
```

## Environment Variables

Create `.env` file:
```bash
VITE_API_URL=http://localhost:3000  # Backend API URL
```

## Styling

We use Tailwind CSS with custom configuration:

**Custom colors:**
- Primary green: `primary-{50-900}`
- Semantic colors for emissions, warnings, etc.

**Utility classes:**
- `.btn` - Base button
- `.btn-primary` - Primary action button
- `.card` - Content card
- `.input` - Form input
- `.label` - Form label

## Building for Production

```bash
npm run build
```

This creates optimized production files in `dist/`:
- Minified JavaScript
- Optimized CSS
- Asset optimization
- Code splitting

Deploy the `dist/` folder to any static hosting:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Nginx

## Customization

### Branding

**Colors:** Edit `tailwind.config.js`
```javascript
theme: {
  extend: {
    colors: {
      primary: { ... }
    }
  }
}
```

**Logo:** Replace in `App.jsx` and update `index.html`

### Features

**Add new pages:**
1. Create component in `src/pages/`
2. Add route in `App.jsx`
3. Add navigation link

**Add new API endpoints:**
1. Create service in `src/services/`
2. Use React Query hooks for data fetching

## Performance

**Optimizations applied:**
- Code splitting by route
- Lazy loading
- React Query caching
- Tailwind CSS purging
- Asset optimization

**Lighthouse scores (target):**
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast compliance
- Screen reader friendly

## Contributing

See main [README.md](../README.md) for contribution guidelines.

## License

MIT
