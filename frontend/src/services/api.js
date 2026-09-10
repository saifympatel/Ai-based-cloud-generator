/**
 * API Service Layer for AI Product Architect
 * Supports seamless switching between Local Mock Mode and Member 2's Live FastAPI Backend.
 */

import { initialMockState } from './mockData';

const BASE_API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

class ApiService {
  constructor() {
    this.useLiveBackend = false; // Default to Mock for Week 1 independent dev
  }

  setBackendMode(isLive) {
    this.useLiveBackend = isLive;
    console.log(`[API Service] Mode set to: ${isLive ? 'LIVE FASTAPI' : 'MOCK ENGINE'}`);
  }

  getBackendMode() {
    return this.useLiveBackend;
  }

  async parseRequirement(prompt, domain, users, budget) {
    if (!this.useLiveBackend) {
      // Simulate fine-tuned LLM processing latency
      await new Promise(r => setTimeout(r, 800));
      return {
        ...initialMockState.structuredRequirement,
        domain: domain || 'ecommerce',
        users: users || 50000,
        budget_monthly_inr: budget || 30000,
        features: [
          "Authentication (JWT)",
          "Product Catalog",
          "Shopping Cart",
          "Payment Gateway",
          "AWS RDS PostgreSQL Multi-AZ",
          "AWS S3 Object Storage"
        ]
      };
    }

    // Live call to Member 2's FastAPI Backend
    const response = await fetch(`${BASE_API_URL}/api/requirements/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ raw_prompt: prompt, domain, expected_users: users, monthly_budget_inr: budget })
    });
    if (!response.ok) throw new Error(`Backend error: ${response.statusText}`);
    return await response.json();
  }

  async getSuggestions(requirementId) {
    if (!this.useLiveBackend) {
      await new Promise(r => setTimeout(r, 600));
      return initialMockState.suggestions;
    }

    const response = await fetch(`${BASE_API_URL}/api/suggestions/${requirementId}`);
    if (!response.ok) throw new Error(`Backend error: ${response.statusText}`);
    return await response.json();
  }

  async getArchitectureAlternatives(requirementId) {
    if (!this.useLiveBackend) {
      await new Promise(r => setTimeout(r, 600));
      return initialMockState.architectureAlternatives;
    }

    const response = await fetch(`${BASE_API_URL}/api/architecture/${requirementId}/alternatives`);
    if (!response.ok) throw new Error(`Backend error: ${response.statusText}`);
    return await response.json();
  }

  async checkBackendHealth() {
    try {
      const response = await fetch(`${BASE_API_URL}/health`, { method: 'GET', signal: AbortSignal.timeout(2000) });
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const apiService = new ApiService();
