# Aldéric Hoarau — Freelance Portfolio

[![Angular](https://img.shields.io/badge/Angular-21-red?style=for-the-badge&logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Tested%20with-Vitest-6E9F18?style=for-the-badge&logo=vitest)](https://vitest.dev/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-green?style=for-the-badge&logo=github)](https://pages.github.com/)
[![Deploy Status](https://github.com/alderichoarau/alderichoarau.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/alderichoarau/alderichoarau.github.io/actions/workflows/deploy.yml)

Freelance landing page built with Angular 21, deployed on GitHub Pages.

**🌐 Live site:** [https://alderichoarau.github.io](https://alderichoarau.github.io)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=alderichoarau_alderichoarau.github.io&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=alderichoarau_alderichoarau.github.io)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=alderichoarau_alderichoarau.github.io&metric=bugs)](https://sonarcloud.io/summary/new_code?id=alderichoarau_alderichoarau.github.io)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=alderichoarau_alderichoarau.github.io&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=alderichoarau_alderichoarau.github.io)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=alderichoarau_alderichoarau.github.io&metric=coverage)](https://sonarcloud.io/summary/new_code?id=alderichoarau_alderichoarau.github.io)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=alderichoarau_alderichoarau.github.io&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=alderichoarau_alderichoarau.github.io)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=alderichoarau_alderichoarau.github.io&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=alderichoarau_alderichoarau.github.io)

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Angular 21 — Standalone Components, Signals |
| UI | Angular Material 21 with custom dark theme |
| i18n | ngx-translate (FR / EN) |
| Testing | Vitest + @analogjs/vitest-angular + jsdom |
| Coverage | @vitest/coverage-v8 (lcov → SonarCloud) |
| Build | Angular CLI / esbuild |
| Quality | ESLint + Prettier + Husky pre-commit |
| CI/CD | GitHub Actions |
| Analysis | SonarCloud |

---

## Sections

| Section | Description |
|---------|-------------|
| **Hero** | Introduction, key stats, CTAs, social links |
| **Technologies** | Stack by category (Frontend, Backend, Cloud, etc.) |
| **Experience** | Timeline from 2015 to present |
| **Credentials** | Microsoft/Scrum certifications + languages |
| **References** | Client logos (infinite scroll carousel) |
| **FAQ** | 7 frequently asked questions about services |
| **Contact** | Email, LinkedIn, Malt, GitHub, Collective |

---

## Quick Start

**Requirements:** Node.js 22+, npm 10+

```bash
git clone https://github.com/alderichoarau/alderichoarau.github.io.git
cd alderichoarau.github.io
npm install
npm start
# → http://localhost:4200
```

---

## Scripts

```bash
# Development
npm start                # Development server
npm run build            # Standard build
npm run build:prod       # Production build

# Code quality
npm run lint             # ESLint check
npm run lint:fix         # ESLint with auto-fix
npm run format           # Prettier (write)
npm run format:check     # Prettier (check only)
npm run check            # lint + format:check

# Testing
npm run test             # Single run (Vitest)
npm run test:watch       # Watch mode
npm run test:coverage    # Tests + lcov coverage report
```

---

## Architecture

```
src/
├── app/
│   ├── core/
│   │   ├── components/     # Navigation, Footer
│   │   └── services/       # DataService, ScrollAnimationService,
│   │                       # SeoService, TranslationService
│   ├── features/
│   │   ├── about/          # Hero section
│   │   ├── technologies/   # Tech stack
│   │   ├── experience/     # Timeline
│   │   ├── certifications/ # Certifications + languages
│   │   ├── references/     # Client logos
│   │   ├── faq/            # FAQ accordion
│   │   └── contact/        # Contact
│   └── shared/
│       └── animations/     # Reusable Angular animations
├── assets/
│   └── i18n/               # fr.json, en.json
├── test-setup.ts           # Vitest setup (zone.js + TestBed)
└── styles.scss             # Global theme + CSS variables
```

---

## Testing

Tests run with **Vitest** + `@analogjs/vitest-angular` (jsdom — no browser required).

```bash
npm run test             # 145 tests, ~3s
npm run test:coverage    # Generates coverage/lcov.info
```

Coverage target: **80%** statements / functions / lines.

---

## CI/CD

### GitHub Actions Workflows

| File | Trigger | Role |
|------|---------|------|
| `deploy.yml` | Manual (`workflow_dispatch`) | Lint → Test → Build → Deploy to GitHub Pages |
| `sonar.yml` | Push to `main` + PR | Generate coverage → SonarCloud analysis |
| `dependency-review.yml` | Pull Request | Audit new dependencies |

### Deployment (`deploy.yml`)

1. Checkout code
2. `npm run lint` — ESLint check
3. `npm run test` — Vitest suite
4. `npm run build` — Angular build (esbuild)
5. Upload `docs/browser/` → GitHub Pages

### SonarCloud Analysis (`sonar.yml`)

1. Checkout with `fetch-depth: 0` (full Git history)
2. `npm run test:coverage` — generates `coverage/lcov.info`
3. SonarCloud scan using the lcov report

Sonar configuration is in `sonar-project.properties`.

---

## Code Quality

- **ESLint** + **angular-eslint** for TypeScript and templates
- **Prettier** for consistent formatting
- **Husky** pre-commit hook (lint-staged)
- **SonarCloud** for continuous static analysis

---

## Contact

**Aldéric Hoarau** — Cloud Consultant & DevOps Trainer

- 📧 [alderic.hoarau@gmail.com](mailto:alderic.hoarau@gmail.com)
- 💼 [linkedin.com/in/alderichoarau](https://linkedin.com/in/alderichoarau)
- 🔨 [malt.fr/profile/alderichoarau](https://www.malt.fr/profile/alderichoarau)
- 🌐 [alderichoarau.github.io](https://alderichoarau.github.io)
