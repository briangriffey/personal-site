/**
 * Contact Configuration
 * Centralized configuration for contact information, email, and social links
 */

export interface SocialLink {
  name: string;
  url: string;
  label: string;
}

export interface ContactConfig {
  email: string;
  social: {
    github: SocialLink;
    linkedin: SocialLink;
  };
}

export const contactConfig: ContactConfig = {
  email: 'brian@example.com',
  social: {
    github: {
      name: 'GitHub',
      url: 'https://github.com/briangriffey',
      label: 'Follow me on GitHub',
    },
    linkedin: {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/briangriffey',
      label: 'Connect with me on LinkedIn',
    },
  },
} as const;

// Helper function to get all social links as an array
export const getSocialLinks = (): SocialLink[] => {
  return Object.values(contactConfig.social);
};

// Helper function to get email mailto link
export const getEmailLink = (): string => {
  return `mailto:${contactConfig.email}`;
};
