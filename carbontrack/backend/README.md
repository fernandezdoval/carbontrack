# CarbonTrack Backend

REST API server for carbon emissions tracking and calculations.

## Features

- ✅ Emission factor database (EPA, DEFRA, IPCC standards)
- ✅ Calculation engine for CO2e emissions
- 🚧 User authentication & authorization
- 🚧 Organization & facility management
- 🚧 Activity tracking & data input
- 🚧 Automated emissions calculations
- 🚧 Reports & analytics
- 🚧 Reduction recommendations

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+ (for full features)

### Installation

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your database credentials

# Run in development mode (no database required for basic API)
npm run dev
```

### Without Database (Quick Demo)

The API includes a standalone calculation endpoint that works without database setup:

```bash
npm run dev
```

Then test with:
```bash
# Calculate emissions from electricity
curl -X POST http://localhost:3000/api/v1/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "category": "electricity",
    "value": 1000,
    "region": "US"
  }'

# Calculate from gasoline
curl -X POST http://localhost:3000/api/v1/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "category": "transportation",
    "subcategory": "gasoline",
    "value": 50
  }'
```

### With Database (Full Features)

```bash
# Set up database
npm run db:push

# Seed with emission factors
npm run db:seed

# Start server
npm run dev
```

## API Endpoints

### Public (No Auth)

```
GET  /health                          - Health check
GET  /api/v1                          - API info
GET  /api/v1/emission-factors         - List categories & metadata
GET  /api/v1/emission-factors/:cat    - Get regions for category
POST /api/v1/calculate                - Quick calculation (demo)
```

### Coming Soon

```
POST /api/v1/auth/register            - Register user
POST /api/v1/auth/login               - Login
GET  /api/v1/organizations/:id        - Get organization
POST /api/v1/activities               - Log activity
GET  /api/v1/emissions                - Get emissions data
GET  /api/v1/reports                  - Generate reports
GET  /api/v1/recommendations          - Get reduction tips
```

## Project Structure

```
backend/
├── src/
│   ├── server.js              # Express app & server
│   ├── config/
│   │   └── emissionFactors.js # Emission factor service
│   ├── routes/                # API routes (coming)
│   ├── controllers/           # Route handlers
│   ├── services/              # Business logic
│   ├── middleware/            # Auth, validation, etc.
│   └── utils/                 # Helpers
├── prisma/
│   └── schema.prisma          # Database schema
└── package.json
```

## Emission Factors

We use industry-standard emission factors from:
- **EPA** - US Environmental Protection Agency
- **DEFRA/BEIS** - UK Government emissions factors
- **IPCC** - Intergovernmental Panel on Climate Change
- **IEA** - International Energy Agency

All factors are in **kg CO2e** (carbon dioxide equivalent) per unit.

### Supported Categories

- **Electricity** - Grid electricity by region
- **Natural Gas** - Heating & stationary combustion
- **Transportation** - Gasoline, diesel, flights, shipping
- **Waste** - Landfill, incineration, recycling
- **Materials** - Paper, plastic, steel, concrete, etc.
- **Cloud Computing** - AWS, GCP, Azure, generic datacenter
- **Water** - Supply, treatment, wastewater
- **Refrigerants** - HFCs, R134a, R410A
- **Hotels** - Business travel accommodation

## Development

```bash
# Run with auto-reload
npm run dev

# Run tests
npm test

# Lint code
npm run lint

# Database management
npm run db:push    # Push schema changes
npm run db:studio  # Open Prisma Studio (GUI)
```

## Environment Variables

See `.env.example` for all configuration options.

## License

MIT
