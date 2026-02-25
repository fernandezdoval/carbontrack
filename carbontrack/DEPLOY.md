# 🚀 Guía de Despliegue - CarbonTrack en Vercel + Supabase

## ✅ Configuración Actual

**Supabase (Base de datos):**
- URL: `https://iewyfkwjgdtbdfrffbls.supabase.co`
- Publishable Key: `sb_publishable_ISI29oIYCbk4D2GskZOJww_DeA8n8pS`

## 📋 Pasos para desplegar

### 1. Configurar Supabase

En tu dashboard de Supabase:
1. Ve a **SQL Editor**
2. Copia y pega el esquema de la base de datos (ver `backend/prisma/schema.prisma`)
3. Ejecuta las migraciones

### 2. Desplegar en Vercel

#### Opción A: Desde la UI de Vercel (MÁS FÁCIL)

1. Ve a https://vercel.com/new
2. Importa el repositorio: `fernandezdoval/carbontrack`
3. Configura las variables de entorno:

```env
NODE_ENV=production
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.iewyfkwjgdtbdfrffbls.supabase.co:5432/postgres
JWT_SECRET=carbontrack-production-secret-2024-change-this
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://carbontrack.vercel.app
VITE_API_URL=https://carbontrack.vercel.app/api
```

4. En **Build & Development Settings**:
   - Framework Preset: `Vite`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. Click en **Deploy**

#### Opción B: Desde la terminal

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Desplegar
cd carbontrack
vercel --prod
```

### 3. Configurar variables de entorno en Vercel

En el dashboard de Vercel → Tu proyecto → Settings → Environment Variables:

Añade:
- `DATABASE_URL` → La URL completa de Supabase
- `JWT_SECRET` → Un string aleatorio seguro
- `VITE_API_URL` → La URL de tu proyecto Vercel + `/api`

### 4. Inicializar la base de datos

Después del primer despliegue:

```bash
cd backend
npx prisma migrate deploy
npx prisma db seed
```

## 🎉 ¡Listo!

Tu aplicación estará disponible en:
- **URL:** https://carbontrack.vercel.app (o el nombre que elijas)

## 🔧 Redeploy automático

Cada vez que hagas `git push` a GitHub, Vercel redespliegará automáticamente.

## 📝 Notas

- Plan gratuito de Vercel: 100 GB/mes de ancho de banda
- Plan gratuito de Supabase: 500 MB de base de datos
- SSL/HTTPS incluido automáticamente
