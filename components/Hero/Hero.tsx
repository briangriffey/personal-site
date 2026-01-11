import React from 'react';
import Button from '../Button/Button';
import styles from './Hero.module.css';

/**
 * Hero Component Props
 */
export interface HeroProps {
  /** Optional custom class name */
  className?: string;
}

/**
 * Hero Section Component
 *
 * Displays the main hero section with name, professional role,
 * and value proposition. This is the primary landing section
 * that creates the first impression for visitors.
 */
export default function Hero({ className }: HeroProps) {
  return (
    <section
      className={`${styles.hero} ${className || ''}`}
      aria-label="Hero section"
    >
      {/* Background decorative elements */}
      <div className={styles.heroBackground} aria-hidden="true">
        <div className={styles.gradientBackground} />
        <div className={styles.decorativeCircle} />
        <div className={styles.decorativeCircle} />
        <div className={styles.decorativeCircle} />
      </div>

      {/* Main hero content */}
      <div className={styles.heroContent}>
        <div className={styles.textContent}>
          {/* Name */}
          <h1 className={styles.heading}>Brian Griffey</h1>

          {/* Professional Role */}
          <p className={styles.subheading}>
            Full-Stack Software Engineer
          </p>

          {/* Professional Tagline / Value Proposition */}
          <p className={styles.tagline}>
            Building exceptional web experiences with modern technologies.
            Passionate about creating clean, scalable solutions that make a difference.
          </p>
        </div>

        {/* CTA Container */}
        <div className={styles.ctaContainer}>
          <Button
            href="/projects"
            variant="primary"
            ariaLabel="View my projects"
          >
            View Projects
          </Button>
          <Button
            href="/contact"
            variant="secondary"
            ariaLabel="Contact me"
          >
            Contact
          </Button>
          <Button
            href="/blog"
            variant="secondary"
            ariaLabel="Read my blog"
          >
            Read Blog
          </Button>
        </div>
      </div>
    </section>
  );
}
