import React from 'react';
import styles from './SkipLink.module.css';

/**
 * Skip Navigation Link Component
 *
 * Provides a hidden link that becomes visible on focus,
 * allowing keyboard users to skip directly to main content.
 * Essential for WCAG 2.1 AA compliance.
 */
export default function SkipLink() {
  return (
    <a href="#main-content" className={styles.skipLink}>
      Skip to main content
    </a>
  );
}
