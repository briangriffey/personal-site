# PRD: Projects Page

## Overview

Create a comprehensive projects showcase page that highlights Brian Griffey's software engineering work. The page will be accessible via the "View Projects" button on the home page hero section and will feature detailed project cards for Gastown (AI agent orchestration framework), Wheel Tracker (options trading app), and Meal Planner Agent (AI-powered meal planning).

## Context

Currently, the home page has a "View Projects" button linking to `/projects`, but this page does not exist. This PRD defines the requirements for building a compelling projects page that showcases technical expertise, problem-solving ability, and full-stack development skills.

## Goals

1. **Showcase Technical Innovation**: Highlight Gastown as a novel AI orchestration framework, demonstrating systems thinking and innovation beyond traditional web development
2. **Demonstrate Full-Stack Expertise**: Show proficiency across modern web technologies, AI integration, distributed systems, and complex business logic
3. **Tell Compelling Stories**: Present projects as solutions to real-world problems with clear value propositions and measurable impact
4. **Drive Engagement**: Encourage visitors to explore live demos, read blog posts about Gastown, view source code, and understand the technical depth
5. **Support Career Goals**: Position Brian as both an innovative architect (Gastown framework creator) and skilled implementer (production apps using the framework)

## Target Audience

- **Recruiters & Hiring Managers**: Evaluating technical skills and project experience
- **Fellow Developers**: Interested in technical implementation and architecture
- **Potential Collaborators**: Looking for skilled engineers for projects
- **Options Traders & Home Cooks**: Potential users of the showcased applications

## Project Descriptions

### Project 1: Gastown

**Tagline**: "AI agent orchestration framework for parallel multi-project development"

**Problem Statement**:
Traditional AI-assisted development suffers from sequential bottlenecks: one AI conversation at a time, manual context-switching between projects, repeated explanations of project structure, and context pollution from long conversation histories. Developers managing multiple projects waste valuable time juggling contexts and waiting for one task to finish before starting another. The single-threaded nature of AI assistants becomes a productivity ceiling.

**Solution Summary**:
Gastown is an innovative AI agent orchestration framework that enables true parallelization across multiple projects. Named after frontier towns where specialized workers operate autonomously, Gastown coordinates distributed AI "workers" (called polecats) across independent project workspaces (called rigs). It treats AI agents as ephemeral, single-task contractors that spawn fresh with exactly the context they need, execute work autonomously, and disappear—enabling simultaneous development across an entire project portfolio.

**Key Features**:
- **Multi-Project Orchestration**: Coordinate work across multiple independent projects (rigs) simultaneously—wheeltracker, mealplanner, and personalsite are current active rigs
- **Ephemeral Worker Model**: Polecats are disposable AI agents that spawn fresh for each task with zero context pollution, execute work, and self-destruct
- **The Propulsion Principle (GUPP)**: Revolutionary autonomous execution—if work appears on an agent's "hook," they execute immediately without waiting for approval, treating the system like a steam engine
- **CLAUDE.md Context Injection**: Each rig maintains a master context file automatically injected into every polecat, ensuring consistent quality without repetition
- **Convoy Pattern**: Batch related tasks for parallel execution with unified progress tracking across features
- **Mayor Coordination**: Central orchestration agent breaks down PRDs into distributable work units and dispatches to polecats
- **Automated Integration Pipeline**: Refinery agent processes merge queue with code review and verification before integration
- **Distributed Monitoring**: Deacon (town-level health), Witness (per-rig monitoring), and Daemon (background services) ensure system reliability
- **Structured Work Management**: Beads system for granular task tracking with cross-rig coordination

**Technical Highlights**:
- **Architecture**: Distributed workforce model with ephemeral workers, persistent context, and event-driven dispatch
- **Agent Roles**: Mayor (coordinator), Polecats (workers), Deacon (health monitor), Witness (activity tracker), Refinery (code reviewer), Daemon (background service)
- **Tech Stack Across Rigs**: Next.js 15+, React 19, TypeScript, PostgreSQL, Prisma, Tailwind CSS, NextAuth, Vitest, Playwright
- **Work Distribution**: PRD → Mayor → Convoys → Polecats → Refinery → Integration
- **Session Management**: Mandatory completion protocol (tests, commit, push, quality gates)
- **CLI Interface**: `gt` command suite for rig management, polecat spawning, mail/messaging, work dispatch
- **Configuration**: JSON-based (town.json, rigs.json, daemon.json) with per-rig CLAUDE.md context files

**Impact & Results**:
- **True Parallelization**: Multiple AI agents working simultaneously across different projects, eliminating sequential bottlenecks
- **Fresh Context, Every Time**: Zero context pollution—each polecat starts with exactly what it needs via CLAUDE.md injection
- **Autonomous Execution**: GUPP principle enables continuous progress even when humans are AFK
- **Multi-Project Productivity**: Demonstrated success managing three production rigs (wheeltracker options tracker, mealplanner AI agent, personal website)
- **Innovative Architecture**: First-of-its-kind framework treating AI agents as distributed, ephemeral workers with centralized coordination
- **Developer Experience**: Hybrid approach complementing quick iterations (anti-gravity/Google Gemini) with structured Gastown workflows

**Live Demo**: [Not applicable - framework/tooling]
**Source Code**: [Link to GitHub]
**Blog Post**: Read about the Gastown workflow on the blog
**Tech Stack**: Custom Framework · CLI · Node.js · JSON Configuration · AI Agent Orchestration

---

### Project 2: Wheel Tracker

**Tagline**: "Sophisticated options trading tracker for the wheel strategy"

**Problem Statement**:
Options traders using the wheel strategy need a comprehensive tool to track trades across multiple cycles, calculate complex profit/loss metrics, manage assigned positions, and benchmark performance against market indices. Existing solutions are either too complex, too simplistic, or don't understand the nuances of the wheel strategy.

**Solution Summary**:
Wheel Tracker is a production-ready Next.js application that provides end-to-end tracking for options traders. It manages the complete wheel cycle—from selling cash-secured PUTs, to managing assigned stock positions, to selling covered CALLs—with sophisticated P&L calculations, real-time price tracking, and performance analytics.

**Key Features**:
- **Complete Wheel Cycle Tracking**: Manages PUTs, stock positions, and CALLs with relationship tracking between trades
- **Advanced Analytics**: Real-time P&L calculations (realized vs. unrealized), win rate tracking, and performance metrics by ticker
- **Expiration Calendar**: Color-coded ITM/OTM/ATM status with batch operations for managing upcoming expirations
- **Market Benchmarking**: Compare portfolio performance against SPY, QQQ, and VTI indices
- **Live Price Integration**: Real-time stock prices via Alpha Vantage API with automated daily updates
- **Tax-Ready Exports**: Export trade history to CSV for tax preparation

**Technical Highlights**:
- **Frontend**: Next.js 15, React 19, TypeScript 5.7, Tailwind CSS
- **Backend**: PostgreSQL 16, Prisma ORM, NextAuth.js authentication
- **Testing**: 409+ passing tests with comprehensive unit, integration, and E2E coverage
- **Performance**: Lighthouse scores of 97-99/100, FCP under 1 second
- **Design System**: Complete UI component library with 68+ component tests
- **Deployment**: Docker containerization, Vercel/Railway/Netlify support

**Impact & Results**:
- Production-ready application with WCAG accessibility compliance
- Zero Cumulative Layout Shift for optimal user experience
- Comprehensive documentation including user guides and developer docs
- Built for individual traders seeking income generation through systematic trading

**Live Demo**: [Link to demo]
**Source Code**: [Link to GitHub]
**Tech Stack**: Next.js · React · TypeScript · PostgreSQL · Prisma · Tailwind CSS

---

### Project 3: Meal Planner Agent

**Tagline**: "AI-powered meal planning that saves time and reduces decision fatigue"

**Problem Statement**:
Busy professionals, families, and health-conscious individuals face the daily challenge of "what's for dinner?" Traditional meal planning is time-consuming, requires nutritional knowledge, and becomes repetitive. People need a solution that automates meal planning while respecting dietary preferences, nutrition goals, and household dynamics.

**Solution Summary**:
Meal Planner Agent is an AI-powered web application that leverages Claude AI to generate personalized, nutritious weekly meal plans. It automates the entire meal planning process—from recipe generation to shopping list creation—while adapting to individual preferences, dietary restrictions, and nutritional targets.

**Key Features**:
- **AI-Powered Generation**: Uses Claude Sonnet 4 to create personalized meal plans with detailed recipes and nutrition information
- **Household-Based Planning**: Share meal plans across family members while maintaining individual nutrition preferences
- **Smart Shopping Lists**: Automatic ingredient aggregation, categorization, and HEB grocery integration with product links
- **Recipe Favorites System**: Bookmark and save favorite recipes for quick reuse
- **Automated Email Delivery**: Beautifully formatted meal plans sent to all household members automatically
- **Scheduled Generation**: Configure automatic weekly meal plan generation on preferred days
- **Nutrition Optimization**: Set protein targets, calorie limits, and dietary restrictions (vegetarian, vegan, gluten-free)
- **Real-Time Progress**: Live progress tracking (0-100%) during meal plan generation

**Technical Highlights**:
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **AI Integration**: Anthropic SDK with Claude Sonnet 4, structured JSON output, context-aware generation
- **Backend**: Node.js, PostgreSQL, Prisma ORM, Redis, BullMQ job queue
- **Architecture**: Monorepo structure (web app, core agent logic, database, queue worker)
- **Email System**: Nodemailer with Gmail SMTP, HTML email templates
- **Web Integration**: Puppeteer for HEB web scraping and recipe exploration
- **Queue System**: BullMQ with rate limiting (10 jobs/min), concurrent processing, persistent storage
- **Marketing**: Google Analytics 4, GitHub webhook automation, SEO optimization

**Impact & Results**:
- Multi-tenant architecture with complete data isolation
- Production-grade testing infrastructure (E2E, unit, integration)
- Scalable worker architecture with job failure recovery
- Version 2.0.0 with household planning and favorites system
- Comprehensive marketing strategy with defined customer personas

**Live Demo**: [Link to demo]
**Source Code**: [Link to GitHub]
**Tech Stack**: Next.js · React · TypeScript · Claude AI · PostgreSQL · Redis · BullMQ

---

## Page Structure & Layout

### Header Section
```
Projects
[Subtitle: From AI orchestration to production apps—building solutions that solve real problems]
```

### Project Grid
- Three-column layout on desktop (collapses to two-column on tablet, single column on mobile)
- Project cards with consistent structure and visual hierarchy
- Each card should be self-contained but visually connected
- Gastown featured prominently as flagship innovation project with distinct visual treatment (e.g., subtle border, "Featured" badge, or slightly larger card)
- Consider ordering: Gastown first (innovation), then Wheel Tracker and Meal Planner Agent (production apps)

### Project Card Components

Each project card should include:

1. **Project Image/Screenshot** (top of card)
   - High-quality screenshot or hero image
   - Aspect ratio: 16:9
   - Alt text for accessibility

2. **Project Header**
   - Project title (H2)
   - Tagline/subtitle
   - Tech stack badges (small, colorful pills)

3. **Problem/Solution**
   - Brief problem statement (2-3 sentences)
   - Solution overview (2-3 sentences)

4. **Key Features** (collapsible or always visible)
   - 4-6 bullet points highlighting main features
   - Icon or emoji for visual interest

5. **Technical Highlights** (optional section, collapsible)
   - Architecture overview
   - Notable technical achievements
   - Performance metrics

6. **Call-to-Action Buttons**
   - "View Live Demo" (primary button) - for user-facing apps
   - "Read Blog Post" (primary button) - for Gastown to link to blog post
   - "View Source Code" (secondary button)
   - "Learn More" (tertiary, expands card details)

## Design Requirements

### Visual Design
- **Consistency**: Match existing site design system (Hero, Navigation styles)
- **Typography**: Use existing font hierarchy (Noto Sans)
- **Color Scheme**: Align with site theme (support light/dark mode via ThemeProvider)
- **Spacing**: Generous whitespace between cards, consistent padding
- **Responsive**: Mobile-first design with breakpoints at 640px, 768px, 1024px

### Interactive Elements
- **Hover States**: Subtle elevation/shadow on project cards
- **Animations**: Smooth transitions for expandable sections
- **Loading States**: Skeleton screens while images load
- **Focus States**: Keyboard navigation support with visible focus indicators

### Accessibility
- **WCAG 2.1 AA Compliance**: Minimum contrast ratios, semantic HTML
- **Screen Readers**: Proper ARIA labels, alt text for images
- **Keyboard Navigation**: Tab order, enter/space for interactions
- **Skip Links**: Allow users to skip to main content

## Technical Requirements

### Page Structure
```
/app/projects/page.tsx - Main projects page
/app/projects/ProjectCard.tsx - Reusable project card component
/app/projects/projects.module.css - Page-specific styles
/app/config/projects.ts - Project data configuration
/public/images/projects/ - Project screenshots and images
```

### Data Structure
```typescript
interface Project {
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
  };
  stats?: {
    label: string;
    value: string;
  }[];
}
```

### Metadata
```typescript
export const metadata: Metadata = {
  title: "Projects - Brian Griffey",
  description: "Explore innovative projects from AI agent orchestration frameworks to production web apps. Featuring Gastown (multi-project AI coordination), Wheel Tracker (options trading), and Meal Planner Agent (AI-powered meal planning).",
  openGraph: {
    title: "Projects - Brian Griffey",
    description: "Explore innovative projects from AI agent orchestration frameworks to production web apps. Featuring Gastown (multi-project AI coordination), Wheel Tracker (options trading), and Meal Planner Agent (AI-powered meal planning).",
    type: "website",
  },
};
```

### Performance Requirements
- **Images**: Next.js Image component with lazy loading, responsive srcsets
- **Code Splitting**: Lazy load expandable sections if heavy
- **Bundle Size**: Keep page JS bundle under 100KB
- **First Contentful Paint**: Target under 1.5s
- **Lighthouse Score**: Target 90+ for Performance, Accessibility, Best Practices, SEO

## User Stories

### As a Recruiter
- I want to quickly understand what projects Brian has built so I can evaluate his technical skills
- I want to see live demos so I can experience the applications firsthand
- I want to see tech stacks so I can match his skills to job requirements

### As a Fellow Developer
- I want to view source code so I can learn from implementation details
- I want to understand technical architecture so I can assess code quality
- I want to see testing and performance metrics so I can evaluate engineering rigor

### As a Potential User
- I want to understand what problems each project solves so I can determine if it's useful to me
- I want to access live demos so I can try the applications
- I want to see key features so I can quickly assess value

### As a Hiring Manager
- I want to see project complexity and scope so I can gauge experience level
- I want to understand problem-solving approach so I can evaluate thought process
- I want to see production-ready features (testing, deployment, accessibility) so I can assess professional maturity

## Acceptance Criteria

### Must Have (P0)
- [ ] `/projects` page exists and is accessible from home page "View Projects" button
- [ ] Page displays all three projects: Gastown, Wheel Tracker, and Meal Planner Agent
- [ ] Gastown is prominently featured as the flagship innovation project
- [ ] Each project card includes: title, tagline, image, problem/solution, features, tech stack, CTA buttons
- [ ] Page is fully responsive (mobile, tablet, desktop)
- [ ] Supports light/dark theme via existing ThemeProvider
- [ ] Passes WCAG 2.1 AA accessibility standards
- [ ] Images are optimized using Next.js Image component
- [ ] Page metadata is configured for SEO
- [ ] Lighthouse scores 90+ across all categories

### Should Have (P1)
- [ ] Expandable "Key Features" and "Technical Highlights" sections
- [ ] Tech stack badges with consistent styling
- [ ] Hover animations on project cards
- [ ] Skeleton loading states for images
- [ ] Stats/metrics display (performance, tests, etc.)
- [ ] Smooth scroll animations when navigating to page
- [ ] "Back to Top" button for long page scroll

### Could Have (P2)
- [ ] Filter projects by tech stack (if more projects added)
- [ ] Search functionality (future-proofing)
- [ ] Project comparison view
- [ ] Individual project detail pages (`/projects/[slug]`)
- [ ] Integration with GitHub API to show live stats (stars, forks, last commit)
- [ ] Testimonials or usage statistics for projects

### Won't Have (Out of Scope)
- [ ] Blog posts about projects (covered by existing blog)
- [ ] Video demos or tutorials
- [ ] User comments or ratings
- [ ] Project roadmaps or changelogs (can link to GitHub)

## Success Metrics

### User Engagement
- **Click-through Rate**: % of home page visitors who click "View Projects"
- **Demo Clicks**: % of projects page visitors who click "View Demo"
- **GitHub Clicks**: % of projects page visitors who view source code
- **Time on Page**: Average session duration on projects page

### Technical Performance
- **Page Load Time**: First Contentful Paint under 1.5s
- **Lighthouse Scores**: 90+ across all categories
- **Mobile Performance**: Consistent experience across devices
- **Accessibility Score**: 100/100

### SEO Performance
- **Organic Traffic**: Projects page appears in search results for relevant queries
- **Bounce Rate**: Under 50% (indicates engaging content)
- **Page Indexing**: Successfully indexed by search engines

## Implementation Phases

### Phase 1: Foundation (Week 1)
- Create `/app/projects/page.tsx` basic structure
- Set up project data configuration file
- Implement ProjectCard component with basic layout
- Add placeholder images and content
- Ensure responsive layout works

### Phase 2: Content & Polish (Week 2)
- Add real project screenshots/images
- Implement expandable sections
- Add hover states and animations
- Implement tech stack badges
- Add stats/metrics display
- Ensure accessibility compliance

### Phase 3: Optimization & Testing (Week 3)
- Optimize images and performance
- Add skeleton loading states
- Test across devices and browsers
- Conduct accessibility audit
- Run Lighthouse audits and optimize
- Add analytics tracking

### Phase 4: Launch & Monitor (Week 4)
- Deploy to production
- Monitor performance metrics
- Gather user feedback
- Iterate based on analytics

## Open Questions

1. **Project Images**:
   - Do we have high-quality screenshots of Wheel Tracker and Meal Planner Agent applications?
   - For Gastown: Should we create an architecture diagram or visual representation of the orchestration framework instead of a screenshot?
   - If not, should we create them or use placeholder graphics?
2. **Live Demos**:
   - Are Wheel Tracker and Meal Planner Agent deployed and accessible? What are the demo URLs?
   - For Gastown: Blog post exists—should the CTA link to the blog post about Gastown workflow?
3. **GitHub Links**: Are the GitHub repositories public? What are the repository URLs?
4. **Additional Projects**: Should we design for scalability if more projects (rigs) are added in the future?
5. **Project Order**: Recommended: Gastown first (innovation), then apps. Confirm this ordering.
6. **Privacy**: Any sensitive information in screenshots that should be redacted?
7. **Gastown Visual Treatment**: How should we visually distinguish Gastown as the flagship/featured project? Badge, border, size?

## Dependencies

- Existing design system (Button, Badge components)
- ThemeProvider for light/dark mode support
- Next.js Image component for optimized images
- Project screenshots/images (to be created or sourced)
- Live demo URLs (if available)
- GitHub repository URLs (if public)

## References

- [Hero Component](/components/Hero/Hero.tsx) - For consistent CTA button styling
- [Navigation Component](/components/Navigation/Navigation.tsx) - For page header inspiration
- [Blog Page](/app/blog/page.tsx) - For card layout patterns
- [Causes Page](/app/causes/page.tsx) - For similar card-based layout

## Notes

This PRD is based on thorough exploration of all three projects: Gastown (the AI orchestration framework), Wheel Tracker, and Meal Planner Agent. The project descriptions accurately reflect the technical implementation, features, and capabilities as they exist in their respective codebases.

**Gastown** represents a paradigm shift in AI-assisted development, showcasing innovation in distributed systems and agent orchestration. **Wheel Tracker** and **Meal Planner Agent** are production-grade applications demonstrating full-stack development, with Wheel Tracker being a "rig" (autonomous project workspace) and Meal Planner Agent being another "rig" within the Gastown ecosystem. Together, these projects demonstrate:

- **Innovation**: Novel approaches to AI agent coordination and autonomous execution
- **Production Quality**: Comprehensive testing, accessibility compliance, performance optimization
- **Full-Stack Expertise**: Modern tech stacks across frontend, backend, databases, AI integration
- **System Thinking**: Understanding of distributed systems, work orchestration, and developer experience

The projects page should position Brian as both an innovative thinker (Gastown framework) and a skilled implementer (production apps built using that framework).
