import React from 'react';
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
    <section className={`${styles.hero} ${className || ''}`}>
      {/* Background decorative elements */}
      <div className={styles.heroBackground}>
        <div className={styles.gradientBackground} />
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

        {/* CTA Container - will be populated in next subtask */}
        <div className={styles.ctaContainer}>
          {/* CTAs will be added in subtask 2.2 */}
        </div>
      </div>
    </section>
  );
}
