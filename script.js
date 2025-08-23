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
        faq: {
            title: "FAQ",
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
        faq: {
            title: "FAQ",
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
        
        if (translations[lang] && key) {
            const translation = getNestedValue(translations[lang], key);
            if (translation) {
                element.textContent = translation;
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

// Function to update active menu item based on scroll position
function updateActiveMenuItem() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    const scrollPosition = window.scrollY + 200; // Adding offset for better accuracy

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Special case for when we're at the top of the page
    if (scrollPosition < 200) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#home') {
                link.classList.add('active');
            }
        });
    }
}

// Initialize translation system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing translations...');
    initTranslations();
    
    // Initial call to set active menu item
    updateActiveMenuItem();
    
    // Add scroll event listener for active menu item
    window.addEventListener('scroll', updateActiveMenuItem);

    // FAQ Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        // Set initial state
        question.setAttribute('aria-expanded', 'false');
        
        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            
            // Close all other answers
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.setAttribute('aria-expanded', 'false');
                    // Reset height of other answers
                    const otherAnswer = q.nextElementSibling;
                    otherAnswer.style.height = '0px';
                }
            });
            
            // Toggle clicked question
            question.setAttribute('aria-expanded', String(!isExpanded));
            
            // Adjust height of answer
            const answer = question.nextElementSibling;
            if (!isExpanded) {
                // Opening
                answer.style.height = answer.scrollHeight + 'px';
            } else {
                // Closing
                answer.style.height = '0px';
            }
        });
    });
});
