#!/bin/bash
# Script para subir CarbonTrack a GitHub
# Usuario: fernandezdoval

echo "🌱 Configurando CarbonTrack para GitHub..."

# 1. Ir al directorio del proyecto
cd carbontrack

# 2. Crear archivo .gitignore si no existe
cat > .gitignore << 'EOF'
node_modules/
.env
*.log
dist/
build/
.DS_Store
dev.db
EOF

# 3. Configurar remote
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/fernandezdoval/carbontrack.git

# 4. Verificar estado
git status

echo ""
echo "✅ Repositorio configurado!"
echo ""
echo "🔐 Ahora necesitas autenticarte con GitHub"
echo "   Opción 1: gh auth login  (si tienes GitHub CLI)"
echo "   Opción 2: Usar Personal Access Token"
echo ""
echo "📤 Para subir el código:"
echo "   git push -u origin master"

