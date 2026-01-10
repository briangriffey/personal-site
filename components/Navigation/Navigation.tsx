'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

/**
 * Navigation Component Props
 */
export interface NavigationProps {
  /** Optional custom class name */
  className?: string;
}

/**
 * Navigation Component
 *
 * Main site navigation with links to Home and Blog.
 * Features a responsive mobile menu, current page indicator,
 * and accessible keyboard navigation.
 */
export default function Navigation({ className = '' }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Close mobile menu when a link is clicked
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Check if a link is active
  const isActive = (path: string): boolean => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(path) ?? false;
  };

  return (
    <nav
      className={`${styles.navigation} ${className}`}
      aria-label="Main navigation"
    >
      <div className={styles.container}>
        {/* Logo / Site Name */}
        <Link
          href="/"
          className={styles.logo}
          aria-label="Home - Brian Griffey"
        >
          Brian Griffey
        </Link>

        {/* Desktop Navigation Links */}
        <div className={styles.desktopMenu} aria-label="Desktop navigation">
          <Link
            href="/"
            className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
            aria-current={isActive('/') ? 'page' : undefined}
          >
            Home
          </Link>
          <Link
            href="/blog"
            className={`${styles.navLink} ${isActive('/blog') ? styles.active : ''}`}
            aria-current={isActive('/blog') ? 'page' : undefined}
          >
            Blog
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-controls="mobile-menu"
        >
          <span className={styles.hamburger}>
            <span
              className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLineOpen : ''}`}
            />
            <span
              className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLineOpen : ''}`}
            />
            <span
              className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLineOpen : ''}`}
            />
          </span>
        </button>

        {/* Mobile Navigation Menu */}
        <div
          id="mobile-menu"
          className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <Link
            href="/"
            className={`${styles.mobileNavLink} ${isActive('/') ? styles.active : ''}`}
            onClick={closeMobileMenu}
            aria-current={isActive('/') ? 'page' : undefined}
          >
            Home
          </Link>
          <Link
            href="/blog"
            className={`${styles.mobileNavLink} ${isActive('/blog') ? styles.active : ''}`}
            onClick={closeMobileMenu}
            aria-current={isActive('/blog') ? 'page' : undefined}
          >
            Blog
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className={styles.overlay}
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </nav>
  );
}
