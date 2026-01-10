/**
 * ContactSection Component
 * Main contact section that displays email and social links in an organized layout
 */

'use client';

import SocialLink from './SocialLink';
import { contactConfig, getSocialLinks, getEmailLink } from '../config/contact';

export default function ContactSection() {
  const socialLinks = getSocialLinks();
  const emailLink = getEmailLink();

  return (
    <section
      id="contact"
      style={{
        padding: '3rem 2rem',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        <h2
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: '1rem',
            color: '#111',
          }}
        >
          Get in Touch
        </h2>
        <p
          style={{
            fontSize: '1.125rem',
            color: '#666',
            marginBottom: '2rem',
          }}
        >
          Feel free to reach out via email or connect with me on social media.
        </p>
      </div>

      {/* Email Section */}
      <div
        style={{
          marginBottom: '2.5rem',
          textAlign: 'center',
        }}
      >
        <h3
          style={{
            fontSize: '1.125rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
            color: '#333',
          }}
        >
          Email
        </h3>
        <a
          href={emailLink}
          style={{
            fontSize: '1.25rem',
            color: '#0070f3',
            textDecoration: 'none',
            fontWeight: 500,
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#0051cc';
            e.currentTarget.style.textDecoration = 'underline';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#0070f3';
            e.currentTarget.style.textDecoration = 'none';
          }}
        >
          {contactConfig.email}
        </a>
      </div>

      {/* Social Links Section */}
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <h3
          style={{
            fontSize: '1.125rem',
            fontWeight: 600,
            marginBottom: '1rem',
            color: '#333',
          }}
        >
          Connect
        </h3>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {socialLinks.map((link) => (
            <SocialLink key={link.name} href={link.url} label={link.label}>
              {link.name}
            </SocialLink>
          ))}
        </div>
      </div>
    </section>
  );
}
