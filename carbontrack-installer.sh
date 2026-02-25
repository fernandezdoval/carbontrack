#!/bin/bash
# CarbonTrack Installer
# Ejecutar en tu computadora para obtener el proyecto completo

set -e

echo "🌱 CarbonTrack - Instalador"
echo "=========================="
echo ""

# Verificar prerequisitos
if ! command -v git &> /dev/null; then
    echo "❌ Git no está instalado. Instálalo primero."
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Instálalo desde https://nodejs.org"
    exit 1
fi

echo "✅ Prerequisitos verificados"
echo ""

# Crear directorio del proyecto
PROJECT_DIR="carbontrack"
if [ -d "$PROJECT_DIR" ]; then
    echo "⚠️  La carpeta $PROJECT_DIR ya existe"
    read -p "¿Deseas sobrescribirla? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf "$PROJECT_DIR"
    else
        exit 1
    fi
fi

echo "📥 Descargando desde GitHub..."
git clone https://github.com/fernandezdoval/carbontrack.git

cd carbontrack

echo ""
echo "✅ Proyecto descargado!"
echo ""
echo "📋 Próximos pasos:"
echo ""
echo "  cd carbontrack"
echo "  ./setup.sh"
echo ""
echo "O manualmente:"
echo "  cd carbontrack/backend && npm install && npm run dev"
echo "  cd carbontrack/frontend && npm install && npm run dev"
echo ""
