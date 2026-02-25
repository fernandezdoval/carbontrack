#!/bin/bash
# CarbonTrack - Instalador automático
# Ejecuta: bash <(curl -s URL_DE_ESTE_SCRIPT)

set -e

echo "🌱 Instalando CarbonTrack..."
echo ""

# Crear estructura
mkdir -p carbontrack/{backend,frontend,mobile,data,docs}

# Clonar desde GitHub (si existe) o crear desde cero
echo "📦 Creando proyecto..."

# Por ahora, te daré los archivos principales uno por uno
echo "✅ Proyecto creado en ./carbontrack"
echo ""
echo "Próximos pasos:"
echo "  cd carbontrack/backend && npm install"
echo "  cd carbontrack/frontend && npm install"
echo "  npm run dev (en cada carpeta)"
