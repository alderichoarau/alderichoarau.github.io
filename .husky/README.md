# 🐺 Husky Git Hooks Configuration

Ce projet utilise **Husky** pour automatiser la qualité du code avant chaque commit.

## 🚀 Hooks Configurés

### Pre-commit Hook
Exécuté automatiquement avant chaque commit :

1. **📝 Lint-staged** : Format et lint du code modifié
2. **🧪 Tests** : Exécution des tests unitaires 
3. **🏗️ Build Production** : Vérification que le build fonctionne

### Post-commit Hook
Exécuté après un commit réussi :
- Affichage des informations du commit
- Rappels pour le déploiement

## 🛠️ Scripts Disponibles

```bash
# Exécuter manuellement tous les checks
npm run quality-gate

# Tests seuls
npm run test
npm run test:watch
npm run test:coverage

# Lint et format
npm run lint
npm run lint:fix
npm run format
npm run format:check

# Build
npm run build:prod
npm run build:gh-pages
```

## 🚨 Bypass d'Urgence

En cas d'urgence, vous pouvez bypass les hooks :

```bash
# Commit sans hooks (USE WITH CAUTION!)
git commit --no-verify -m "Emergency commit"

# Ou temporairement désactiver Husky
npm run prepare --if-present || echo "Husky disabled"
```

## 🎯 Qualité Garantie

Ces hooks garantissent que chaque commit :
- ✅ Respecte les standards de code (ESLint + Prettier)
- ✅ Passe tous les tests unitaires
- ✅ Peut être buildé en production
- ✅ Est prêt pour le déploiement

## 📊 Performance

Les hooks sont optimisés pour être rapides :
- **Lint-staged** : Traite uniquement les fichiers modifiés
- **Tests** : Mode headless pour la rapidité
- **Build** : Vérification de production nécessaire

*Temps moyen d'exécution : 30-60 secondes selon les changements*