# 🚀 Aldéric Hoarau - Portfolio

[![Angular](https://img.shields.io/badge/Angular-20-red?style=for-the-badge&logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-green?style=for-the-badge&logo=github)](https://pages.github.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-purple?style=for-the-badge)](https://web.dev/progressive-web-apps/)

A professional portfolio built with Angular 20 and deployed on GitHub Pages. Architected following Angular best practices with clean, performant, and accessible code.

**🌐 Live Website:** [https://alderichoarau.github.io](https://alderichoarau.github.io)

## ✨ Features

- 🌟 **Modern Angular 20** with signals and standalone components
- 🎨 **Angular Material** with custom LinkedIn-inspired theme
- 🌐 **Internationalization** (FR/EN) using ngx-translate
- 📱 **Fully Responsive** and mobile-first design
- ♿ **Accessible** (ARIA labels, keyboard navigation, contrast)
- 🔍 **SEO Optimized** (meta tags, Open Graph, JSON-LD)
- ⚡ **High Performance** (lazy loading, PWA, optimizations)
- 🎭 **Smooth Animations** with Angular Animations API
- 🧪 **Clean Architecture** (Core/Shared/Features modules)
- 🔠 **Clean Code** (ESLint, Prettier, modern inject() pattern)

## 🏗️ Architecture & Tech Stack

### Project Structure
```
src/app/
├── core/                    # Singleton services and layout components
│   ├── components/          # Header, navigation
│   ├── services/           # Global services using inject()
│   └── core.module.ts
├── shared/                  # Reusable components and utilities
│   ├── animations/         # Reusable Angular animations
│   └── shared.module.ts     # Angular Material + utilities
├── features/               # Portfolio sections
│   ├── about/ ├── technologies/ ├── projects/
│   ├── experience/ ├── certifications/ ├── references/
│   └── features.module.ts
└── styles.scss             # Global styles and variables
```

### Tech Stack
- **Frontend:** Angular 20, TypeScript 5.9, SCSS
- **UI Library:** Angular Material with custom theme
- **Architecture:** Standalone Components + Feature modules
- **State Management:** Angular Signals (modern approach)
- **Dependency Injection:** Modern inject() function pattern
- **Build Tools:** Angular CLI with Webpack optimizations
- **PWA:** Service Worker with intelligent caching strategies
- **Deployment:** GitHub Pages with SPA routing support
- **Code Quality:** ESLint + Prettier + Husky pre-commit hooks

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- npm 10+
- Angular CLI: `npm install -g @angular/cli`

### Development

```bash
# Clone and setup
git clone https://github.com/alderichoarau/alderichoarau.github.io.git
cd alderichoarau.github.io
npm install

# Start development server
npm start
```

Navigate to `http://localhost:4200/` - auto-reloads on file changes.

### Build & Test

```bash
# Production build
npm run build

# Test production build locally
npm run build

# Build for GitHub Pages
npm run build:gh-pages
```

## 🛠️ Code Quality

```bash
# Linting and formatting
npm run lint             # Check code with ESLint
npm run lint:fix         # Auto-fix ESLint errors
npm run format           # Format code with Prettier
npm run format:check     # Check formatting
npm run check            # Run both lint and format check
npm run quality-gate     # Full quality check (lint+test+build)

# Testing
npm run test             # Run tests (headless)
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report

# Accessibility
npm run a11y            # Run accessibility tests (requires running server)

# Security
npm run security:audit  # Check for security vulnerabilities
```

### Git Hooks (Husky)

- **Pre-commit**: Lint-staged + Tests + Production build
- **Post-commit**: Deployment reminders

### VS Code Integration

- ESLint + Prettier auto-fix on save
- Angular Language Service
- Workspace recommendations for extensions

## 📁 Complete Project Structure

```
alderichoarau.github.io/
├── src/
│   ├── app/                # Angular application
│   │   ├── features/       # Feature modules
│   │   ├── shared/         # Shared components and services
│   │   └── core/           # Core services and layout
│   ├── assets/
│   │   ├── i18n/          # Translation files (en.json, fr.json)
│   │   └── images/        # Company logos and assets
│   └── styles.scss        # Global styles
├── docs/                  # Production build (GitHub Pages)
├── .github/
│   ├── workflows/         # GitHub Actions CI/CD
│   │   ├── deploy.yml     # Main deployment workflow
│   │   ├── pr-checks.yml  # PR quality checks
│   │   └── security.yml   # Security audit
│   └── dependabot.yml     # Dependabot configuration
├── .husky/                # Git hooks (pre-commit)
└── README.md             # This file
```

## 🌐 CI/CD & Deployment

### 🚀 Automatic Deployment

The project uses **GitHub Actions** for automated deployment:

[![Deploy Status](https://github.com/alderichoarau/alderichoarau.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/alderichoarau/alderichoarau.github.io/actions/workflows/deploy.yml)
[![PR Checks](https://github.com/alderichoarau/alderichoarau.github.io/actions/workflows/pr-checks.yml/badge.svg)](https://github.com/alderichoarau/alderichoarau.github.io/actions/workflows/pr-checks.yml)
[![Security](https://github.com/alderichoarau/alderichoarau.github.io/actions/workflows/security.yml/badge.svg)](https://github.com/alderichoarau/alderichoarau.github.io/actions/workflows/security.yml)

1. **Push to main** → Automatic trigger
2. **Quality checks** → Format, lint, tests with coverage
3. **Production build** → `npm run build:prod`
4. **Deploy** → Automatic GitHub Pages deployment
5. **Live** → Available at [https://alderichoarau.github.io](https://alderichoarau.github.io)

### 🔄 GitHub Actions Workflows

#### 1. **Deploy Workflow** (`.github/workflows/deploy.yml`)
- **Triggers**: Manual dispatch only (`workflow_dispatch`)
- **Quality Checks**:
  - Dependencies installation with npm cache
  - ESLint linting (`npm run lint`)
  - Tests (`npm run test`)
  - Standard build (`npm run build`)
- **Deployment**: Direct to GitHub Pages

#### 2. **PR Quality Checks** (`.github/workflows/pr-checks.yml`)
- **Triggers**: Pull Requests to `main`
- **Complete validation** without deployment
- **Automatic PR comments** with status results
- **Protection**: Prevents unwanted deployments

#### 3. **Security Checks** (`.github/workflows/security.yml`)
- **Schedule**: Every Monday at 9:00 AM UTC
- **Security audit**: `npm audit` and vulnerability scanning
- **Automatic alerts**: Creates issues when problems are found
- **Labels**: `security`, `dependencies` for easy management

### 📊 Dependabot Configuration

Automated configuration in `.github/dependabot.yml`:

- **Weekly updates**: Every Monday at 8:00 AM
- **Smart grouping**:
  - Angular Core (major/minor versions separated)
  - Angular Material & CDK
  - Development tools (ESLint, Prettier)
  - Testing dependencies (Jasmine, Karma)
  - GitHub Actions
- **Automated management**: 10 PRs max, automatic labels
- **Review**: `@alderichoarau` automatically assigned

### ⚡ Performance Optimizations

- **npm cache**: Dependency reuse between builds
- **Build cache**: Faster successive deployments
- **Conditional builds**: Deployment only on `main`
- **Parallel tests**: Optimized verification execution

### 🛠️ Deployment Troubleshooting

If translations don't appear after deployment:

1. **Wait 2-5 minutes** for GitHub Pages propagation
2. **Clear cache**: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
3. **Private browsing**: Test in incognito tab
4. **Check translations**: [assets/i18n/fr.json](https://alderichoarau.github.io/assets/i18n/fr.json)
5. **Developer console**: Check for errors in F12
6. **GitHub Actions**: Check workflow status

## 🔧 Development Guide

### Adding New Features

1. Create feature components in `src/app/features/`
2. Add translations to `src/assets/i18n/en.json` and `fr.json`
3. Update main app component to include the new feature
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

_Built with ❤️ using Angular and Angular Material_
