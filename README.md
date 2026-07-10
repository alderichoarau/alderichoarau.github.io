# Aldéric Hoarau — Freelance Portfolio

[![Angular](https://img.shields.io/badge/Angular-22-red?style=for-the-badge&logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
![NPM](https://img.shields.io/badge/npm-DD0031?style=for-the-badge&logo=npm&logoColor=white)
[![Vitest](https://img.shields.io/badge/Tested%20with-Vitest-6E9F18?style=for-the-badge&logo=vitest)](https://vitest.dev/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-green?style=for-the-badge&logo=github)](https://pages.github.com/)
[![Deploy Status](https://github.com/alderichoarau/alderichoarau.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/alderichoarau/alderichoarau.github.io/actions/workflows/deploy.yml)
[![CI](https://github.com/alderichoarau/alderichoarau.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/alderichoarau/alderichoarau.github.io/actions/workflows/ci.yml)
[![GitHub - Sonar Cloud Analysis](https://github.com/alderichoarau/alderichoarau.github.io/actions/workflows/sonar.yml/badge.svg)](https://github.com/alderichoarau/alderichoarau.github.io/actions/workflows/sonar.yml)

Freelance landing page built with Angular 22, deployed on GitHub Pages.

**🌐 Live site:** [https://alderichoarau.github.io](https://alderichoarau.github.io)

[![CodeQL](https://github.com/alderichoarau/alderichoarau.github.io/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/alderichoarau/alderichoarau.github.io/actions/workflows/github-code-scanning/codeql)
[![Dependency Review](https://github.com/alderichoarau/alderichoarau.github.io/actions/workflows/dependency-review.yml/badge.svg)](https://github.com/alderichoarau/alderichoarau.github.io/actions/workflows/dependency-review.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=alderichoarau_alderichoarau.github.io&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=alderichoarau_alderichoarau.github.io)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=alderichoarau_alderichoarau.github.io&metric=bugs)](https://sonarcloud.io/summary/new_code?id=alderichoarau_alderichoarau.github.io)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=alderichoarau_alderichoarau.github.io&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=alderichoarau_alderichoarau.github.io)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=alderichoarau_alderichoarau.github.io&metric=coverage)](https://sonarcloud.io/summary/new_code?id=alderichoarau_alderichoarau.github.io)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=alderichoarau_alderichoarau.github.io&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=alderichoarau_alderichoarau.github.io)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=alderichoarau_alderichoarau.github.io&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=alderichoarau_alderichoarau.github.io)

---

## Tech Stack

| Category  | Technology                                  |
| --------- | ------------------------------------------- |
| Framework | Angular 22 — Standalone Components, Signals |
| UI        | Angular Material 22 with custom dark theme  |
| i18n      | ngx-translate (FR / EN)                     |
| Testing   | Vitest + @analogjs/vitest-angular + jsdom   |
| Coverage  | @vitest/coverage-v8 (lcov → SonarCloud)     |
| Build     | Angular CLI / esbuild                       |
| Quality   | ESLint + Prettier + Husky pre-commit        |
| CI/CD     | GitHub Actions                              |
| Analysis  | SonarCloud                                  |

---

## Sections

| Section          | Description                                        |
| ---------------- | -------------------------------------------------- |
| **Hero**         | Introduction, key stats, CTAs, social links        |
| **Technologies** | Stack by category (Frontend, Backend, Cloud, etc.) |
| **Experience**   | Timeline from 2015 to present                      |
| **Credentials**  | Microsoft/Scrum certifications + languages         |
| **References**   | Client logos (infinite scroll carousel)            |
| **FAQ**          | 7 frequently asked questions about services        |
| **Contact**      | Email, LinkedIn, Malt, GitHub, Collective          |

---

## Quick Start

**Requirements:** Node.js 24+, npm 11+

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
npm run test             # 151 tests, ~3s
npm run test:coverage    # Generates coverage/lcov.info
```

Coverage target: **80%** statements / functions / lines.

---

## CI/CD

### GitHub Actions Workflows

| File                    | Trigger                      | Role                                         |
| ----------------------- | ---------------------------- | -------------------------------------------- |
| `ci.yml`                | PR + push to `main` + manual | Lint → Format check → Test → Build (gate)    |
| `deploy.yml`            | Manual (`workflow_dispatch`) | Lint → Test → Build → Deploy to GitHub Pages |
| `sonar.yml`             | Push to `main` + PR + manual | Generate coverage → SonarCloud analysis      |
| `dependency-review.yml` | Pull Request                 | Audit new dependencies                       |
| `release-prepare.yml`   | Manual (`workflow_dispatch`) | Bump version, open the release PR            |
| `release-publish.yml`   | Release PR merged            | Create the git tag + GitHub release          |

### Deployment (`deploy.yml`)

Triggered manually via `workflow_dispatch`, or dispatched by `release-publish.yml` right after it creates a release, via `gh workflow run deploy.yml --ref <tag>` (a release created with `GITHUB_TOKEN` doesn't emit an event other workflows can react to, so a `release: published` trigger wouldn't fire here). Deploys the exact commit pointed to by the release's tag.

1. Checkout code
2. `npm run lint` — ESLint check
3. `npm run test` — Vitest suite
4. `npm run build` — Angular build (esbuild)
5. Upload `docs/browser/` → GitHub Pages

### SonarCloud Analysis (`sonar.yml`)

1. Checkout code
2. `npm run test:coverage` — generates `coverage/lcov.info`
3. SonarCloud scan using the lcov report

Sonar configuration is in `sonar-project.properties`.

### Release (`release-prepare.yml` + `release-publish.yml`)

`main` is a protected branch, so the release is a two-step process:

1. **Prepare** — manually trigger `release-prepare.yml` from the **Actions** tab with a `tag_name` input (e.g. `v2.1.0`). It bumps `package.json` / `package-lock.json`, pushes a `release/<tag_name>` branch, and opens a PR into `main`.
2. **Publish** — once that PR is reviewed and merged, `release-publish.yml` fires automatically: it creates and pushes the `<tag_name>` tag on the merge commit, then creates the matching GitHub release with auto-generated notes.

Publishing the release automatically triggers `deploy.yml`, so merging the release PR is the standard way to ship to production.

---

## Code Quality

- **ESLint** + **angular-eslint** for TypeScript and templates
- **Prettier** for consistent formatting
- **Husky** pre-commit hook (lint-staged)
- **SonarCloud** for continuous static analysis

---

## License

© 2026 Aldéric Hoarau. All rights reserved. This repository is public for
viewing purposes only — see [LICENSE](./LICENSE). External contributions are
not accepted, see [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## Contact

**Aldéric Hoarau** — Cloud Consultant & DevOps Trainer

- 📧 [alderic.hoarau@gmail.com](mailto:alderic.hoarau@gmail.com)
- 💼 [linkedin.com/in/alderichoarau](https://linkedin.com/in/alderichoarau)
- 🔨 [malt.fr/profile/alderichoarau](https://www.malt.fr/profile/alderichoarau)
- 🌐 [alderichoarau.github.io](https://alderichoarau.github.io)
