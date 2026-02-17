/**
 * Projects Configuration
 * Centralized configuration for portfolio projects showcased on the projects page
 */

export interface Project {
  id: string;
  title: string;
  tagline: string;
  slug: string;
  image: {
    src: string;
    alt: string;
  };
  problem: string;
  solution: string;
  features: string[];
  techHighlights: {
    frontend?: string[];
    backend?: string[];
    testing?: string[];
    deployment?: string[];
    unique?: string[];
  };
  techStack: string[]; // For badges
  links: {
    demo?: string;
    github?: string;
    docs?: string;
    blog?: string;
  };
  stats?: {
    label: string;
    value: string;
  }[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'gastown',
    title: 'Gastown',
    tagline: 'AI agent orchestration framework for parallel multi-project development',
    slug: 'gastown',
    image: {
      src: '/images/projects/gastown-placeholder.svg',
      alt: 'Gastown AI agent orchestration framework architecture diagram',
    },
    problem:
      'Traditional AI-assisted development suffers from sequential bottlenecks: one AI conversation at a time, manual context-switching between projects, repeated explanations of project structure, and context pollution from long conversation histories. Developers managing multiple projects waste valuable time juggling contexts and waiting for one task to finish before starting another. The single-threaded nature of AI assistants becomes a productivity ceiling.',
    solution:
      'Gastown is an innovative AI agent orchestration framework that enables true parallelization across multiple projects. Named after frontier towns where specialized workers operate autonomously, Gastown coordinates distributed AI "workers" (called polecats) across independent project workspaces (called rigs). It treats AI agents as ephemeral, single-task contractors that spawn fresh with exactly the context they need, execute work autonomously, and disappear—enabling simultaneous development across an entire project portfolio.',
    features: [
      'Multi-Project Orchestration: Coordinate work across multiple independent projects (rigs) simultaneously—wheeltracker, mealplanner, and personalsite are current active rigs',
      'Ephemeral Worker Model: Polecats are disposable AI agents that spawn fresh for each task with zero context pollution, execute work, and self-destruct',
      'The Propulsion Principle (GUPP): Revolutionary autonomous execution—if work appears on an agent\'s "hook," they execute immediately without waiting for approval, treating the system like a steam engine',
      'CLAUDE.md Context Injection: Each rig maintains a master context file automatically injected into every polecat, ensuring consistent quality without repetition',
      'Convoy Pattern: Batch related tasks for parallel execution with unified progress tracking across features',
      'Mayor Coordination: Central orchestration agent breaks down PRDs into distributable work units and dispatches to polecats',
      'Automated Integration Pipeline: Refinery agent processes merge queue with code review and verification before integration',
      'Distributed Monitoring: Deacon (town-level health), Witness (per-rig monitoring), and Daemon (background services) ensure system reliability',
      'Structured Work Management: Beads system for granular task tracking with cross-rig coordination',
    ],
    techHighlights: {
      unique: [
        'Architecture: Distributed workforce model with ephemeral workers, persistent context, and event-driven dispatch',
        'Agent Roles: Mayor (coordinator), Polecats (workers), Deacon (health monitor), Witness (activity tracker), Refinery (code reviewer), Daemon (background service)',
        'Work Distribution: PRD → Mayor → Convoys → Polecats → Refinery → Integration',
        'Session Management: Mandatory completion protocol (tests, commit, push, quality gates)',
        'CLI Interface: gt command suite for rig management, polecat spawning, mail/messaging, work dispatch',
        'Configuration: JSON-based (town.json, rigs.json, daemon.json) with per-rig CLAUDE.md context files',
      ],
      frontend: ['Next.js 15+', 'React 19', 'TypeScript', 'Tailwind CSS'],
      backend: ['Node.js', 'PostgreSQL', 'Prisma ORM'],
      testing: ['Vitest', 'Playwright'],
      deployment: [
        'Multiple production rigs: wheeltracker, mealplanner, personalsite',
        'Mandatory completion protocol with tests, commit, push, quality gates',
      ],
    },
    techStack: [
      'Custom Framework',
      'CLI',
      'Node.js',
      'JSON Configuration',
      'AI Agent Orchestration',
    ],
    links: {
      blog: '/blog/gastown-workflow',
      github: 'https://github.com/briangriffey/gastown',
    },
    stats: [
      {
        label: 'True Parallelization',
        value: 'Multiple AI agents working simultaneously across different projects',
      },
      {
        label: 'Fresh Context',
        value: 'Zero context pollution—each polecat starts with exactly what it needs',
      },
      {
        label: 'Autonomous Execution',
        value: 'GUPP principle enables continuous progress even when humans are AFK',
      },
      {
        label: 'Multi-Project Productivity',
        value:
          'Managing three production rigs: wheeltracker, mealplanner, personal website',
      },
      {
        label: 'Innovative Architecture',
        value:
          'First-of-its-kind framework treating AI agents as distributed, ephemeral workers',
      },
    ],
    featured: true,
  },
  {
    id: 'wheel-tracker',
    title: 'Wheel Tracker',
    tagline: 'Sophisticated options trading tracker for the wheel strategy',
    slug: 'wheel-tracker',
    image: {
      src: '/images/projects/wheeltracker-placeholder.svg',
      alt: 'Wheel Tracker options trading dashboard screenshot',
    },
    problem:
      'Options traders using the wheel strategy need a comprehensive tool to track trades across multiple cycles, calculate complex profit/loss metrics, manage assigned positions, and benchmark performance against market indices. Existing solutions are either too complex, too simplistic, or don\'t understand the nuances of the wheel strategy.',
    solution:
      'Wheel Tracker is a production-ready Next.js application that provides end-to-end tracking for options traders. It manages the complete wheel cycle—from selling cash-secured PUTs, to managing assigned stock positions, to selling covered CALLs—with sophisticated P&L calculations, real-time price tracking, and performance analytics.',
    features: [
      'Complete Wheel Cycle Tracking: Manages PUTs, stock positions, and CALLs with relationship tracking between trades',
      'Advanced Analytics: Real-time P&L calculations (realized vs. unrealized), win rate tracking, and performance metrics by ticker',
      'Expiration Calendar: Color-coded ITM/OTM/ATM status with batch operations for managing upcoming expirations',
      'Market Benchmarking: Compare portfolio performance against SPY, QQQ, and VTI indices',
      'Live Price Integration: Real-time stock prices via Alpha Vantage API with automated daily updates',
      'Tax-Ready Exports: Export trade history to CSV for tax preparation',
    ],
    techHighlights: {
      frontend: ['Next.js 15', 'React 19', 'TypeScript 5.7', 'Tailwind CSS'],
      backend: ['PostgreSQL 16', 'Prisma ORM', 'NextAuth.js authentication'],
      testing: [
        '409+ passing tests',
        'Comprehensive unit, integration, and E2E coverage',
        '68+ component tests',
      ],
      deployment: ['Docker containerization', 'Vercel/Railway/Netlify support'],
      unique: [
        'Lighthouse scores of 97-99/100',
        'FCP under 1 second',
        'Complete UI component library',
      ],
    },
    techStack: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    links: {
      demo: 'https://wheel-tracker-demo.vercel.app',
      github: 'https://github.com/briangriffey/wheel-tracker',
    },
    stats: [
      {
        label: 'Production Ready',
        value: 'WCAG accessibility compliance',
      },
      {
        label: 'Zero CLS',
        value: 'Zero Cumulative Layout Shift for optimal UX',
      },
      {
        label: 'Test Coverage',
        value: '409+ passing tests',
      },
      {
        label: 'Performance',
        value: 'Lighthouse 97-99/100',
      },
    ],
  },
  {
    id: 'meal-planner',
    title: 'Meal Planner Agent',
    tagline: 'AI-powered meal planning that saves time and reduces decision fatigue',
    slug: 'meal-planner',
    image: {
      src: '/images/projects/mealplanner-placeholder.svg',
      alt: 'Meal Planner Agent AI-powered meal planning interface',
    },
    problem:
      'Busy professionals, families, and health-conscious individuals face the daily challenge of "what\'s for dinner?" Traditional meal planning is time-consuming, requires nutritional knowledge, and becomes repetitive. People need a solution that automates meal planning while respecting dietary preferences, nutrition goals, and household dynamics.',
    solution:
      'Meal Planner Agent is an AI-powered web application that leverages Claude AI to generate personalized, nutritious weekly meal plans. It automates the entire meal planning process—from recipe generation to shopping list creation—while adapting to individual preferences, dietary restrictions, and nutritional targets.',
    features: [
      'AI-Powered Generation: Uses Claude Sonnet 4 to create personalized meal plans with detailed recipes and nutrition information',
      'Household-Based Planning: Share meal plans across family members while maintaining individual nutrition preferences',
      'Smart Shopping Lists: Automatic ingredient aggregation, categorization, and HEB grocery integration with product links',
      'Recipe Favorites System: Bookmark and save favorite recipes for quick reuse',
      'Automated Email Delivery: Beautifully formatted meal plans sent to all household members automatically',
      'Scheduled Generation: Configure automatic weekly meal plan generation on preferred days',
      'Nutrition Optimization: Set protein targets, calorie limits, and dietary restrictions (vegetarian, vegan, gluten-free)',
      'Real-Time Progress: Live progress tracking (0-100%) during meal plan generation',
    ],
    techHighlights: {
      frontend: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS'],
      backend: [
        'Node.js',
        'PostgreSQL',
        'Prisma ORM',
        'Redis',
        'BullMQ job queue',
        'Nodemailer with Gmail SMTP',
      ],
      unique: [
        'Anthropic SDK with Claude Sonnet 4',
        'Structured JSON output',
        'Context-aware generation',
        'Puppeteer for HEB web scraping',
        'Monorepo structure (web app, core agent logic, database, queue worker)',
      ],
      testing: ['E2E testing', 'Unit testing', 'Integration testing'],
      deployment: [
        'Multi-tenant architecture with data isolation',
        'BullMQ with rate limiting (10 jobs/min)',
        'Concurrent processing',
        'Persistent storage',
        'Google Analytics 4',
      ],
    },
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Claude AI',
      'PostgreSQL',
      'Redis',
      'BullMQ',
    ],
    links: {
      demo: 'https://mealplanner.briangriffey.com',
      github: 'https://github.com/briangriffey/meal-planner-agent',
    },
    stats: [
      {
        label: 'Multi-Tenant',
        value: 'Complete data isolation',
      },
      {
        label: 'Production Grade',
        value: 'E2E, unit, and integration testing',
      },
      {
        label: 'Scalable Workers',
        value: 'Job failure recovery and queue management',
      },
      {
        label: 'Version',
        value: 'v2.0.0 with household planning and favorites',
      },
    ],
  },
  {
    id: 'precept-tracker',
    title: 'Precept Tracker',
    tagline: 'Daily Zen journal for reflecting on the 16 Precepts of Soto Zen Buddhism',
    slug: 'precept-tracker',
    image: {
      src: '/images/projects/precepttracker-placeholder.svg',
      alt: 'Precept Tracker daily Zen journal application',
    },
    problem:
      'Practicing the 16 Precepts of Soto Zen Buddhism requires consistent daily reflection, but there are no dedicated tools to support this discipline. Practitioners rely on generic journaling apps or pen-and-paper methods that don\'t understand the structure of the precepts—the Three Refuges, Three Pure Precepts, and Ten Grave Precepts—making it difficult to track progress, maintain streaks, and observe patterns in their practice over time.',
    solution:
      'Precept Tracker is a desktop application purpose-built for daily Zen practice. It guides users through structured reflection on all 16 precepts with customizable prompts, tracks practice streaks and meditation sessions, and provides weekly analytics to reveal trends in your practice. All data stays local on your machine via SQLite.',
    features: [
      'Guided Daily Reflection: Structured prompts for all 16 precepts organized into Three Refuges, Three Pure Precepts, and Ten Grave Precepts',
      'Practice Streak Tracking: Monitor daily practice consistency with streak counters and history',
      'Meditation Tracking: Separate tracking for meditation sessions alongside precept reflection',
      'Weekly Analytics: Charts and trend visualization to observe patterns in your practice over time',
      'Customizable Prompts: Personalize reflection prompts for each precept to match your practice',
      'Data Export: Export your journal data for backup or external analysis',
      'Weekly Nudges: Configurable reminders to support consistent practice',
    ],
    techHighlights: {
      frontend: ['React 19', 'TypeScript', 'Framer Motion', 'Recharts'],
      backend: ['Electron 40', 'Better SQLite3', 'Node.js'],
      deployment: [
        'Cross-platform desktop: macOS (DMG), Windows (Squirrel), Linux (DEB/RPM)',
        'Local-first architecture with SQLite database',
      ],
      unique: [
        'Electron Forge for packaging and distribution',
        'All data stored locally—no cloud dependency',
        'Zen-inspired UI with enso iconography',
      ],
    },
    techStack: ['Electron', 'React', 'TypeScript', 'SQLite', 'Framer Motion', 'Vite'],
    links: {
      github: 'https://github.com/briangriffey/precept-tracker',
    },
    stats: [
      {
        label: 'Desktop App',
        value: 'Cross-platform via Electron (macOS, Windows, Linux)',
      },
      {
        label: 'Local-First',
        value: 'All data stored locally with SQLite—your practice stays private',
      },
      {
        label: '16 Precepts',
        value: 'Complete coverage of Soto Zen Buddhist precepts',
      },
    ],
  },
] as const;

// Helper function to get a project by slug
export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((project) => project.slug === slug);
};

// Helper function to get featured projects
export const getFeaturedProjects = (): Project[] => {
  return projects.filter((project) => project.featured);
};

// Helper function to get all project slugs (useful for static generation)
export const getProjectSlugs = (): string[] => {
  return projects.map((project) => project.slug);
};
