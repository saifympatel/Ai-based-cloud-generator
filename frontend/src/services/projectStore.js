/**
 * Persistent Project Management Store for AI Product Architect
 * Stores and manages multiple cloud architect projects in LocalStorage.
 */

import { DEMO_REQUIREMENT, initialMockState } from './mockData';

const STORAGE_KEY = 'ai_product_architect_projects';
const ACTIVE_ID_KEY = 'ai_product_architect_active_id';

const DEFAULT_PROJECTS = [
  {
    id: 'proj-ecommerce-01',
    name: 'CloudScale E-Commerce Store',
    description: 'High-availability retail store with product catalog, cart, and payment processing.',
    domain: 'ecommerce',
    users: 50000,
    budget: 30000,
    rawPrompt: DEMO_REQUIREMENT,
    status: 'Ready for Export',
    securityScore: 91,
    estimatedCost: 22000,
    createdAt: '2026-09-04T09:00:00Z',
    updatedAt: '2026-09-04T12:00:00Z'
  },
  {
    id: 'proj-food-02',
    name: 'QuickBite Food Delivery',
    description: 'Real-time order dispatching and live restaurant menu syncing platform.',
    domain: 'food_delivery',
    users: 25000,
    budget: 25000,
    rawPrompt: 'Build a real-time food delivery platform for 25,000 users with live order tracking, restaurants catalog, payment gateway, PostgreSQL and Redis caching under ₹25,000/mo.',
    status: 'In Validation',
    securityScore: 88,
    estimatedCost: 19500,
    createdAt: '2026-09-03T15:30:00Z',
    updatedAt: '2026-09-04T10:15:00Z'
  },
  {
    id: 'proj-lms-03',
    name: 'EduStream Learning Campus',
    description: 'Video-on-demand e-learning portal for students and interactive quizzes.',
    domain: 'lms',
    users: 15000,
    budget: 20000,
    rawPrompt: 'Build a video learning management system for 15,000 students with course enrollment, quiz engine, S3 video storage and PostgreSQL database with high availability.',
    status: 'Architecture Defined',
    securityScore: 94,
    estimatedCost: 16800,
    createdAt: '2026-09-02T11:00:00Z',
    updatedAt: '2026-09-04T08:30:00Z'
  }
];

class ProjectStore {
  getProjects() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
        return DEFAULT_PROJECTS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_PROJECTS;
    }
  }

  getActiveProjectId() {
    return localStorage.getItem(ACTIVE_ID_KEY) || 'proj-ecommerce-01';
  }

  getActiveProject() {
    const projects = this.getProjects();
    const activeId = this.getActiveProjectId();
    return projects.find(p => p.id === activeId) || projects[0];
  }

  setActiveProject(id) {
    localStorage.setItem(ACTIVE_ID_KEY, id);
  }

  createProject(newProj) {
    const projects = this.getProjects();
    const id = `proj-${Date.now()}`;
    const project = {
      id,
      name: newProj.name || 'Untitled Cloud Product',
      description: newProj.description || 'Cloud-native application designed by AI Product Architect',
      domain: newProj.domain || 'ecommerce',
      users: Number(newProj.users) || 25000,
      budget: Number(newProj.budget) || 25000,
      rawPrompt: newProj.rawPrompt || `Build a scalable ${newProj.domain} platform on AWS.`,
      status: 'Specification Draft',
      securityScore: 89,
      estimatedCost: Math.round(Number(newProj.budget || 25000) * 0.75),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    projects.unshift(project);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    this.setActiveProject(id);
    return project;
  }

  deleteProject(id) {
    let projects = this.getProjects();
    if (projects.length <= 1) return projects; // Keep at least one
    projects = projects.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    if (this.getActiveProjectId() === id) {
      this.setActiveProject(projects[0].id);
    }
    return projects;
  }
}

export const projectStore = new ProjectStore();
