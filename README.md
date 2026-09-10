# AI Product Architect — Member 3: Full-Stack / Cloud / DevOps

Welcome to the **Member 3** implementation for **AI Product Architect (AI Based Cloud Generator)**.

## 🎯 Role Overview
- **Member:** Member 3
- **Role:** Full-Stack / Cloud / DevOps Engineer
- **Dedicated Branch:** `member3-fullstack` (Git operations ready)
- **Deadline:** September 25, 2026 (Accelerated 21-Day Sprint)

---

## 🚀 Key Modules Built

### 1. Interactive React Dashboard (`/frontend`)
- **Requirement Analysis Screen:** Natural language input supporting the core demonstration scenario (*E-commerce platform for 50k users with PostgreSQL, S3, high availability, and ₹30k budget*).
- **Human-in-the-Loop AI Suggestions:** Interactive review screen allowing the customer to **[Accept]**, **[Reject]**, or **[Modify]** architectural suggestions (Multi-AZ RDS, AWS WAF, HTTPS, ALB Auto-Scaling).
- **10-Agent Live Progress Tracker:** Visual monitoring of the closed-loop agent workflow coordinated via LangGraph.
- **Interactive Cloud Architecture Topology:** AWS architecture visualizer with 3 cost alternatives:
  - *Cost-Optimized:* ₹12,500/mo (Single-AZ)
  - *Balanced (Recommended):* ₹22,000/mo (Multi-AZ RDS, ALB, ASG, S3)
  - *High-Performance:* ₹38,000/mo (Multi-Region, ElastiCache Redis)
- **Security & Cost Evaluation Dashboard:** Real-time CIS AWS benchmark score (91/100) and budget surplus tracking.
- **Requirement Traceability Matrix:** Traceability table linking REQ-001 through REQ-005 to UI, Backend, DB, Cloud Infra, and Tests (100% coverage).
- **One-Click ZIP Export:** Instant browser-based download of `AI-Generated-Project.zip`.

### 2. Controlled Full-Stack & DevOps Generators (`/generators`)
- `generators/frontend/ui_generator.py`: Generates React application pages and components.
- `generators/backend/api_generator.py`: Generates FastAPI REST APIs, schemas, and JWT auth.
- `generators/database/db_generator.py`: Generates PostgreSQL DDL schemas, UUID tables, and seed data.
- `generators/docker/docker_generator.py`: Generates `Dockerfile.frontend`, `Dockerfile.backend`, and `docker-compose.yml`.
- `generators/terraform/tf_generator.py`: Generates complete AWS Terraform scripts (`vpc`, `alb`, `rds`, `s3`, `asg`).

### 3. One-Click Project Packager (`/export`)
- `export/packager.py`: Orchestrates all generator modules and packages the complete full-stack project bundle into `AI-Generated-Project.zip`.

---

## ⚡ How to Run

## GitHub Setup in VS Code

### 1. Install prerequisites

- Git
- VS Code with the GitHub Pull Requests and Issues extension
- Node.js 20 or newer
- Python 3.11 or newer

Confirm Git is available in the VS Code integrated terminal:

```powershell
git --version
```

### 2. Create and publish the repository

Create an empty repository on GitHub, then run these commands from the project root:

```powershell
git init
git branch -M main
git add .
git commit -m "Initial project setup"
git remote add origin https://github.com/<your-account>/<your-repository>.git
git push -u origin main
```

Replace the placeholder remote with the URL of the GitHub repository you created. In VS Code, the Source Control view can also be used to stage, commit, and sync changes after signing in to GitHub.

### 3. Run the project locally

Install the frontend dependencies and start Vite:

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in a browser. To validate a production build:

```powershell
npm run build
```

Return to the project root before running the packager:

```powershell
cd ..
python export/packager.py
```

Run the export smoke test from the project root:

```powershell
python -m unittest discover -s tests -v
```

The same test command also checks the local mock API integration and confirms that the exported package contains the Docker and Terraform deployment files.

### Run the Dashboard in VS Code:
```bash
cd frontend
npm run dev
```
Open your browser at `http://localhost:5173`.

### Run the One-Click ZIP Packager via Python:
```bash
python export/packager.py
```
This generates the full output package at `export/AI-Generated-Project.zip`.
