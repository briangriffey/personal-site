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
            marginBottom: '0.75rem',
          }}
        >
          Email
        </h3>
        <a
          href={emailLink}
          className="link-inline"
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
