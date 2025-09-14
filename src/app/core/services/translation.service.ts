import { Injectable, signal, computed } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  // Angular 18 Signals - Modern reactive state management
  private readonly currentLangSignal = signal<string>('en');
  public readonly currentLang = this.currentLangSignal.asReadonly();
  
  // Computed signal for translations based on current language
  public readonly isEnglish = computed(() => this.currentLangSignal() === 'en');
  public readonly isFrench = computed(() => this.currentLangSignal() === 'fr');

  // Embedded translations
  private translations = {
    en: {
      nav: {
        about: "About",
        technologies: "Technologies",
        projects: "Projects",
        experience: "Experience",
        certifications: "Certifications",
        faq: "FAQ",
        contact: "Contact",
        getInTouch: "Get In Touch",
        language: "Language",
        french: "French",
        english: "English"
      },
      header: {
        name: "Aldéric Hoarau",
        subtitle: "Developer, Cloud & DevSecOps Freelancer"
      },
      about: {
        title: "About",
        text: "Cloud-ready developer & consultant with +10 years of experience in modernization, cost optimization and infrastructure security. Committed agilist, I believe in more human & responsible technology.",
        yearsExperience: "Years Experience",
        projectsCompleted: "Projects Completed",
        costReduction: "Cost Reduction",
        keyAreas: "Key Areas of Expertise"
      },
      technologies: {
        title: "Technologies & Stack",
        subtitle: "Modern tools and frameworks I work with to build scalable solutions",
        all: "All Technologies",
        frontend: "Frontend",
        backend: "Backend",
        cloud: "Cloud & DevOps",
        databases: "Databases",
        tools: "Development Tools",
        levels: {
          expert: "Expert",
          advanced: "Advanced",
          intermediate: "Intermediate"
        }
      },
      projects: {
        title: "Featured Projects",
        subtitle: "A selection of projects I've worked on recently",
        viewProject: "View Project",
        liveDemo: "Live Demo",
        sourceCode: "Source Code",
        featured: "Featured",
        allProjects: "All Projects"
      },
      skills: {
        title: "Key Skills",
        cloudDevSecOps: "Cloud & DevSecOps",
        cloudDevSecOpsDesc: "Azure, CI/CD, Terraform, GitHub Actions, Azure DevOps",
        finOps: "FinOps & Optimization",
        finOpsDesc: "Cloud cost optimization and budget management",
        architecture: "Architecture & Security",
        architectureDesc: "Azure AD, Defender, Security Center",
        agility: "Agility & Facilitation",
        agilityDesc: "Scrum, Kanban, Team Coaching"
      },
      experience: {
        title: "Recent Experience",
        freelance: "Freelance – Cloud Consultant",
        freelancePeriod: "2023 - Present",
        freelanceDesc: "Migration of +20 applications with 10x cost reduction. Specialization in cloud architecture and financial optimization.",
        inetum: "Inetum – Java, DevOps & Cloud Consultant",
        inetumPeriod: "2021 - 2023",
        inetumDesc: "Supporting clients in their digital transformation and migration to Azure cloud.",
        gfi: "Gfi World – Full Stack Developer & Agile Facilitator",
        gfiPeriod: "2018 - 2020",
        gfiDesc: "Web application development and facilitation of agile transformation for teams."
      },
      certifications: {
        title: "Certifications",
        psm1: "Professional Scrum Master 1",
        az204: "AZ-204: Developing Solutions for Microsoft Azure",
        az104: "AZ-104: Azure Administrator",
        pl300: "PL-300: Power BI Data Analyst",
        planned: "planned 2025"
      },
      languages: {
        title: "Languages",
        french: "French & Réunion Creole",
        english: "English",
        spanish: "Spanish",
        native: "Native",
        professional: "Professional",
        elementary: "Elementary"
      },
      references: {
        title: "Trusted by"
      },
      faq: {
        title: "Frequently Asked Questions",
        subtitle: "Frequently asked questions about my services and working methods",
        categories: {
          all: "All",
          services: "Services",
          process: "Process",
          security: "Security",
          pricing: "Pricing"
        },
        q1: "What types of cloud projects do you handle?",
        a1: "I work on the design, development and deployment of cloud-native applications, cloud migration, optimization of existing infrastructures (AWS, Azure, GCP) as well as automation via CI/CD and Infrastructure as Code (Terraform, Ansible, etc.).",
        q2: "How does a typical mission work with you?",
        a2: "After an initial exchange to understand your needs, I propose a technical roadmap. Then, we move forward in clear stages: framing, implementation, testing, delivery, and skills transfer if necessary.",
        q3: "Can you intervene in emergencies?",
        a3: "Yes, I can quickly intervene on critical incidents or specific needs (breakdowns, deployment issues, urgent optimization). Conditions are adapted according to urgency.",
        q4: "How do you ensure the security of my data and infrastructure?",
        a4: "I implement cloud security best practices: fine-grained access management (IAM), data encryption, log monitoring, and DevSecOps best practices.",
        q5: "Do you work independently or in collaboration with an internal team?",
        a5: "Both are possible. I can work completely independently or integrate with an existing team (developers, ops, project managers) using your communication and management tools.",
        q6: "How does billing work?",
        a6: "I charge either fixed-price (per project) or time-spent (daily rate). A clear quote is provided before each mission, with possibility of scheduling according to progress.",
        q7: "Is it possible to plan maintenance or follow-up after the mission?",
        a7: "Yes, I offer support and maintenance packages to ensure stability, performance and regular updates of your cloud environments.",
        q8: "Do you work only remotely or also on-site?",
        a8: "I prefer remote work for more flexibility, but I can also work on-site depending on your needs and location."
      },
      contact: {
        title: "Contact",
        subtitle: "Let's discuss your project and needs",
        sendEmail: "Send Email",
        linkedin: "LinkedIn",
        github: "GitHub",
        malt: "Malt"
      },
      footer: {
        copyright: "© 2025 Aldéric Hoarau. All rights reserved."
      }
    },
    fr: {
      nav: {
        about: "À propos",
        technologies: "Technologies",
        projects: "Projets",
        experience: "Expérience",
        certifications: "Certifications",
        faq: "FAQ",
        contact: "Contact",
        getInTouch: "Me contacter",
        language: "Langue",
        french: "Français",
        english: "Anglais"
      },
      header: {
        name: "Aldéric Hoarau",
        subtitle: "Développeur, Cloud & DevSecOps Freelance"
      },
      about: {
        title: "À propos",
        text: "Développeur et consultant cloud avec +10 ans d'expérience en modernisation, optimisation des coûts et sécurité d'infrastructure. Agiliste engagé, je crois en une technologie plus humaine et responsable.",
        yearsExperience: "Années d'expérience",
        projectsCompleted: "Projets réalisés",
        costReduction: "Réduction des coûts",
        keyAreas: "Domaines d'expertise clés"
      },
      technologies: {
        title: "Technologies & Stack",
        subtitle: "Outils modernes et frameworks que j'utilise pour construire des solutions évolutives",
        all: "Toutes les technologies",
        frontend: "Frontend",
        backend: "Backend",
        cloud: "Cloud & DevOps",
        databases: "Bases de données",
        tools: "Outils de développement",
        levels: {
          expert: "Expert",
          advanced: "Avancé",
          intermediate: "Intermédiaire"
        }
      },
      projects: {
        title: "Projets Vedettes",
        subtitle: "Une sélection de projets sur lesquels j'ai travaillé récemment",
        viewProject: "Voir le projet",
        liveDemo: "Démo live",
        sourceCode: "Code source",
        featured: "Vedette",
        allProjects: "Tous les projets"
      },
      skills: {
        title: "Compétences clés",
        cloudDevSecOps: "Cloud & DevSecOps",
        cloudDevSecOpsDesc: "Azure, CI/CD, Terraform, GitHub Actions, Azure DevOps",
        finOps: "FinOps & Optimisation",
        finOpsDesc: "Optimisation des coûts cloud et gestion budgétaire",
        architecture: "Architecture & Sécurité",
        architectureDesc: "Azure AD, Defender, Security Center",
        agility: "Agilité & Facilitation",
        agilityDesc: "Scrum, Kanban, Coaching d'équipe"
      },
      experience: {
        title: "Expérience récente",
        freelance: "Freelance – Consultant Cloud",
        freelancePeriod: "2023 - Présent",
        freelanceDesc: "Migration de +20 applications avec réduction des coûts x10. Spécialisation en architecture cloud et optimisation financière.",
        inetum: "Inetum – Consultant Java, DevOps & Cloud",
        inetumPeriod: "2021 - 2023",
        inetumDesc: "Accompagnement des clients dans leur transformation digitale et migration vers le cloud Azure.",
        gfi: "Gfi World – Développeur Full Stack & Facilitateur Agile",
        gfiPeriod: "2018 - 2020",
        gfiDesc: "Développement d'applications web et facilitation de transformation agile pour les équipes."
      },
      certifications: {
        title: "Certifications",
        psm1: "Professional Scrum Master 1",
        az204: "AZ-204: Développement de solutions pour Microsoft Azure",
        az104: "AZ-104: Administrateur Azure",
        pl300: "PL-300: Analyste de données Power BI",
        planned: "prévu 2025"
      },
      languages: {
        title: "Langues",
        french: "Français & Créole réunionnais",
        english: "Anglais",
        spanish: "Espagnol",
        native: "Natif",
        professional: "Professionnel",
        elementary: "Élémentaire"
      },
      references: {
        title: "Ils m'ont fait confiance"
      },
      faq: {
        title: "Questions Fréquentes",
        subtitle: "Questions fréquemment posées sur mes services et méthodes de travail",
        categories: {
          all: "Toutes",
          services: "Services",
          process: "Processus",
          security: "Sécurité",
          pricing: "Tarification"
        },
        q1: "Quels types de projets cloud prenez-vous en charge ?",
        a1: "J'interviens sur la conception, le développement et le déploiement d'applications cloud-native, la migration vers le cloud, l'optimisation des infrastructures existantes (AWS, Azure, GCP) ainsi que l'automatisation via CI/CD et Infrastructure as Code (Terraform, Ansible, etc.).",
        q2: "Comment se déroule une mission type avec vous ?",
        a2: "Après un premier échange pour comprendre vos besoins, je propose une feuille de route technique. Ensuite, nous avançons par étapes claires : cadrage, mise en place, tests, livraison, puis transfert de compétences si nécessaire.",
        q3: "Pouvez-vous intervenir en urgence ?",
        a3: "Oui, je peux intervenir rapidement sur des incidents critiques ou des besoins ponctuels (pannes, problèmes de déploiement, optimisation urgente). Les conditions sont adaptées selon l'urgence.",
        q4: "Comment assurez-vous la sécurité de mes données et de mon infrastructure ?",
        a4: "Je mets en place les bonnes pratiques de sécurité cloud : gestion fine des accès (IAM), chiffrement des données, monitoring des logs et bonnes pratiques DevSecOps.",
        q5: "Travaillez-vous en autonomie ou en collaboration avec une équipe interne ?",
        a5: "Les deux sont possibles. Je peux travailler en totale autonomie ou bien m'intégrer à une équipe existante (développeurs, ops, chefs de projet) en utilisant vos outils de communication et gestion.",
        q6: "Comment fonctionne la facturation ?",
        a6: "Je facture au forfait (par projet) ou au temps passé (TJM – Taux Journalier Moyen). Un devis clair est proposé avant chaque mission, avec possibilité d'échelonnement selon l'avancement.",
        q7: "Est-il possible de prévoir une maintenance ou un suivi après la mission ?",
        a7: "Oui, je propose des forfaits de support et de maintenance afin de garantir la stabilité, la performance et la mise à jour régulière de vos environnements cloud.",
        q8: "Travaillez-vous uniquement en remote ou aussi sur site ?",
        a8: "Je privilégie le travail à distance pour plus de flexibilité, mais je peux aussi intervenir sur site en fonction de vos besoins et de votre localisation."
      },
      contact: {
        title: "Contact",
        subtitle: "Discutons de votre projet et de vos besoins",
        sendEmail: "Envoyer un email",
        linkedin: "LinkedIn",
        github: "GitHub",
        malt: "Malt"
      },
      footer: {
        copyright: "© 2024 Aldéric Hoarau. Tous droits réservés."
      }
    }
  };

  constructor(private translate: TranslateService) {
    // Set translations
    this.translate.setTranslation('en', this.translations.en);
    this.translate.setTranslation('fr', this.translations.fr);
    
    // Set default language
    this.translate.setDefaultLang('fr'); // Default to French
    
    // Get saved language from localStorage or default to 'fr'
    if (typeof localStorage !== 'undefined') {
      const savedLang = localStorage.getItem('language') || 'fr';
      this.setLanguage(savedLang);
    } else {
      this.setLanguage('fr');
    }
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLangSignal.set(lang);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('language', lang);
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }

  getCurrentLanguage(): string {
    return this.currentLangSignal();
  }

  getTranslation(key: string): string {
    return this.translate.instant(key);
  }
}
