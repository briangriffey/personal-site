'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './ExpandableSection.module.css';

export interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

/**
 * ExpandableSection Component
 *
 * A fully accessible collapsible/expandable section with:
 * - Smooth animations
 * - Keyboard support (Enter/Space to toggle)
 * - ARIA attributes for screen readers
 * - Auto-calculated height for smooth transitions
 */
export default function ExpandableSection({
  title,
  children,
  defaultExpanded = false,
  className = '',
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [height, setHeight] = useState<number | undefined>(
    defaultExpanded ? undefined : 0
  );
  const contentRef = useRef<HTMLDivElement>(null);

  // Update height when isExpanded changes
  useEffect(() => {
    if (contentRef.current) {
      if (isExpanded) {
        // Get the full scrollHeight
        setHeight(contentRef.current.scrollHeight);
      } else {
        setHeight(0);
      }
    }
  }, [isExpanded]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Toggle on Enter or Space
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleExpanded();
    }
  };

  return (
    <div className={`${styles.expandableSection} ${className}`}>
      {/* Header Button */}
      <button
        type="button"
        onClick={toggleExpanded}
        onKeyDown={handleKeyDown}
        className={styles.header}
        aria-expanded={isExpanded}
        aria-controls={`expandable-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <h3 className={styles.title}>{title}</h3>
        <span
          className={`${styles.icon} ${isExpanded ? styles.iconExpanded : ''}`}
          aria-hidden="true"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {/* Expandable Content */}
      <div
        id={`expandable-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
        ref={contentRef}
        className={styles.content}
        style={{
          height: height !== undefined ? `${height}px` : 'auto',
        }}
        aria-hidden={!isExpanded}
      >
        <div className={styles.contentInner}>{children}</div>
      </div>
    </div>
  );
}
