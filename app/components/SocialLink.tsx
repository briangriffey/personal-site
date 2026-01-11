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
      className="link-inline"
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children || label}
    </a>
  );
}
