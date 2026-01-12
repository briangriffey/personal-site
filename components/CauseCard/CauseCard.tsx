'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './CauseCard.module.css';

/**
 * Cause Interface
 * Represents a charitable organization to showcase
 */
export interface Cause {
  /** Unique identifier for the cause */
  id: string;
  /** Display title of the organization */
  title: string;
  /** Description of why Brian supports this cause */
  description: string;
  /** Path to the cause image */
  imageUrl: string;
  /** External URL for donations */
  donateUrl: string;
}

/**
 * CauseCard Component Props
 */
export interface CauseCardProps {
  /** Cause data to display */
  cause: Cause;
  /** Optional custom class name */
  className?: string;
}

/**
 * CauseCard Component
 *
 * Displays a card for a charitable organization Brian supports.
 * Shows the organization's image, title, description, and a donation link.
 * Links open in a new tab with proper security attributes.
 */
export default function CauseCard({ cause, className = '' }: CauseCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <article
      className={`${styles.card} ${className}`}
      aria-label={`Cause: ${cause.title}`}
    >
      {/* Cause Image */}
      <div className={styles.imageContainer}>
        {!imageError ? (
          <Image
            src={cause.imageUrl}
            alt={cause.title}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className={styles.image}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true">
            <span className={styles.placeholderIcon}>
              {cause.title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className={styles.content}>
        {/* Cause Title */}
        <h2 className={styles.title}>{cause.title}</h2>

        {/* Cause Description */}
        <p className={styles.description}>{cause.description}</p>

        {/* Donate Link */}
        <a
          href={cause.donateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.donateLink}
          aria-label={`Donate to ${cause.title} (opens in new tab)`}
        >
          Donate
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </article>
  );
}
