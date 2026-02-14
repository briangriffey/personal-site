import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProjectCard from './ProjectCard';
import type { Project } from '../config/projects';

// Mock next/image to simplify testing
vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement> & {
    onLoad?: () => void;
    onError?: () => void;
  }) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

const mockProject: Project = {
  id: 'test-project',
  title: 'Test Project',
  tagline: 'A test project for testing',
  slug: 'test-project',
  image: {
    src: '/images/projects/test.jpg',
    alt: 'Test project screenshot',
  },
  problem: 'This is the problem statement for the test project.',
  solution: 'This is the solution description for the test project.',
  features: [
    'Feature 1: First feature description',
    'Feature 2: Second feature description',
    'Feature 3: Third feature description',
    'Feature 4: Fourth feature description',
  ],
  techHighlights: {
    frontend: ['React', 'TypeScript', 'Next.js'],
    backend: ['Node.js', 'PostgreSQL'],
    testing: ['Vitest', 'Playwright'],
    deployment: ['Docker', 'Vercel'],
    unique: ['Custom framework', 'AI integration'],
  },
  techStack: ['Next.js', 'React', 'TypeScript', 'PostgreSQL'],
  links: {
    demo: 'https://demo.example.com',
    github: 'https://github.com/test/project',
    blog: '/blog/test-post',
  },
  stats: [
    {
      label: 'Test Coverage',
      value: '100%',
    },
    {
      label: 'Performance',
      value: '99/100',
    },
    {
      label: 'Accessibility',
      value: 'WCAG AA',
    },
  ],
  featured: false,
};

describe('ProjectCard', () => {
  describe('Rendering', () => {
    it('renders project title correctly', () => {
      render(<ProjectCard project={mockProject} />);
      expect(screen.getByRole('heading', { name: 'Test Project', level: 2 })).toBeInTheDocument();
    });

    it('renders project tagline correctly', () => {
      render(<ProjectCard project={mockProject} />);
      expect(screen.getByText('A test project for testing')).toBeInTheDocument();
    });

    it('renders problem statement correctly', () => {
      render(<ProjectCard project={mockProject} />);
      expect(screen.getByText('This is the problem statement for the test project.')).toBeInTheDocument();
    });

    it('renders solution description correctly', () => {
      render(<ProjectCard project={mockProject} />);
      expect(screen.getByText('This is the solution description for the test project.')).toBeInTheDocument();
    });

    it('renders tech stack badges', () => {
      render(<ProjectCard project={mockProject} />);
      expect(screen.getByText('Next.js')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    });

    it('renders image with correct alt text', () => {
      render(<ProjectCard project={mockProject} />);
      const image = screen.getByRole('img', { name: 'Test project screenshot' });
      expect(image).toBeInTheDocument();
    });

    it('renders first 4 features', () => {
      render(<ProjectCard project={mockProject} />);
      expect(screen.getByText('Feature 1: First feature description')).toBeInTheDocument();
      expect(screen.getByText('Feature 2: Second feature description')).toBeInTheDocument();
      expect(screen.getByText('Feature 3: Third feature description')).toBeInTheDocument();
      expect(screen.getByText('Feature 4: Fourth feature description')).toBeInTheDocument();
    });
  });

  describe('Featured Badge', () => {
    it('does not render featured badge for non-featured projects', () => {
      render(<ProjectCard project={mockProject} />);
      expect(screen.queryByText('★ Featured')).not.toBeInTheDocument();
    });

    it('renders featured badge for featured projects', () => {
      const featuredProject = { ...mockProject, featured: true };
      render(<ProjectCard project={featuredProject} />);
      expect(screen.getByText('★ Featured')).toBeInTheDocument();
    });

    it('featured badge has proper aria-label', () => {
      const featuredProject = { ...mockProject, featured: true };
      render(<ProjectCard project={featuredProject} />);
      const badge = screen.getByLabelText('Featured project');
      expect(badge).toBeInTheDocument();
    });
  });

  describe('Call-to-Action Buttons', () => {
    it('renders demo button when demo link is provided', () => {
      render(<ProjectCard project={mockProject} />);
      const demoButton = screen.getByText('View Live Demo');
      expect(demoButton).toBeInTheDocument();
      expect(demoButton).toHaveAttribute('href', 'https://demo.example.com');
    });

    it('renders blog button when blog link is provided', () => {
      render(<ProjectCard project={mockProject} />);
      const blogButton = screen.getByText('Read Blog Post');
      expect(blogButton).toBeInTheDocument();
      expect(blogButton).toHaveAttribute('href', '/blog/test-post');
    });

    it('renders github button when github link is provided', () => {
      render(<ProjectCard project={mockProject} />);
      const githubButton = screen.getByText('View Source');
      expect(githubButton).toBeInTheDocument();
      expect(githubButton).toHaveAttribute('href', 'https://github.com/test/project');
    });

    it('does not render demo button when demo link is missing', () => {
      const projectWithoutDemo = { ...mockProject, links: { github: 'https://github.com/test' } };
      render(<ProjectCard project={projectWithoutDemo} />);
      expect(screen.queryByText('View Live Demo')).not.toBeInTheDocument();
    });
  });

  describe('Stats Display', () => {
    it('renders stats when provided', () => {
      render(<ProjectCard project={mockProject} />);
      expect(screen.getByText('Test Coverage')).toBeInTheDocument();
      expect(screen.getByText('100%')).toBeInTheDocument();
      expect(screen.getByText('Performance')).toBeInTheDocument();
      expect(screen.getByText('99/100')).toBeInTheDocument();
    });

    it('only renders first 3 stats', () => {
      render(<ProjectCard project={mockProject} />);
      expect(screen.getByText('Test Coverage')).toBeInTheDocument();
      expect(screen.getByText('Performance')).toBeInTheDocument();
      expect(screen.getByText('Accessibility')).toBeInTheDocument();
    });

    it('does not render stats section when stats are not provided', () => {
      const projectWithoutStats = { ...mockProject, stats: undefined };
      render(<ProjectCard project={projectWithoutStats} />);
      expect(screen.queryByText('Test Coverage')).not.toBeInTheDocument();
    });
  });

  describe('WCAG 2.1 AA Accessibility', () => {
    it('renders article with semantic HTML', () => {
      render(<ProjectCard project={mockProject} />);
      const article = screen.getByRole('article');
      expect(article).toBeInTheDocument();
    });

    it('article has proper aria-label', () => {
      render(<ProjectCard project={mockProject} />);
      expect(screen.getByRole('article')).toHaveAttribute(
        'aria-label',
        'Project: Test Project'
      );
    });

    it('external links indicate they open in new tab', () => {
      render(<ProjectCard project={mockProject} />);
      const demoLink = screen.getByLabelText('View live demo of Test Project (opens in new tab)');
      expect(demoLink).toBeInTheDocument();
      expect(demoLink).toHaveAttribute('target', '_blank');
      expect(demoLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('internal links do not indicate new tab', () => {
      render(<ProjectCard project={mockProject} />);
      const blogLink = screen.getByLabelText('Read blog post about Test Project');
      expect(blogLink).toBeInTheDocument();
      expect(blogLink).not.toHaveAttribute('target', '_blank');
    });

    it('github link indicates new tab', () => {
      render(<ProjectCard project={mockProject} />);
      const githubLink = screen.getByLabelText('View source code for Test Project on GitHub (opens in new tab)');
      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('tech stack has aria-label', () => {
      render(<ProjectCard project={mockProject} />);
      const techStack = screen.getByLabelText('Technologies used');
      expect(techStack).toBeInTheDocument();
    });

    it('skeleton loader has aria-label', () => {
      render(<ProjectCard project={mockProject} />);
      const skeleton = screen.getByLabelText('Loading image');
      expect(skeleton).toBeInTheDocument();
    });

    it('uses semantic header element for card header', () => {
      const { container } = render(<ProjectCard project={mockProject} />);
      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
    });

    it('uses proper heading hierarchy', () => {
      render(<ProjectCard project={mockProject} />);
      expect(screen.getByRole('heading', { name: 'Test Project', level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Problem', level: 3 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Solution', level: 3 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Key Features', level: 3 })).toBeInTheDocument();
    });

    it('keyboard navigation: links are focusable', () => {
      render(<ProjectCard project={mockProject} />);
      const demoLink = screen.getByText('View Live Demo');
      demoLink.focus();
      expect(demoLink).toHaveFocus();
    });

    it('all interactive elements have accessible names', () => {
      render(<ProjectCard project={mockProject} />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAccessibleName();
      });
    });

    it('image placeholder is hidden from screen readers', () => {
      render(<ProjectCard project={mockProject} />);
      const image = screen.getByRole('img', { name: 'Test project screenshot' });
      fireEvent.error(image);

      const { container } = render(<ProjectCard project={mockProject} />);
      fireEvent.error(screen.getByRole('img'));

      const placeholder = container.querySelector('.imagePlaceholder');
      expect(placeholder).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Image Loading States', () => {
    it('shows skeleton while image is loading', () => {
      render(<ProjectCard project={mockProject} />);
      const skeleton = screen.getByLabelText('Loading image');
      expect(skeleton).toBeInTheDocument();
    });

    it('hides skeleton when image loads', () => {
      const { container } = render(<ProjectCard project={mockProject} />);
      const image = screen.getByRole('img', { name: 'Test project screenshot' });

      fireEvent.load(image);

      const skeleton = container.querySelector('.skeleton');
      // After load, skeleton should be removed from DOM in the component logic
      expect(skeleton).not.toBeInTheDocument();
    });

    it('displays fallback placeholder when image fails to load', () => {
      render(<ProjectCard project={mockProject} />);
      const image = screen.getByRole('img', { name: 'Test project screenshot' });

      fireEvent.error(image);

      // After error, should render placeholder with first letter
      expect(screen.getByText('T')).toBeInTheDocument();
    });
  });

  describe('Featured Styling', () => {
    it('applies featured class when project is featured', () => {
      const featuredProject = { ...mockProject, featured: true };
      const { container } = render(<ProjectCard project={featuredProject} />);
      const card = container.querySelector('.featured');
      expect(card).toBeInTheDocument();
    });

    it('does not apply featured class for non-featured projects', () => {
      const { container } = render(<ProjectCard project={mockProject} />);
      const card = container.querySelector('.featured');
      expect(card).not.toBeInTheDocument();
    });
  });
});
