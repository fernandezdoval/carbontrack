# Changelog

All notable changes to CarbonTrack will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- User authentication and authorization
- Activity logging with receipt upload
- Automated emissions calculations
- Data visualization (charts and graphs)
- PDF/CSV report generation
- Reduction recommendations engine
- Target setting and tracking
- API integrations (utility providers)
- Mobile apps (iOS/Android)
- Multi-user/team support
- Audit trail
- Benchmarking against industry peers

## [0.1.0] - 2024-01-15

### Added
- Initial project structure
- Backend API with Express.js
- Frontend web app with React + Vite
- Mobile app scaffold with React Native (Expo)
- PostgreSQL database schema with Prisma
- Comprehensive emission factors database (EPA, DEFRA, IPCC, IEA)
- Quick calculator endpoint (no auth required)
- Emission factor API endpoints
- Dashboard UI with stats overview
- Category breakdown visualization
- Responsive design with Tailwind CSS
- Docker support with docker-compose
- Automated setup script
- Comprehensive documentation:
  - README with project overview
  - QUICKSTART guide
  - API documentation
  - Deployment guide
  - Business model & GTM strategy
  - Contributing guidelines
- CI/CD pipeline with GitHub Actions
- Emission categories supported:
  - Electricity (by region)
  - Natural gas and heating
  - Transportation (gasoline, diesel, flights)
  - Shipping and freight
  - Waste disposal
  - Cloud computing
  - Water supply
  - Refrigerants
  - Hotels
  - Materials (paper, plastic, steel, etc.)

### Technical Details
- Node.js 18+ backend
- React 18 frontend
- PostgreSQL 14+ database
- Prisma ORM
- JWT authentication (prepared)
- RESTful API design
- Modular architecture
- Environment-based configuration
- Error handling and logging
- CORS configuration
- Health check endpoints

### Documentation
- Project README
- Backend README
- Frontend README
- Mobile README
- Quick start guide
- API documentation
- Deployment guide
- Business model documentation
- Contributing guidelines
- GitHub Actions CI/CD

### Developer Experience
- One-command setup script
- Docker Compose for local development
- Hot reload for development
- ESLint configuration
- Prettier integration (ready)
- Environment variable templates
- Comprehensive .gitignore files

## Version History

### Version Naming
- **0.1.x** - Initial development, MVP features
- **0.2.x** - Authentication and user management
- **0.3.x** - Activity logging and emissions tracking
- **0.4.x** - Reports and exports
- **0.5.x** - Recommendations and targets
- **1.0.0** - Production-ready release

### Future Milestones

**v0.2.0 - Authentication** (Planned)
- User registration and login
- JWT token authentication
- Organization management
- User roles and permissions

**v0.3.0 - Core Tracking** (Planned)
- Activity logging interface
- Automated emission calculations
- Historical data tracking
- Facility management

**v0.4.0 - Reporting** (Planned)
- Report generation (PDF, CSV, Excel)
- Data visualization and charts
- Compliance export formats
- Trend analysis

**v0.5.0 - Intelligence** (Planned)
- AI-powered recommendations
- Reduction target setting
- Progress tracking
- Benchmarking

**v1.0.0 - Production** (Planned)
- All core features complete
- Mobile apps released
- API integrations
- Production deployment
- Security audit
- Performance optimization

---

## Contribution

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
