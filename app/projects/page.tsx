import type { Metadata } from 'next';
import { projects } from '../config/projects';
import ProjectCard from './ProjectCard';
import styles from './projects.module.css';

export const metadata: Metadata = {
  title: 'Projects - Brian Griffey',
  description:
    'Explore innovative projects from AI agent orchestration frameworks to production web apps. Featuring Gastown (multi-project AI coordination), Wheel Tracker (options trading), and Meal Planner Agent (AI-powered meal planning).',
  openGraph: {
    title: 'Projects - Brian Griffey',
    description:
      'Explore innovative projects from AI agent orchestration frameworks to production web apps. Featuring Gastown (multi-project AI coordination), Wheel Tracker (options trading), and Meal Planner Agent (AI-powered meal planning).',
    type: 'website',
  },
};

export default function ProjectsPage() {
  return (
    <main id="main-content" className={styles.container}>
      {/* Header Section */}
      <header className={styles.header}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.subtitle}>
          From AI orchestration to production apps—building solutions that solve real problems
        </p>
      </header>

      {/* Projects Grid */}
      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  );
}
