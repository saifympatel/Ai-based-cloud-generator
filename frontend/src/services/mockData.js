export const DEMO_REQUIREMENT = "Build an e-commerce application for 50,000 users with authentication, products, cart, payments, PostgreSQL, image storage, high availability and a ₹30,000 monthly cloud budget.";

export const initialMockState = {
  rawPrompt: DEMO_REQUIREMENT,
  domain: "ecommerce",
  expectedUsers: 50000,
  monthlyBudget: 30000,
  
  structuredRequirement: {
    domain: "ecommerce",
    domain_label: "E-Commerce & Digital Retail",
    users: 50000,
    database: "postgresql",
    database_version: "PostgreSQL 15.4 (RDS)",
    object_storage: true,
    object_storage_service: "Amazon S3",
    high_availability: true,
    scalability: true,
    budget_monthly_inr: 30000,
    architecture_pattern: "Three-Tier High-Availability Cloud Architecture",
    confidence_score: 98.4,
    provenance: {
      domain: { type: "specified", label: "Explicit in Prompt", confidence: 99 },
      users: { type: "specified", label: "Explicit in Prompt", confidence: 100 },
      database: { type: "specified", label: "Explicit in Prompt", confidence: 99 },
      storage: { type: "specified", label: "Explicit in Prompt", confidence: 98 },
      budget: { type: "specified", label: "Explicit in Prompt", confidence: 100 },
      high_availability: { type: "specified", label: "Explicit in Prompt", confidence: 97 },
      architecture_pattern: { type: "inferred", label: "Inferred via Fine-Tuned Model", confidence: 96 },
      scaling_policy: { type: "recommended", label: "Recommended by Suggestion Agent", confidence: 95 }
    },
    features: [
      "Authentication & JWT Authorization",
      "Product Catalog & Category Filtering",
      "Shopping Cart with Persistence",
      "Payment Gateway Integration",
      "Order Management & Status Tracking",
      "S3 Pre-Signed Image Uploads"
    ]
  },

  suggestions: [
    {
      id: "sug-1",
      title: "Add Automated Database Backup & Multi-AZ RDS",
      description: "Ensures zero data loss with automated daily snapshots and cross-AZ failover for high availability.",
      category: "reliability",
      status: "accepted",
      impact: "+₹2,500/mo cloud cost, 99.99% database uptime"
    },
    {
      id: "sug-2",
      title: "Enforce HTTPS & TLS 1.3 via AWS Certificate Manager",
      description: "Encrypts all transit data and fulfills security compliance standards.",
      category: "security",
      status: "accepted",
      impact: "Free AWS ACM certificate, +5 Security score points"
    },
    {
      id: "sug-3",
      title: "Deploy AWS WAF (Web Application Firewall) on ALB",
      description: "Protects against SQL injection, cross-site scripting (XSS), and rate limits DDoS attacks.",
      category: "security",
      status: "accepted",
      impact: "+₹1,200/mo cloud cost, +10 Security score points"
    },
    {
      id: "sug-4",
      title: "Configure Application Load Balancer with Auto-Scaling Group",
      description: "Automatically scales FastAPI backend compute nodes between 2 and 10 instances based on traffic spikes.",
      category: "scalability",
      status: "accepted",
      impact: "Zero downtime during flash sales, dynamic cost scaling"
    },
    {
      id: "sug-5",
      title: "Configure Amazon CloudFront CDN for S3 Product Images",
      description: "Caches static product assets at edge locations globally to reduce latency and S3 egress costs.",
      category: "performance",
      status: "pending",
      impact: "Reduces latency by 65%, -15% S3 egress bandwidth bill"
    }
  ],

  agents: [
    { id: 1, name: "Requirement Analyzer", status: "completed", message: "Extracted entities: 50k users, PostgreSQL, S3, High-Availability.", time: "1.2s" },
    { id: 2, name: "Suggestion Agent", status: "completed", message: "Recommended Multi-AZ, WAF, HTTPS, and Auto-Scaling.", time: "0.8s" },
    { id: 3, name: "Product Architect", status: "completed", message: "Defined 5 modules: Auth, Catalog, Cart, Orders, Admin.", time: "2.1s" },
    { id: 4, name: "Full-Stack Code Agent", status: "completed", message: "Generated React frontend and FastAPI backend endpoints.", time: "3.4s" },
    { id: 5, name: "Database Agent", status: "completed", message: "Designed PostgreSQL DDL with indexes and UUID keys.", time: "1.5s" },
    { id: 6, name: "Cloud Architecture Agent", status: "completed", message: "Mapped capabilities to AWS: ALB, ASG, RDS, S3, CloudWatch.", time: "2.3s" },
    { id: 7, name: "Security Agent", status: "completed", message: "Evaluated 6 controls. Calculated Security Score: 91/100.", time: "1.1s" },
    { id: 8, name: "Scalability Agent", status: "completed", message: "Capacity model verified for 50,000 peak concurrent users.", time: "1.4s" },
    { id: 9, name: "Cost Optimization Agent", status: "completed", message: "Estimated ₹22,000/mo. Status: ₹8,000 UNDER BUDGET.", time: "0.9s" },
    { id: 10, name: "Validator & Self-Correction Agent", status: "completed", message: "Requirement Traceability verified at 100%. 0 critical bugs.", time: "1.8s" }
  ],

  architectureAlternatives: {
    cost_optimized: {
      name: "Cost Optimized",
      cost_inr: 12500,
      performance: "Medium",
      availability: "Medium (Single AZ)",
      description: "Best for dev/staging or early-stage startups with strict budget constraints.",
      components: [
        { id: "c1", name: "Internet Gateway", service: "AWS IGW", type: "network" },
        { id: "c2", name: "App Runner / Single EC2", service: "AWS App Runner", type: "compute" },
        { id: "c3", name: "PostgreSQL Standard", service: "RDS t3.micro Single-AZ", type: "database" },
        { id: "c4", name: "Product Media", service: "AWS S3 Standard", type: "storage" }
      ]
    },
    balanced: {
      name: "Balanced (Recommended Default)",
      cost_inr: 22000,
      performance: "High",
      availability: "High (Multi-AZ Failover)",
      description: "Production-ready resilient architecture balancing cost, fault tolerance, and speed.",
      components: [
        { id: "b1", name: "DNS & Edge", service: "AWS Route 53 + ACM SSL", type: "network" },
        { id: "b2", name: "Ingress Router", service: "Application Load Balancer (ALB)", type: "network" },
        { id: "b3", name: "FastAPI Compute", service: "Auto Scaling Group (2-6x t3.medium)", type: "compute" },
        { id: "b4", name: "Managed Database", service: "AWS RDS PostgreSQL 15 Multi-AZ", type: "database" },
        { id: "b5", name: "Encrypted Storage", service: "AWS S3 (SSE-AES256 Encrypted)", type: "storage" },
        { id: "b6", name: "Security & Firewall", service: "AWS WAF + Security Groups", type: "security" }
      ]
    },
    high_performance: {
      name: "High Performance",
      cost_inr: 38000,
      performance: "Very High",
      availability: "Very High (Multi-Region / ElastiCache)",
      description: "Engineered for zero-latency mission-critical workloads and global traffic.",
      components: [
        { id: "h1", name: "Global CDN", service: "Amazon CloudFront + Route 53", type: "network" },
        { id: "h2", name: "Dual-Stack ALB", service: "Application Load Balancer + WAF", type: "network" },
        { id: "h3", name: "Container Fleet", service: "AWS ECS Fargate Cluster (4-12 tasks)", type: "compute" },
        { id: "h4", name: "In-Memory Cache", service: "AWS ElastiCache Redis Cluster", type: "cache" },
        { id: "h5", name: "High IOPS Database", service: "RDS Aurora PostgreSQL Multi-Master", type: "database" },
        { id: "h6", name: "Accelerated Storage", service: "AWS S3 Multi-Region Access Points", type: "storage" }
      ]
    }
  },

  selectedAlternative: "balanced",

  securityReport: {
    score: 91,
    status: "EXCELLENT",
    checks: [
      { name: "HTTPS & TLS 1.3 Encryption in Transit", passed: true },
      { name: "S3 Server-Side Encryption at Rest (SSE-AES256)", passed: true },
      { name: "Private Database Subnet Isolation (No Public IP)", passed: true },
      { name: "IAM Principle of Least Privilege Execution Role", passed: true },
      { name: "FastAPI JWT Cryptographic Token Validation", passed: true },
      { name: "AWS WAF Web Application Firewall Protection", passed: true },
      { name: "Secrets Manager (No Hardcoded Credentials)", passed: true }
    ]
  },

  costBreakdown: {
    budget: 30000,
    estimated: 22000,
    savings: 8000,
    status: "WITHIN_BUDGET",
    items: [
      { item: "Application Load Balancer (ALB)", cost: 2500 },
      { item: "EC2 Auto Scaling Compute (2x t3.medium)", cost: 6500 },
      { item: "RDS Multi-AZ PostgreSQL Database", cost: 11000 },
      { item: "S3 Storage & Data Transfer", cost: 2000 }
    ]
  },

  traceabilityMatrix: [
    { reqId: "REQ-001", feature: "User Authentication", product: "Login & Signup UI ✓", backend: "/api/auth/login API ✓", db: "users table ✓", infra: "Cognito / IAM Role ✓", test: "test_auth_jwt ✓" },
    { reqId: "REQ-002", feature: "Product Catalog", product: "Catalog Grid UI ✓", backend: "/api/products API ✓", db: "products & categories ✓", infra: "S3 Asset Bucket ✓", test: "test_catalog_fetch ✓" },
    { reqId: "REQ-003", feature: "Shopping Cart & Orders", product: "Cart & Checkout UI ✓", backend: "/api/orders API ✓", db: "cart_items & orders ✓", infra: "RDS Transaction Engine ✓", test: "test_order_flow ✓" },
    { reqId: "REQ-004", feature: "Traffic Spikes (50k users)", product: "Async UI Loading ✓", backend: "Stateless FastAPI Nodes ✓", db: "Connection Pooling ✓", infra: "ALB + Auto Scaling Group ✓", test: "test_stress_load ✓" },
    { reqId: "REQ-005", feature: "High Availability", product: "Error Boundary Handlers ✓", backend: "Multi-Zone App Runner ✓", db: "RDS Multi-AZ Failover ✓", infra: "2x AZ Subnets + Healthchecks ✓", test: "test_az_failover ✓" }
  ],

  presentationSlides: [
    {
      step: 1,
      title: "Project Vision & Problem Statement",
      badge: "Motivation & Core Concept",
      points: [
        "Traditional cloud development requires disjointed coordination across 6+ specialized roles.",
        "Existing AI tools only do prompt-to-snippet, lacking end-to-end cloud infrastructure coherence.",
        "AI Product Architect introduces Requirement-to-Validated-Product-to-Cloud: an integrated closed loop."
      ],
      speakerNotes: "Welcome evaluators. Today we present AI Product Architect, an agentic AI system that transforms plain customer English into complete software plus AWS cloud infrastructure with validation."
    },
    {
      step: 2,
      title: "Fine-Tuned LLM & Structured Extraction",
      badge: "Intelligence Layer (Member 1)",
      points: [
        "Open-source instruction model fine-tuned via LoRA / QLoRA on 2,000+ domain examples.",
        "Transforms ambiguous user prompts into structured JSON contracts.",
        "Tracks entity provenance: specified vs. inferred vs. recommended."
      ],
      speakerNotes: "Notice our extraction studio on Day 4. The model accurately isolated 50,000 peak users, PostgreSQL, and high availability with 98.4% extraction confidence."
    },
    {
      step: 3,
      title: "Human-in-the-Loop AI Suggestions",
      badge: "Governance & Safety (Section 10)",
      points: [
        "The Suggestion Agent detects missing architectural requirements rather than silently altering them.",
        "Offers interactive Accept, Reject, and Modify controls for compliance, security, and scaling.",
        "Guarantees that user intent remains the single source of truth."
      ],
      speakerNotes: "Here you can see the system recommended AWS WAF and Multi-AZ database failover, allowing the user to review impact on budget before accepting."
    },
    {
      step: 4,
      title: "10-Agent Orchestration Workflow",
      badge: "Agentic AI (Member 2)",
      points: [
        "Coordinated using LangGraph agent state machines.",
        "Specialized agents: Requirement, Suggestion, Product, Code, Database, Cloud, Security, Cost, Scalability, and Validator.",
        "Shared state prevents frontend, backend, and cloud drift."
      ],
      speakerNotes: "All 10 agents execute in a verified DAG. The validator continuously inspects the outputs to ensure every customer requirement is satisfied."
    },
    {
      step: 5,
      title: "AWS Cloud Topology & Trade-Offs",
      badge: "Cloud Architecture (Member 3)",
      points: [
        "Interactive topology visualizer: Route 53 ➔ ALB + WAF ➔ FastAPI ASG ➔ Multi-AZ RDS & S3.",
        "Generates 3 alternatives: Cost-Optimized (₹12.5k), Balanced (₹22k), and High-Performance (₹38k).",
        "Deep node inspector exposes direct Terraform resource bindings."
      ],
      speakerNotes: "Member 3's cloud visualizer allows users to inspect each node, viewing hardware specs, failover SLA, and the actual Terraform code that creates it."
    },
    {
      step: 6,
      title: "Academic Novelty: Automatic Self-Correction",
      badge: "Closed-Loop Repair (Section 20 & 41)",
      points: [
        "Detects deliberate generation bugs (e.g. database port exposed to 0.0.0.0/0).",
        "Autonomous loop: Detect ➔ Diagnose ➔ Apply Repair Patch ➔ Retest ➔ PASS.",
        "Demonstrates real agent autonomy without requiring human code debugging."
      ],
      speakerNotes: "In our live demo, we deliberately simulate an open database port. The self-correction agent diagnoses the CIS benchmark flaw and auto-repairs the Terraform security group."
    },
    {
      step: 7,
      title: "One-Click Production Package & Export",
      badge: "DevOps & Delivery (Member 3)",
      points: [
        "Exports AI-Generated-Project.zip containing full frontend, backend, database, docker, and terraform.",
        "Includes CIS AWS Security Score Report (91/100) and Requirement Traceability Matrix (100%).",
        "Ready to run locally with `docker-compose up` or deploy to AWS with `terraform apply`."
      ],
      speakerNotes: "Finally, with one click, the entire validated artifact is packaged into a downloadable production ZIP ready for deployment."
    }
  ]
};
