'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { Project } from '../config/projects';
import styles from './ProjectCard.module.css';

export interface ProjectCardProps {
  project: Project;
}

/**
 * ProjectCard Component
 *
 * Displays a project card with optimized images, skeleton loading,
 * and responsive behavior. Uses Next.js Image component for
 * automatic optimization, lazy loading, and responsive srcsets.
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <article
      className={`${styles.card} ${project.featured ? styles.featured : ''}`}
      aria-label={`Project: ${project.title}`}
    >
      {/* Project Image with Skeleton Loading */}
      <div className={styles.imageContainer}>
        {/* Skeleton loader shown while image loads */}
        {!imageLoaded && !imageError && (
          <div className={styles.skeleton} aria-label="Loading image">
            <div className={styles.skeletonShimmer} />
          </div>
        )}

        {/* Optimized Image with Next.js Image component */}
        {!imageError ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`${styles.image} ${imageLoaded ? styles.imageLoaded : styles.imageLoading}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
            quality={90}
          />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true">
            <span className={styles.placeholderIcon}>
              {project.title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* Featured Badge */}
        {project.featured && (
          <div className={styles.featuredBadge} aria-label="Featured project">
            <span>★ Featured</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className={styles.content}>
        {/* Project Header */}
        <header className={styles.cardHeader}>
          <h2 className={styles.projectTitle}>{project.title}</h2>
          <p className={styles.tagline}>{project.tagline}</p>
        </header>

        {/* Tech Stack Badges */}
        <div className={styles.techStack} aria-label="Technologies used">
          {project.techStack.map((tech) => (
            <span key={tech} className={styles.techBadge}>
              {tech}
            </span>
          ))}
        </div>

        {/* Problem/Solution */}
        <div className={styles.description}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Problem</h3>
            <p className={styles.sectionText}>{project.problem}</p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Solution</h3>
            <p className={styles.sectionText}>{project.solution}</p>
          </div>
        </div>

        {/* Key Features */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Key Features</h3>
          <ul className={styles.featureList}>
            {project.features.slice(0, 4).map((feature, index) => (
              <li key={index} className={styles.featureItem}>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Stats */}
        {project.stats && project.stats.length > 0 && (
          <div className={styles.stats}>
            {project.stats.slice(0, 3).map((stat, index) => (
              <div key={index} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* CTA Buttons */}
        <div className={styles.actions}>
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.button} ${styles.buttonPrimary}`}
              aria-label={`View live demo of ${project.title}`}
            >
              View Live Demo
            </a>
          )}
          {project.links.blog && (
            <a
              href={project.links.blog}
              className={`${styles.button} ${styles.buttonPrimary}`}
              aria-label={`Read blog post about ${project.title}`}
            >
              Read Blog Post
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.button} ${styles.buttonSecondary}`}
              aria-label={`View source code for ${project.title} on GitHub`}
            >
              View Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
