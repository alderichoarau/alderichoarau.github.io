#!/bin/bash

# Script de test local simple
set -e

echo "🧪 Test local du portfolio"
echo "=========================="

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}1. Installation des dépendances...${NC}"
npm install

echo -e "${BLUE}2. Vérification ESLint...${NC}"
npm run lint || echo "⚠️ Erreurs ESLint détectées (non bloquant)"

echo -e "${BLUE}3. Build de production...${NC}"
npm run build

echo -e "${BLUE}4. Vérification des traductions...${NC}"
if [ -f "docs/browser/assets/i18n/fr.json" ]; then
    echo -e "${GREEN}✅ Fichier fr.json trouvé${NC}"
    if grep -q '"portfolio"' docs/browser/assets/i18n/fr.json; then
        echo -e "${GREEN}✅ Traduction 'portfolio' présente${NC}"
    else
        echo "❌ Traduction 'portfolio' manquante"
    fi
else
    echo "❌ Fichier fr.json manquant"
fi

echo -e "${BLUE}5. Démarrage du serveur de test...${NC}"
echo "Le serveur va démarrer sur http://localhost:8080"
echo "Appuyez sur Ctrl+C pour arrêter"
echo ""

# Serveur HTTP simple avec Python ou Node
if command -v python3 &> /dev/null; then
    cd docs/browser && python3 -m http.server 8080
elif command -v python &> /dev/null; then
    cd docs/browser && python -m SimpleHTTPServer 8080
elif command -v npx &> /dev/null; then
    npx http-server docs/browser -p 8080 -o
else
    echo "❌ Aucun serveur HTTP disponible"
    echo "Installez Python ou Node.js avec npx"
    exit 1
fi