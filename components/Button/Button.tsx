import React from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

/**
 * Button Component Props
 */
export interface ButtonProps {
  /** The text displayed on the button */
  children: React.ReactNode;
  /** Button variant style */
  variant?: 'primary' | 'secondary';
  /** Optional URL for navigation (creates a link button) */
  href?: string;
  /** Optional click handler for button actions */
  onClick?: () => void;
  /** Optional aria-label for accessibility */
  ariaLabel?: string;
  /** Optional custom class name */
  className?: string;
  /** Button type (only applies when href is not provided) */
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Button Component
 *
 * A reusable button component with primary and secondary variants.
 * Can function as either a button or a link (when href is provided).
 * Supports Next.js Link for internal navigation.
 */
export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  ariaLabel,
  className = '',
  type = 'button',
}: ButtonProps) {
  const buttonClass = `${styles.button} ${styles[variant]} ${className}`;

  // If href is provided, render as a link
  if (href) {
    // Check if it's an internal link (starts with /)
    const isInternalLink = href.startsWith('/');

    if (isInternalLink) {
      return (
        <Link
          href={href}
          className={buttonClass}
          aria-label={ariaLabel}
        >
          {children}
        </Link>
      );
    }

    // External link
    return (
      <a
        href={href}
        className={buttonClass}
        aria-label={ariaLabel}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  // Render as button
  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
