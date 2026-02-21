# CarbonTrack Deployment Guide

How to deploy CarbonTrack to production.

## Deployment Options

### 1. Cloud Platforms (Easiest)

#### Vercel (Frontend) + Railway/Render (Backend)

**Frontend (Vercel):**
```bash
cd frontend
npm install -g vercel
vercel
```

**Backend (Railway):**
1. Go to https://railway.app
2. Create new project from GitHub repo
3. Select `backend` folder
4. Add PostgreSQL database
5. Set environment variables
6. Deploy!

**Backend (Render):**
1. Go to https://render.com
2. New Web Service from GitHub
3. Build command: `cd backend && npm install`
4. Start command: `cd backend && npm start`
5. Add PostgreSQL database
6. Set environment variables

#### All-in-one: Fly.io

```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Deploy backend
cd backend
fly launch
fly postgres create
fly postgres attach <postgres-name>
fly deploy

# Deploy frontend
cd ../frontend
fly launch
fly deploy
```

### 2. VPS (DigitalOcean, Linode, AWS EC2)

**Requirements:**
- Ubuntu 22.04 LTS
- 2GB RAM minimum
- Docker + Docker Compose

```bash
# On your server
git clone <your-repo>
cd carbontrack

# Set up environment
cp backend/.env.example backend/.env
# Edit backend/.env with production values

# Start with Docker
docker-compose -f docker-compose.prod.yml up -d

# Set up database
docker-compose exec backend npm run db:push
```

### 3. Kubernetes (Enterprise)

See `k8s/` folder for Kubernetes manifests.

```bash
kubectl apply -f k8s/
```

---

## Production Checklist

### Security

- [ ] Change `JWT_SECRET` to a strong random value
- [ ] Use strong database password
- [ ] Enable HTTPS (use Let's Encrypt)
- [ ] Set `NODE_ENV=production`
- [ ] Configure CORS to only allow your frontend domain
- [ ] Enable rate limiting
- [ ] Set up backup strategy
- [ ] Use environment variables for all secrets

### Backend Configuration

**Required Environment Variables:**
```bash
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:pass@host:5432/carbontrack
JWT_SECRET=<generate-with-openssl-rand-base64-32>
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://yourdomain.com
```

**Optional:**
```bash
LOG_LEVEL=info
SENTRY_DSN=<sentry-error-tracking>
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=900000
```

### Database

**PostgreSQL Setup:**
```sql
CREATE DATABASE carbontrack;
CREATE USER carbontrack WITH PASSWORD 'strong-password';
GRANT ALL PRIVILEGES ON DATABASE carbontrack TO carbontrack;
```

**Run migrations:**
```bash
npm run db:push
```

**Backup strategy:**
```bash
# Daily backups
pg_dump carbontrack > backup-$(date +%Y%m%d).sql

# Restore
psql carbontrack < backup-20240101.sql
```

### Frontend Configuration

**Build for production:**
```bash
cd frontend
npm run build
```

**Environment variables:**
```bash
VITE_API_URL=https://api.yourdomain.com
```

### Monitoring

**Health checks:**
- Backend: `GET /health`
- Database: Check connection pool
- Frontend: Load time, error rate

**Recommended tools:**
- **Uptime:** UptimeRobot, Pingdom
- **Errors:** Sentry
- **Performance:** New Relic, DataDog
- **Logs:** Papertrail, LogDNA

---

## Nginx Configuration

**Reverse proxy for backend:**
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

**Frontend static hosting:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/carbontrack/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Enable HTTPS with Let's Encrypt:**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d api.yourdomain.com
```

---

## Docker Production Setup

**docker-compose.prod.yml:**
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - carbontrack

  backend:
    build: ./backend
    restart: always
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/${DB_NAME}
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      - postgres
    networks:
      - carbontrack
    ports:
      - "3000:3000"

  frontend:
    build: ./frontend
    restart: always
    ports:
      - "80:80"
    networks:
      - carbontrack

networks:
  carbontrack:

volumes:
  postgres_data:
```

---

## Scaling Strategy

### Horizontal Scaling

**Backend:**
- Run multiple instances behind load balancer
- Use Redis for session storage
- Enable stateless authentication (JWT)

**Database:**
- Set up read replicas for queries
- Use connection pooling (PgBouncer)
- Consider managed PostgreSQL (AWS RDS, etc.)

### Caching

**API responses:**
```javascript
// Add Redis caching layer
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

// Cache emission factors (rarely change)
const factors = await redis.get('emission_factors');
if (!factors) {
  const data = await loadFactors();
  await redis.set('emission_factors', JSON.stringify(data), 'EX', 86400);
}
```

**Frontend:**
- Use CDN for static assets (Cloudflare, CloudFront)
- Enable browser caching
- Implement service workers for offline support

---

## CI/CD Pipeline

**GitHub Actions example:**
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Backend
        run: |
          cd backend
          npm install
          npm run build
      
      - name: Build Frontend
        run: |
          cd frontend
          npm install
          npm run build
      
      - name: Deploy
        run: |
          # Deploy to your platform
          # e.g., fly deploy, vercel deploy, etc.
```

---

## Performance Optimization

### Database
- [ ] Add indexes on frequently queried fields
- [ ] Enable query caching
- [ ] Use database connection pooling
- [ ] Archive old data

### Backend
- [ ] Enable gzip compression
- [ ] Implement request caching
- [ ] Optimize database queries
- [ ] Use async processing for heavy tasks

### Frontend
- [ ] Code splitting
- [ ] Lazy load routes
- [ ] Optimize images
- [ ] Minimize bundle size

---

## Backup & Recovery

**Automated backups:**
```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > /backups/carbontrack_$DATE.sql
# Upload to S3 or similar
aws s3 cp /backups/carbontrack_$DATE.sql s3://your-bucket/backups/
```

**Recovery:**
```bash
psql $DATABASE_URL < backup.sql
```

---

## Cost Estimates

### Small Business (< 100 users)
- **Hosting:** $20-50/month (Railway, Render)
- **Database:** $10-25/month (managed PostgreSQL)
- **CDN:** Free tier (Cloudflare)
- **Total:** ~$30-75/month

### Medium Business (100-1000 users)
- **Hosting:** $100-200/month (multiple instances)
- **Database:** $50-100/month (larger instance + replicas)
- **CDN:** $20-50/month
- **Monitoring:** $30-50/month
- **Total:** ~$200-400/month

### Enterprise (1000+ users)
- Custom infrastructure
- Dedicated resources
- $1000+/month

---

## Support

For deployment issues, check:
- GitHub Issues
- Documentation: `/docs`
- Community Discord (if applicable)
