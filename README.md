# 🚀 Aldéric Hoarau - Portfolio

[![Angular](https://img.shields.io/badge/Angular-19.2-red?style=for-the-badge&logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-green?style=for-the-badge&logo=github)](https://pages.github.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-purple?style=for-the-badge)](https://web.dev/progressive-web-apps/)

Portfolio professionnel développé avec Angular 19, déployé sur GitHub Pages. Architecturé selon les meilleures pratiques Angular avec un code clean, performant et accessible.

**Live Website:** [https://alderichoarau.github.io](https://alderichoarau.github.io)

## ✨ Fonctionnalités

- 🌟 **Modern Angular 19** avec signals et standalone components
- 🎨 **Angular Material** avec thème personnalisé LinkedIn-inspired  
- 🌐 **Internationalization** (FR/EN) avec ngx-translate
- 📱 **Fully Responsive** et mobile-first
- ♿ **Accessible** (ARIA labels, navigation clavier, contraste)
- 🔍 **SEO Optimized** (meta tags, Open Graph, JSON-LD)
- ⚡ **Performance** (lazy loading, PWA, optimizations)
- 🎭 **Smooth Animations** avec Angular Animations
- 🧪 **Clean Architecture** (Core/Shared/Features modules)
- 🛠️ **Clean Code** (ESLint, Prettier, inject() pattern)

## 🏗️ Architecture Clean Code

```
src/app/
├── core/                    # Services singleton et composants layout
│   ├── components/         
│   │   ├── header/
│   │   └── navigation/
│   ├── services/           # Services globaux avec inject()
│   │   ├── data.service.ts
│   │   ├── translation.service.ts
│   │   ├── seo.service.ts
│   │   └── scroll-animation.service.ts
│   └── core.module.ts
├── shared/                  # Composants et utilitaires réutilisables  
│   ├── styles/
│   │   └── _variables.scss  # Variables SCSS centralisées
│   └── shared.module.ts     # Angular Material + utilitaires
├── features/               # Sections du portfolio
│   ├── about/ ├── technologies/ ├── projects/ 
│   ├── experience/ ├── certifications/ ├── faq/
│   └── features.module.ts
└── shared/animations/      # Animations Angular réutilisables
```

### 🛠️ Technologies

- **Frontend:** Angular 19.2, TypeScript 5.5, SCSS
- **UI Framework:** Angular Material avec thème custom
- **Architecture:** Standalone Components + Modules hybrides
- **State Management:** Angular Signals (moderne)
- **Injection:** inject() pattern (au lieu de constructors)
- **Build:** Angular CLI + optimisations Webpack
- **PWA:** Service Worker + cache strategies
- **Deployment:** GitHub Pages avec 404.html routing

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or later)
- npm (v9 or later)
- Angular CLI (`npm install -g @angular/cli`)

### Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/alderichoarau/alderichoarau.github.io.git
   cd alderichoarau.github.io
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```
   Navigate to `http://localhost:4200/` - the app will automatically reload when you change source files.

### Production Build & Test

**Build de production:**
```bash
npm run build
```

**Test local avec serveur HTTP:**
```bash
./test-local.sh
```
Ce script build le projet et lance un serveur sur `http://localhost:8080` pour tester la version de production.

**Build pour GitHub Pages:**
```bash
npm run build:gh-pages
```

### Code Quality

**ESLint & Prettier Setup:**
```bash
npm run lint             # Check code with ESLint
npm run lint:fix         # Auto-fix ESLint errors
npm run format           # Format code with Prettier
npm run format:check     # Check formatting
npm run check            # Run both lint and format check
```

**VS Code Integration:**
- ESLint extension automatically installed via workspace recommendations
- Auto-fix on save enabled
- Prettier formatting on save
- Angular Language Service support

## 📁 Project Structure

```
alderichoarau.github.io/
├── src/
│   ├── app/
│   │   ├── features/           # Feature modules (Skills, Experience, etc.)
│   │   ├── shared/             # Shared components and services
│   │   ├── app.component.*     # Root component
│   │   └── app.config.ts       # App configuration
│   ├── assets/
│   │   ├── i18n/              # Translation files (en.json, fr.json)
│   │   └── [images]           # Company logos and assets
│   └── styles.scss            # Global styles
├── .github/workflows/         # GitHub Actions for deployment
├── [build-files]             # Production build files for GitHub Pages
└── README.md                 # This file
```

## 🌐 Déploiement GitHub Pages

### Déploiement Automatique

Le site est déployé automatiquement via **GitHub Actions** :

1. **Push vers main** : Chaque push déclenche le workflow automatiquement
2. **Build** : GitHub Actions exécute `npm run build` avec ESLint
3. **Déploiement** : Les fichiers sont déployés sur GitHub Pages
4. **URL** : Disponible sur [https://alderichoarau.github.io](https://alderichoarau.github.io)

### Workflow GitHub Actions

Le fichier `.github/workflows/deploy.yml` contient :
- Installation des dépendances
- Vérification ESLint (non-bloquante)
- Build de production Angular
- Déploiement automatique sur GitHub Pages

### Test Local avant Déploiement

```bash
# Test complet avec serveur local
./test-local.sh

# Ou manuellement :
npm run build
cd docs/browser && python3 -m http.server 8080
```

### Résolution des Problèmes de Cache

Si les traductions ne s'affichent pas après déploiement :

1. **Attendre 2-5 minutes** pour la propagation GitHub Pages
2. **Vider le cache** : Ctrl+F5 (Windows) ou Cmd+Shift+R (Mac)
3. **Navigation privée** : Tester dans un onglet incognito
4. **Vérifier les traductions** : [https://alderichoarau.github.io/assets/i18n/fr.json](https://alderichoarau.github.io/assets/i18n/fr.json)
5. **Console développeur** : Vérifier les erreurs dans F12

## 🔧 Development

### Adding New Features

1. Create new feature components in `src/app/features/`
2. Add translations to `src/assets/i18n/en.json` and `fr.json`
3. Update the main app component to include the new feature
4. Test responsive design across different screen sizes

### Updating Translations

- English: `src/assets/i18n/en.json`
- French: `src/assets/i18n/fr.json`

The translation service automatically loads the appropriate language based on user selection.

### Customizing Styles

- Global styles: `src/styles.scss`
- Component styles: Individual `.scss` files per component
- Theme colors: Based on LinkedIn blue (#0077b5) with Material Design principles

## 📧 Contact

**Aldéric Hoarau**
- 📧 Email: contact@alderichoarau.com
- 💼 LinkedIn: [linkedin.com/in/alderichoarau](https://linkedin.com/in/alderichoarau)
- 🌐 Website: [alderichoarau.github.io](https://alderichoarau.github.io)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Built with ❤️ using Angular and Angular Material*
