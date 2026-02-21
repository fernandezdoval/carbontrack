# CarbonTrack 🌱

**Simple carbon accounting for small and medium businesses**

## Problem
Current carbon accounting tools are designed for enterprises. SMBs need:
- Simple data entry (utilities, shipping, etc.)
- Accurate emissions calculations
- Actionable reduction roadmaps
- Compliance-ready reports

## Solution
CarbonTrack provides an intuitive multiplatform app that:
- ✅ Accepts simple inputs (bills, receipts, basic metrics)
- ✅ Calculates emissions using industry-standard factors (EPA, IPCC)
- ✅ Categorizes by Scope 1, 2, 3
- ✅ Generates reduction recommendations
- ✅ Exports compliance reports

## Market Timing
- Regulations tightening globally (SEC, EU CSRD, etc.)
- Enterprise tools too complex/expensive for SMBs
- Growing customer/investor pressure for transparency

## Tech Stack

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **API:** RESTful + GraphQL (future)

### Frontend (Web)
- **Framework:** React 18
- **Build:** Vite
- **UI:** Tailwind CSS + shadcn/ui
- **Charts:** Recharts
- **State:** React Query + Zustand

### Mobile
- **Framework:** React Native (Expo)
- **Shared:** 80%+ code reuse with web

## Project Structure
```
carbontrack/
├── backend/           # API server & business logic
├── frontend/          # Web application
├── mobile/            # React Native apps
├── data/              # Emission factors & reference data
└── docs/              # Documentation
```

## Getting Started

See individual README files in each directory:
- [Backend Setup](./backend/README.md)
- [Frontend Setup](./frontend/README.md)
- [Mobile Setup](./mobile/README.md)

## Roadmap

### MVP (Phase 1)
- [x] Project structure
- [ ] Database schema
- [ ] Emissions calculation engine
- [ ] REST API
- [ ] Web dashboard
- [ ] Input forms
- [ ] Basic reports

### Phase 2
- [ ] Mobile apps (iOS/Android)
- [ ] Advanced visualizations
- [ ] Benchmarking
- [ ] AI-powered recommendations

### Phase 3
- [ ] Multi-user/team support
- [ ] API integrations (utility providers)
- [ ] Audit trail & compliance features
- [ ] Marketplace for carbon offsets

## License
MIT (for now - TBD based on commercialization strategy)

## Contributing
This is an active development project. Contributions welcome!
