# Aldéric Hoarau — Portfolio Freelance

[![Angular](https://img.shields.io/badge/Angular-21-red?style=for-the-badge&logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Tested%20with-Vitest-6E9F18?style=for-the-badge&logo=vitest)](https://vitest.dev/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-green?style=for-the-badge&logo=github)](https://pages.github.com/)
[![Deploy Status](https://github.com/alderichoarau/alderichoarau.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/alderichoarau/alderichoarau.github.io/actions/workflows/deploy.yml)

Landing page freelance construite avec Angular 21, déployée sur GitHub Pages.

**🌐 Site live :** [https://alderichoarau.github.io](https://alderichoarau.github.io)

---

## Stack technique

| Catégorie  | Technologie                                 |
| ---------- | ------------------------------------------- |
| Framework  | Angular 21 — Standalone Components, Signals |
| UI         | Angular Material 21 avec thème dark custom  |
| i18n       | ngx-translate (FR / EN)                     |
| Tests      | Vitest + @analogjs/vitest-angular + jsdom   |
| Couverture | @vitest/coverage-v8 (lcov → SonarCloud)     |
| Build      | Angular CLI / esbuild                       |
| Qualité    | ESLint + Prettier + Husky pre-commit        |
| CI/CD      | GitHub Actions                              |
| Analyse    | SonarCloud                                  |

---

## Sections du portfolio

| Section          | Description                                          |
| ---------------- | ---------------------------------------------------- |
| **Hero**         | Présentation, stats clés, CTAs, liens sociaux        |
| **Technologies** | Stack par catégorie (Frontend, Backend, Cloud, etc.) |
| **Expérience**   | Timeline de 2015 à aujourd'hui                       |
| **Crédentiels**  | Certifications Microsoft/Scrum + langues             |
| **Références**   | Logos clients (carousel défilant)                    |
| **FAQ**          | 7 questions fréquentes sur les services              |
| **Contact**      | Email, LinkedIn, Malt, GitHub, Collective            |

---

## Démarrage rapide

**Prérequis :** Node.js 24+, npm 11+

```bash
git clone https://github.com/alderichoarau/alderichoarau.github.io.git
cd alderichoarau.github.io
npm install
npm start
# → http://localhost:4200
```

---

## Scripts disponibles

```bash
# Développement
npm start                # Serveur de développement
npm run build            # Build standard
npm run build:prod       # Build production

# Qualité de code
npm run lint             # ESLint
npm run lint:fix         # ESLint avec auto-fix
npm run format           # Prettier (écriture)
npm run format:check     # Prettier (vérification)
npm run check            # lint + format:check

# Tests
npm run test             # Tests (single run, Vitest)
npm run test:watch       # Tests en mode watch
npm run test:coverage    # Tests + rapport de couverture lcov
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
│   │   ├── about/          # Section Hero
│   │   ├── technologies/   # Stack technique
│   │   ├── experience/     # Timeline
│   │   ├── certifications/ # Certifications + langues
│   │   ├── references/     # Logos clients
│   │   ├── faq/            # FAQ accordion
│   │   └── contact/        # Contact
│   └── shared/
│       └── animations/     # Animations Angular réutilisables
├── assets/
│   └── i18n/               # fr.json, en.json
├── test-setup.ts           # Setup Vitest (zone.js + TestBed)
└── styles.scss             # Thème global + variables CSS
```

---

## Tests

Les tests tournent avec **Vitest** + `@analogjs/vitest-angular` (jsdom, pas de navigateur nécessaire).

```bash
npm run test             # 145 tests, ~3s
npm run test:coverage    # Génère coverage/lcov.info
```

Couverture cible : **80%** statements / functions / lines.

---

## CI/CD

### Workflows GitHub Actions

| Fichier                 | Déclencheur                  | Rôle                                      |
| ----------------------- | ---------------------------- | ----------------------------------------- |
| `deploy.yml`            | Manuel (`workflow_dispatch`) | Lint → Test → Build → Deploy GitHub Pages |
| `sonar.yml`             | Push `main` + PR             | Génère couverture → Analyse SonarCloud    |
| `dependency-review.yml` | Pull Request                 | Audit des nouvelles dépendances           |

### Déploiement (`deploy.yml`)

1. Checkout du code
2. `npm run lint` — vérification ESLint
3. `npm run test` — suite Vitest
4. `npm run build` — build Angular (esbuild)
5. Upload de `docs/browser/` → GitHub Pages

### Analyse SonarCloud (`sonar.yml`)

1. Checkout avec `fetch-depth: 0` (historique Git complet)
2. `npm run test:coverage` — génère `coverage/lcov.info`
3. Scan SonarCloud avec le rapport lcov

La configuration Sonar est dans `sonar-project.properties`.

---

## Qualité de code

- **ESLint** + **angular-eslint** pour TypeScript et templates
- **Prettier** pour le formatage
- **Husky** : hook pre-commit (lint-staged)
- **SonarCloud** : analyse statique continue

---

## Contact

**Aldéric Hoarau** — Consultant Cloud & Formateur DevOps Freelance

- 📧 [alderic.hoarau@gmail.com](mailto:alderic.hoarau@gmail.com)
- 💼 [linkedin.com/in/alderichoarau](https://linkedin.com/in/alderichoarau)
- 🔨 [malt.fr/profile/alderichoarau](https://www.malt.fr/profile/alderichoarau)
- 🌐 [alderichoarau.github.io](https://alderichoarau.github.io)
