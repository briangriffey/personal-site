/**
 * SocialLink Component
 * Reusable component for external social links with proper security attributes
 */

'use client';

import type { ReactNode } from 'react';

export interface SocialLinkProps {
  href: string;
  label: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export default function SocialLink({
  href,
  label,
  icon,
  children,
}: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.25rem',
        color: '#0070f3',
        textDecoration: 'none',
        border: '1px solid #eaeaea',
        borderRadius: '0.5rem',
        transition: 'all 0.2s ease',
        fontSize: '1rem',
        fontWeight: 500,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#0070f3';
        e.currentTarget.style.backgroundColor = '#f8f9fa';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#eaeaea';
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children || label}
    </a>
  );
}
