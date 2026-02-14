'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button/Button';
import type { Project } from '@/app/config/projects';
import styles from './ProjectCard.module.css';

/**
 * ProjectCard Component Props
 */
export interface ProjectCardProps {
  /** Project data to display */
  project: Project;
  /** Optional custom class name */
  className?: string;
}

/**
 * ProjectCard Component
 *
 * Displays a card for a portfolio project.
 * Shows the project image, title, tagline, tech stack, problem/solution,
 * features, and call-to-action buttons.
 * Supports expandable sections for features and technical highlights.
 */
export default function ProjectCard({ project, className = '' }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [techExpanded, setTechExpanded] = useState(false);

  return (
    <article
      className={`${styles.card} ${project.featured ? styles.featured : ''} ${className}`}
      aria-label={`Project: ${project.title}`}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className={styles.featuredBadge} aria-label="Featured project">
          Featured
        </div>
      )}

      {/* Project Image */}
      <div className={styles.imageContainer}>
        {!imageError ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className={styles.image}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true">
            <span className={styles.placeholderIcon}>
              {project.title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className={styles.content}>
        {/* Project Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>{project.title}</h2>
          <p className={styles.tagline}>{project.tagline}</p>

          {/* Tech Stack Badges */}
          <div className={styles.techStack} aria-label="Technologies used">
            {project.techStack.map((tech) => (
              <span key={tech} className={styles.techBadge}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Problem/Solution */}
        <div className={styles.problemSolution}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Problem</h3>
            <p className={styles.sectionText}>{project.problem}</p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Solution</h3>
            <p className={styles.sectionText}>{project.solution}</p>
          </div>
        </div>

        {/* Key Features - Expandable */}
        <div className={styles.expandableSection}>
          <button
            className={styles.expandButton}
            onClick={() => setFeaturesExpanded(!featuresExpanded)}
            aria-expanded={featuresExpanded}
            aria-controls={`features-${project.id}`}
          >
            <span className={styles.expandButtonText}>Key Features</span>
            <span className={styles.expandIcon} aria-hidden="true">
              {featuresExpanded ? '−' : '+'}
            </span>
          </button>

          {featuresExpanded && (
            <ul
              id={`features-${project.id}`}
              className={styles.featuresList}
            >
              {project.features.map((feature, index) => (
                <li key={index} className={styles.featureItem}>
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Technical Highlights - Expandable */}
        <div className={styles.expandableSection}>
          <button
            className={styles.expandButton}
            onClick={() => setTechExpanded(!techExpanded)}
            aria-expanded={techExpanded}
            aria-controls={`tech-${project.id}`}
          >
            <span className={styles.expandButtonText}>Technical Highlights</span>
            <span className={styles.expandIcon} aria-hidden="true">
              {techExpanded ? '−' : '+'}
            </span>
          </button>

          {techExpanded && (
            <div
              id={`tech-${project.id}`}
              className={styles.techHighlights}
            >
              {project.techHighlights.frontend && project.techHighlights.frontend.length > 0 && (
                <div className={styles.techCategory}>
                  <h4 className={styles.techCategoryTitle}>Frontend</h4>
                  <ul className={styles.techList}>
                    {project.techHighlights.frontend.map((item, index) => (
                      <li key={index} className={styles.techItem}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.techHighlights.backend && project.techHighlights.backend.length > 0 && (
                <div className={styles.techCategory}>
                  <h4 className={styles.techCategoryTitle}>Backend</h4>
                  <ul className={styles.techList}>
                    {project.techHighlights.backend.map((item, index) => (
                      <li key={index} className={styles.techItem}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.techHighlights.testing && project.techHighlights.testing.length > 0 && (
                <div className={styles.techCategory}>
                  <h4 className={styles.techCategoryTitle}>Testing</h4>
                  <ul className={styles.techList}>
                    {project.techHighlights.testing.map((item, index) => (
                      <li key={index} className={styles.techItem}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.techHighlights.deployment && project.techHighlights.deployment.length > 0 && (
                <div className={styles.techCategory}>
                  <h4 className={styles.techCategoryTitle}>Deployment</h4>
                  <ul className={styles.techList}>
                    {project.techHighlights.deployment.map((item, index) => (
                      <li key={index} className={styles.techItem}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.techHighlights.unique && project.techHighlights.unique.length > 0 && (
                <div className={styles.techCategory}>
                  <h4 className={styles.techCategoryTitle}>Unique Features</h4>
                  <ul className={styles.techList}>
                    {project.techHighlights.unique.map((item, index) => (
                      <li key={index} className={styles.techItem}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Stats/Metrics - if available */}
        {project.stats && project.stats.length > 0 && (
          <div className={styles.stats}>
            {project.stats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.statValue}>{stat.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Call-to-Action Buttons */}
        <div className={styles.actions}>
          {project.links.demo && (
            <Button
              href={project.links.demo}
              variant="primary"
              ariaLabel={`View live demo of ${project.title} (opens in new tab)`}
            >
              View Live Demo
            </Button>
          )}
          {project.links.blog && (
            <Button
              href={project.links.blog}
              variant="primary"
              ariaLabel={`Read blog post about ${project.title}`}
            >
              Read Blog Post
            </Button>
          )}
          {project.links.github && (
            <Button
              href={project.links.github}
              variant="secondary"
              ariaLabel={`View source code for ${project.title} on GitHub (opens in new tab)`}
            >
              View Source Code
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
