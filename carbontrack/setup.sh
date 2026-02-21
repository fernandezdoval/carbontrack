#!/bin/bash

# CarbonTrack Setup Script
# Automated setup for development environment

set -e

echo "🌱 CarbonTrack Setup"
echo "===================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo "Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version 18+ required (found v$NODE_VERSION)${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node -v)${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ npm $(npm -v)${NC}"

# Check for Docker (optional)
if command -v docker &> /dev/null; then
    echo -e "${GREEN}✓ Docker $(docker -v | cut -d' ' -f3 | cut -d',' -f1)${NC}"
    DOCKER_AVAILABLE=true
else
    echo -e "${YELLOW}⚠ Docker not found (optional)${NC}"
    DOCKER_AVAILABLE=false
fi

echo ""

# Setup mode selection
echo "Choose setup mode:"
echo "1) Quick Start (no database, calculator only)"
echo "2) Full Setup (with PostgreSQL database)"
echo "3) Docker Setup (everything in containers)"
echo ""
read -p "Enter choice [1-3]: " SETUP_MODE

case $SETUP_MODE in
    1)
        echo -e "\n${GREEN}Quick Start mode selected${NC}\n"
        
        # Backend setup
        echo "Setting up backend..."
        cd backend
        npm install
        cp .env.example .env
        echo -e "${GREEN}✓ Backend ready${NC}"
        cd ..
        
        # Frontend setup
        echo "Setting up frontend..."
        cd frontend
        npm install
        echo -e "${GREEN}✓ Frontend ready${NC}"
        cd ..
        
        echo -e "\n${GREEN}✅ Setup complete!${NC}\n"
        echo "To start:"
        echo "  Terminal 1: cd backend && npm run dev"
        echo "  Terminal 2: cd frontend && npm run dev"
        echo ""
        echo "Then visit: http://localhost:5173"
        ;;
        
    2)
        echo -e "\n${YELLOW}Full Setup mode selected${NC}\n"
        
        # Check for PostgreSQL
        if ! command -v psql &> /dev/null; then
            echo -e "${YELLOW}⚠ PostgreSQL not found${NC}"
            echo "Install PostgreSQL 14+ or use Docker mode instead"
            exit 1
        fi
        
        # Database setup
        read -p "PostgreSQL host [localhost]: " PG_HOST
        PG_HOST=${PG_HOST:-localhost}
        
        read -p "PostgreSQL port [5432]: " PG_PORT
        PG_PORT=${PG_PORT:-5432}
        
        read -p "PostgreSQL user [carbontrack]: " PG_USER
        PG_USER=${PG_USER:-carbontrack}
        
        read -sp "PostgreSQL password: " PG_PASSWORD
        echo ""
        
        read -p "Database name [carbontrack]: " PG_DB
        PG_DB=${PG_DB:-carbontrack}
        
        # Backend setup
        echo "Setting up backend..."
        cd backend
        npm install
        
        # Create .env file
        cat > .env << EOF
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DB}
JWT_SECRET=$(openssl rand -base64 32)
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
LOG_LEVEL=info
EOF
        
        echo "Pushing database schema..."
        npm run db:push
        
        echo -e "${GREEN}✓ Backend ready${NC}"
        cd ..
        
        # Frontend setup
        echo "Setting up frontend..."
        cd frontend
        npm install
        echo -e "${GREEN}✓ Frontend ready${NC}"
        cd ..
        
        echo -e "\n${GREEN}✅ Setup complete!${NC}\n"
        echo "To start:"
        echo "  Terminal 1: cd backend && npm run dev"
        echo "  Terminal 2: cd frontend && npm run dev"
        echo ""
        echo "Then visit: http://localhost:5173"
        ;;
        
    3)
        echo -e "\n${GREEN}Docker Setup mode selected${NC}\n"
        
        if [ "$DOCKER_AVAILABLE" = false ]; then
            echo -e "${RED}❌ Docker is required for this mode${NC}"
            echo "Please install Docker Desktop from https://docker.com"
            exit 1
        fi
        
        # Check docker-compose
        if ! command -v docker-compose &> /dev/null; then
            echo -e "${RED}❌ docker-compose not found${NC}"
            exit 1
        fi
        
        # Backend env setup
        cd backend
        if [ ! -f .env ]; then
            cp .env.example .env
            echo -e "${GREEN}✓ Created backend .env${NC}"
        fi
        cd ..
        
        # Start containers
        echo "Starting Docker containers..."
        docker-compose up -d
        
        echo "Waiting for database to be ready..."
        sleep 10
        
        echo "Setting up database schema..."
        docker-compose exec backend npm run db:push
        
        echo -e "\n${GREEN}✅ Setup complete!${NC}\n"
        echo "Services running:"
        echo "  Frontend: http://localhost:5173"
        echo "  Backend:  http://localhost:3000"
        echo "  Database: localhost:5432"
        echo ""
        echo "To stop: docker-compose down"
        echo "To view logs: docker-compose logs -f"
        ;;
        
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

# Optional: Mobile setup
echo ""
read -p "Set up mobile app? (y/N): " SETUP_MOBILE

if [[ $SETUP_MOBILE =~ ^[Yy]$ ]]; then
    echo "Setting up mobile app..."
    cd mobile
    npm install
    echo -e "${GREEN}✓ Mobile app ready${NC}"
    echo ""
    echo "To run mobile:"
    echo "  cd mobile && npm start"
    cd ..
fi

echo ""
echo -e "${GREEN}🎉 All done!${NC}"
echo ""
echo "Next steps:"
echo "1. Read QUICKSTART.md for detailed instructions"
echo "2. Check out the Quick Calculator at /calculate"
echo "3. Explore the API at http://localhost:3000/api/v1"
echo ""
echo "Documentation:"
echo "  - API: docs/API.md"
echo "  - Deployment: docs/DEPLOYMENT.md"
echo "  - Contributing: docs/CONTRIBUTING.md"
echo ""
echo "Happy tracking! 🌱"
