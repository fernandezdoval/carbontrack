# 🚀 CarbonTrack - Quick Start Guide

Get CarbonTrack running in minutes!

## Prerequisites

Choose **ONE** of these options:

### Option 1: Docker (Easiest)
- Docker Desktop installed
- No other dependencies needed!

### Option 2: Local Development
- Node.js 18+
- PostgreSQL 14+ (optional for full features)

---

## 🐳 Quick Start with Docker (Recommended)

**Complete setup in 3 commands:**

```bash
cd carbontrack

# Start all services (database, backend, frontend)
docker-compose up

# In another terminal, set up the database
docker-compose exec backend npm run db:push
```

**That's it!** Open your browser:
- 🌐 **Frontend:** http://localhost:5173
- 🔌 **API:** http://localhost:3000
- 📊 **Database:** localhost:5432

### Stop Everything
```bash
docker-compose down
```

### Fresh Start (Reset Database)
```bash
docker-compose down -v  # Delete volumes
docker-compose up
```

---

## 💻 Local Development Setup

### 1. Backend Setup

```bash
cd carbontrack/backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env - set your DATABASE_URL if using PostgreSQL
# For quick demo without database, skip this step

# Start the API server
npm run dev
```

**Backend running at:** http://localhost:3000

Test it:
```bash
curl http://localhost:3000/health
```

### 2. Frontend Setup

```bash
# In a new terminal
cd carbontrack/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend running at:** http://localhost:5173

### 3. Database Setup (Optional)

If you want full features (user accounts, data persistence):

```bash
# Make sure PostgreSQL is running
# Update DATABASE_URL in backend/.env

cd carbontrack/backend

# Push schema to database
npm run db:push

# Open Prisma Studio (database GUI)
npm run db:studio
```

---

## ✅ Verify It's Working

### 1. Test the API

```bash
# Health check
curl http://localhost:3000/health

# Calculate emissions (no database needed!)
curl -X POST http://localhost:3000/api/v1/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "category": "electricity",
    "value": 1000,
    "region": "US"
  }'
```

You should see:
```json
{
  "success": true,
  "data": {
    "co2e": 386,
    "factor": 0.386,
    "unit": "kWh",
    "source": "EPA eGRID 2023",
    "year": 2023,
    "inputValue": 1000,
    "inputUnit": "kWh"
  }
}
```

### 2. Test the Frontend

Open http://localhost:5173 in your browser:
- ✅ You should see the CarbonTrack dashboard
- ✅ Click "Quick Calculate" in the sidebar
- ✅ Try calculating emissions for electricity

---

## 📱 What You Can Do Right Now

### Without Database (Immediate)
- ✅ Use the Quick Calculator
- ✅ Test different emission categories
- ✅ See emission factors and sources
- ✅ Explore the API endpoints

### With Database (Full Features)
- Create user accounts
- Log activities over time
- Track emissions trends
- Generate reports
- Set reduction targets

---

## 🎯 Next Steps

1. **Try the Calculator**
   - Go to http://localhost:5173/calculate
   - Calculate emissions for different activities
   - See the emission factors and sources

2. **Explore the API**
   - Visit http://localhost:3000/api/v1
   - See all available endpoints
   - Check out the emission factors database

3. **Set Up Database** (when ready)
   - Follow the database setup steps above
   - You'll unlock activity logging and reports

4. **Customize**
   - Add your organization's data
   - Set reduction targets
   - Generate compliance reports

---

## 🐛 Troubleshooting

### Port Already in Use

**Backend (3000):**
```bash
# Change PORT in backend/.env
PORT=3001
```

**Frontend (5173):**
```bash
# Edit frontend/vite.config.js
server: { port: 5174 }
```

### Docker Issues

**Services won't start:**
```bash
docker-compose down
docker-compose up --build
```

**Database connection errors:**
```bash
# Check if postgres is healthy
docker-compose ps

# View logs
docker-compose logs postgres
```

### Cannot connect to API from frontend

**Check CORS settings** in `backend/.env`:
```
CORS_ORIGIN=http://localhost:5173
```

If you changed the frontend port, update this value.

---

## 📖 What's Next?

- **[Backend README](./backend/README.md)** - API documentation
- **[Database Schema](./backend/prisma/schema.prisma)** - Data model
- **[Emission Factors](./data/emission-factors.json)** - Reference data
- **[Main README](./README.md)** - Project overview

---

## 🤝 Need Help?

- Check the individual README files in `backend/` and `frontend/`
- Review the emission factors in `data/emission-factors.json`
- Look at the database schema in `backend/prisma/schema.prisma`

---

**Happy tracking! 🌱**
