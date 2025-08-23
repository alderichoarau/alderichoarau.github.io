// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navIcon = navToggle.querySelector('i');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Toggle hamburger/close icon
    if (navMenu.classList.contains('active')) {
        navIcon.classList.remove('fa-bars');
        navIcon.classList.add('fa-times');
    } else {
        navIcon.classList.remove('fa-times');
        navIcon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navIcon.classList.remove('fa-times');
        navIcon.classList.add('fa-bars');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 4px 25px rgba(0, 0, 0, 0.15)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Translation System
let currentLanguage = localStorage.getItem('language') || 'en';

// Embedded translations to avoid CORS issues
const translations = {
    en: {
        nav: {
            about: "About",
            skills: "Skills",
            experience: "Experience",
            certifications: "Certifications",
            references: "References",
            contact: "Contact",
            getInTouch: "Get In Touch"
        },
        header: {
            name: "Aldéric Hoarau",
            subtitle: "Developer, Cloud & DevSecOps Freelancer"
        },
        about: {
            title: "About",
            text: "Cloud-ready developer & consultant with +10 years of experience in modernization, cost optimization and infrastructure security. Committed agilist, I believe in more human & responsible technology."
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
        contact: {
            title: "Contact",
            sendEmail: "Send Email",
            linkedin: "LinkedIn",
            github: "GitHub"
        },
        footer: {
            copyright: "© 2024 Aldéric Hoarau. All rights reserved."
        }
    },
    fr: {
        nav: {
            about: "À propos",
            skills: "Compétences",
            experience: "Expérience",
            certifications: "Certifications",
            references: "Références",
            contact: "Contact",
            getInTouch: "Me contacter"
        },
        header: {
            name: "Aldéric Hoarau",
            subtitle: "Développeur, Cloud & DevSecOps Freelance"
        },
        about: {
            title: "À propos",
            text: "Développeur et consultant cloud avec +10 ans d'expérience en modernisation, optimisation des coûts et sécurité d'infrastructure. Agiliste engagé, je crois en une technologie plus humaine et responsable."
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
        contact: {
            title: "Contact",
            sendEmail: "Envoyer un email",
            linkedin: "LinkedIn",
            github: "GitHub"
        },
        footer: {
            copyright: "© 2024 Aldéric Hoarau. Tous droits réservés."
        }
    }
};

// Initialize translations immediately
function initTranslations() {
    console.log('Initializing translations...');
    applyTranslations(currentLanguage);
    setupLanguageSwitcher();
}

// Get nested translation value
function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current && current[key], obj);
}

// Apply translations to all elements
function applyTranslations(lang) {
    console.log('Applying translations for:', lang);
    
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update all elements with data-translate
    const elements = document.querySelectorAll('[data-translate]');
    console.log('Found elements to translate:', elements.length);
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        console.log('Translating key:', key);
        
        if (translations[lang] && key) {
            const translation = getNestedValue(translations[lang], key);
            if (translation) {
                element.textContent = translation;
                console.log('Translated:', key, '->', translation);
            } else {
                console.warn('Translation not found for key:', key, 'in language:', lang);
            }
        }
    });
    
    // Update language switcher buttons
    updateLanguageSwitcher();
    
    // Update page title
    if (translations[lang] && translations[lang].header && translations[lang].header.subtitle) {
        document.title = `Aldéric Hoarau - ${translations[lang].header.subtitle}`;
    }
}

// Setup language switcher event listeners
function setupLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    console.log('Setting up language switcher, found buttons:', langButtons.length);
    
    langButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = button.getAttribute('data-lang');
            console.log('Language button clicked:', lang);
            applyTranslations(lang);
        });
    });
    
    // Set initial active state
    updateLanguageSwitcher();
}

// Update language switcher active state
function updateLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        const lang = button.getAttribute('data-lang');
        if (lang === currentLanguage) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Initialize translation system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing translations...');
    initTranslations();
});
