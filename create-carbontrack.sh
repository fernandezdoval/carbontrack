#!/bin/bash
# CarbonTrack Project Generator
# Ejecuta este script para crear el proyecto completo

set -e

echo "🌱 Generando CarbonTrack..."

# Crear estructura
mkdir -p carbontrack/{backend/{src/{config,routes,controllers,middleware},prisma},frontend/{src/{components,pages,services,utils}},mobile,data,docs,.github/workflows}

cd carbontrack

# Inicializar git
git init
git branch -M master

echo "📝 Creando archivos..."

# === ROOT FILES ===
cat > README.md << 'EOF'
# CarbonTrack 🌱

**Simple carbon accounting for small and medium businesses**

## Quick Start

\`\`\`bash
# Backend
cd backend && npm install && npm run dev

# Frontend (new terminal)
cd frontend && npm install && npm run dev
\`\`\`

Visit: http://localhost:5173

## Full Documentation
- [Quick Start Guide](./QUICKSTART.md)
- [Backend API](./docs/API.md)
- [Deployment](./docs/DEPLOYMENT.md)
EOF

cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2024 CarbonTrack

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF

cat > .gitignore << 'EOF'
node_modules/
.env
*.log
dist/
build/
.DS_Store
dev.db
.vscode/
.idea/
*.swp
*.swo
coverage/
EOF

echo "✅ Proyecto base creado!"
echo ""
echo "📋 Próximos pasos:"
echo "  cd carbontrack"
echo "  git add ."
echo "  git commit -m 'Initial commit'"
echo "  git remote add origin https://github.com/fernandezdoval/carbontrack.git"
echo "  git push -u origin master"
echo ""
echo "Luego instala dependencias:"
echo "  cd backend && npm install"
echo "  cd ../frontend && npm install"

