import { Injectable, signal } from '@angular/core';

export interface Technology {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'cloud' | 'databases' | 'tools';
  level: 'expert' | 'advanced' | 'intermediate';
  color?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  sourceUrl?: string;
  featured: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  // Technologies data with Angular Signals
  private readonly technologiesData = signal<Technology[]>([
    // Frontend
    { name: 'Angular', icon: 'web', category: 'frontend', level: 'expert', color: '#dd0031' },
    { name: 'TypeScript', icon: 'code', category: 'frontend', level: 'expert', color: '#3178c6' },
    { name: 'React', icon: 'web', category: 'frontend', level: 'advanced', color: '#61dafb' },
    { name: 'HTML5/CSS3', icon: 'web', category: 'frontend', level: 'expert', color: '#e34f26' },
    { name: 'SCSS/Sass', icon: 'palette', category: 'frontend', level: 'expert', color: '#cc6699' },
    
    // Backend
    { name: 'Java', icon: 'coffee', category: 'backend', level: 'expert', color: '#f89820' },
    { name: 'Spring Boot', icon: 'settings', category: 'backend', level: 'expert', color: '#6db33f' },
    { name: 'Node.js', icon: 'memory', category: 'backend', level: 'advanced', color: '#339933' },
    { name: 'Python', icon: 'code', category: 'backend', level: 'advanced', color: '#3776ab' },
    { name: 'C#/.NET', icon: 'code', category: 'backend', level: 'intermediate', color: '#512bd4' },
    
    // Cloud & DevOps
    { name: 'Azure', icon: 'cloud', category: 'cloud', level: 'expert', color: '#0078d4' },
    { name: 'Docker', icon: 'inventory', category: 'cloud', level: 'expert', color: '#2496ed' },
    { name: 'Kubernetes', icon: 'hub', category: 'cloud', level: 'advanced', color: '#326ce5' },
    { name: 'Terraform', icon: 'build', category: 'cloud', level: 'expert', color: '#7b42bc' },
    { name: 'GitHub Actions', icon: 'build_circle', category: 'cloud', level: 'expert', color: '#2088ff' },
    { name: 'Azure DevOps', icon: 'integration_instructions', category: 'cloud', level: 'expert', color: '#0078d4' },
    
    // Databases
    { name: 'PostgreSQL', icon: 'storage', category: 'databases', level: 'advanced', color: '#336791' },
    { name: 'SQL Server', icon: 'storage', category: 'databases', level: 'advanced', color: '#cc2927' },
    { name: 'MongoDB', icon: 'storage', category: 'databases', level: 'intermediate', color: '#47a248' },
    { name: 'Cosmos DB', icon: 'cloud', category: 'databases', level: 'advanced', color: '#0078d4' },
    
    // Tools
    { name: 'Git', icon: 'source', category: 'tools', level: 'expert', color: '#f05032' },
    { name: 'VS Code', icon: 'code', category: 'tools', level: 'expert', color: '#007acc' },
    { name: 'IntelliJ IDEA', icon: 'code', category: 'tools', level: 'advanced', color: '#000000' },
    { name: 'Power BI', icon: 'analytics', category: 'tools', level: 'advanced', color: '#f2c811' },
    { name: 'SonarQube', icon: 'bug_report', category: 'tools', level: 'advanced', color: '#4e9bcd' }
  ]);

  // Projects data
  private readonly projectsData = signal<Project[]>([
    {
      id: 'cloud-migration',
      title: 'projects.project1.title',
      description: 'projects.project1.description',
      image: '/assets/images/projects/placeholder.svg',
      technologies: ['Azure', 'Terraform', 'GitHub Actions', 'Docker'],
      liveUrl: '#',
      featured: true
    },
    {
      id: 'finops-dashboard',
      title: 'projects.project2.title',
      description: 'projects.project2.description',
      image: '/assets/images/projects/placeholder.svg',
      technologies: ['Angular', 'Power BI', 'Azure Functions', 'Cosmos DB'],
      liveUrl: '#',
      featured: true
    },
    {
      id: 'devsecops-pipeline',
      title: 'projects.project3.title',
      description: 'projects.project3.description',
      image: '/assets/images/projects/placeholder.svg',
      technologies: ['Azure DevOps', 'SonarQube', 'Terraform', 'Kubernetes'],
      sourceUrl: '#',
      featured: true
    },
    {
      id: 'portfolio-website',
      title: 'projects.project4.title',
      description: 'projects.project4.description',
      image: '/assets/images/projects/placeholder.svg',
      technologies: ['Angular', 'Material Design', 'TypeScript', 'SCSS'],
      liveUrl: 'https://alderichoarau.github.io',
      sourceUrl: 'https://github.com/alderichoarau/alderichoarau.github.io',
      featured: false
    }
  ]);

  // FAQ data
  private readonly faqData = signal<FAQItem[]>([
    {
      id: 'cloud-projects',
      question: 'faq.q1',
      answer: 'faq.a1',
      category: 'services'
    },
    {
      id: 'mission-process',
      question: 'faq.q2',
      answer: 'faq.a2',
      category: 'process'
    },
    {
      id: 'emergency',
      question: 'faq.q3',
      answer: 'faq.a3',
      category: 'services'
    },
    {
      id: 'security',
      question: 'faq.q4',
      answer: 'faq.a4',
      category: 'security'
    },
    {
      id: 'collaboration',
      question: 'faq.q5',
      answer: 'faq.a5',
      category: 'process'
    },
    {
      id: 'billing',
      question: 'faq.q6',
      answer: 'faq.a6',
      category: 'pricing'
    },
    {
      id: 'maintenance',
      question: 'faq.q7',
      answer: 'faq.a7',
      category: 'services'
    },
    {
      id: 'remote-onsite',
      question: 'faq.q8',
      answer: 'faq.a8',
      category: 'process'
    }
  ]);

  // Public readonly signals
  public readonly technologies = this.technologiesData.asReadonly();
  public readonly projects = this.projectsData.asReadonly();
  public readonly faq = this.faqData.asReadonly();

  // Helper methods with computed signals
  getFeaturedProjects() {
    return this.projects().filter(project => project.featured);
  }

  getTechnologiesByCategory(category: Technology['category']) {
    return this.technologies().filter(tech => tech.category === category);
  }

  getFAQByCategory(category: string) {
    return this.faq().filter(item => item.category === category);
  }

  getProjectById(id: string) {
    return this.projects().find(project => project.id === id);
  }

  // Method to get technology by name (for project display)
  getTechnologyByName(name: string) {
    return this.technologies().find(tech => tech.name === name);
  }
}