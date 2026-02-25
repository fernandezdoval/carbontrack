#!/bin/bash
# CarbonTrack - Instalador completo
# Ejecuta: curl -sSL https://gist.github.com/[ID]/raw | bash

set -e

echo "🌱 Descargando CarbonTrack..."
echo ""

# Clonar repositorio público (una vez subido)
git clone https://github.com/carbontrack/carbontrack.git
cd carbontrack

echo ""
echo "✅ Proyecto descargado!"
echo ""
echo "📋 Próximos pasos:"
echo "  cd carbontrack"
echo "  ./setup.sh"
echo ""
