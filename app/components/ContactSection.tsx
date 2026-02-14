/**
 * ContactSection Component
 * Main contact section that displays email and social links in an organized layout
 */

'use client';

import SocialLink from './SocialLink';
import { getSocialLinks } from '../config/contact';

export default function ContactSection() {
  const socialLinks = getSocialLinks();

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
            marginBottom: '1rem',
          }}
        >
          Get in Touch
        </h2>
        <p
          style={{
            fontSize: '1.125rem',
            marginBottom: '2rem',
          }}
        >
          Connect with me on social media.
        </p>
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
            marginBottom: '1rem',
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
