import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProjectCard from './ProjectCard';
import type { Project } from '@/app/config/projects';

// Mock next/image to simplify testing
vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement> & { onError?: () => void }) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock Button component
vi.mock('@/components/Button/Button', () => ({
  default: ({ children, href, variant, ariaLabel }: {
    children: React.ReactNode;
    href?: string;
    variant?: string;
    ariaLabel?: string;
  }) => (
    <a href={href} aria-label={ariaLabel} data-variant={variant}>
      {children}
    </a>
  ),
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
  });

  describe('Featured Badge', () => {
    it('does not render featured badge for non-featured projects', () => {
      render(<ProjectCard project={mockProject} />);
      expect(screen.queryByText('Featured')).not.toBeInTheDocument();
    });

    it('renders featured badge for featured projects', () => {
      const featuredProject = { ...mockProject, featured: true };
      render(<ProjectCard project={featuredProject} />);
      expect(screen.getByText('Featured')).toBeInTheDocument();
    });
  });

  describe('Expandable Sections', () => {
    it('initially hides features list', () => {
      render(<ProjectCard project={mockProject} />);
      expect(screen.queryByText('Feature 1: First feature description')).not.toBeInTheDocument();
    });

    it('shows features list when expand button is clicked', () => {
      render(<ProjectCard project={mockProject} />);
      const expandButton = screen.getByRole('button', { name: /key features/i });
      fireEvent.click(expandButton);
      expect(screen.getByText('Feature 1: First feature description')).toBeInTheDocument();
      expect(screen.getByText('Feature 2: Second feature description')).toBeInTheDocument();
      expect(screen.getByText('Feature 3: Third feature description')).toBeInTheDocument();
    });

    it('hides features list when expand button is clicked again', () => {
      render(<ProjectCard project={mockProject} />);
      const expandButton = screen.getByRole('button', { name: /key features/i });

      // Expand
      fireEvent.click(expandButton);
      expect(screen.getByText('Feature 1: First feature description')).toBeInTheDocument();

      // Collapse
      fireEvent.click(expandButton);
      expect(screen.queryByText('Feature 1: First feature description')).not.toBeInTheDocument();
    });

    it('initially hides technical highlights', () => {
      render(<ProjectCard project={mockProject} />);
      expect(screen.queryByText('Frontend')).not.toBeInTheDocument();
    });

    it('shows technical highlights when expand button is clicked', () => {
      render(<ProjectCard project={mockProject} />);
      const expandButton = screen.getByRole('button', { name: /technical highlights/i });
      fireEvent.click(expandButton);
      expect(screen.getByText('Frontend')).toBeInTheDocument();
      expect(screen.getByText('Backend')).toBeInTheDocument();
      expect(screen.getByText('Testing')).toBeInTheDocument();
    });

    it('updates aria-expanded attribute when expanded', () => {
      render(<ProjectCard project={mockProject} />);
      const expandButton = screen.getByRole('button', { name: /key features/i });

      expect(expandButton).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(expandButton);
      expect(expandButton).toHaveAttribute('aria-expanded', 'true');
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
      const githubButton = screen.getByText('View Source Code');
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

    it('does not render stats section when stats are not provided', () => {
      const projectWithoutStats = { ...mockProject, stats: undefined };
      render(<ProjectCard project={projectWithoutStats} />);
      expect(screen.queryByText('Test Coverage')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('renders article with correct aria-label', () => {
      render(<ProjectCard project={mockProject} />);
      expect(screen.getByRole('article')).toHaveAttribute(
        'aria-label',
        'Project: Test Project'
      );
    });

    it('expand buttons have proper aria-controls attributes', () => {
      render(<ProjectCard project={mockProject} />);
      const featuresButton = screen.getByRole('button', { name: /key features/i });
      expect(featuresButton).toHaveAttribute('aria-controls', 'features-test-project');
    });

    it('buttons have accessible labels', () => {
      render(<ProjectCard project={mockProject} />);
      expect(screen.getByLabelText(/view live demo of test project/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/view source code for test project/i)).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('accepts and applies custom className', () => {
      render(<ProjectCard project={mockProject} className="custom-class" />);
      const article = screen.getByRole('article');
      expect(article).toHaveClass('custom-class');
    });

    it('applies featured class when project is featured', () => {
      const featuredProject = { ...mockProject, featured: true };
      const { container } = render(<ProjectCard project={featuredProject} />);
      const card = container.querySelector('.featured');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Image Error Handling', () => {
    it('displays fallback placeholder when image fails to load', () => {
      render(<ProjectCard project={mockProject} />);

      // Get the image and simulate an error
      const image = screen.getByRole('img', { name: 'Test project screenshot' });
      fireEvent.error(image);

      // After error, placeholder should be shown with the first letter of the title
      expect(screen.getByText('T')).toBeInTheDocument();
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('displays first letter of project title as placeholder icon', () => {
      const projectWithDifferentTitle: Project = {
        ...mockProject,
        title: 'Another Project',
        image: {
          src: '/images/projects/another.jpg',
          alt: 'Another project screenshot',
        },
      };
      render(<ProjectCard project={projectWithDifferentTitle} />);

      // Simulate image error
      const image = screen.getByRole('img', { name: 'Another project screenshot' });
      fireEvent.error(image);

      // Should show 'A' as the placeholder icon
      expect(screen.getByText('A')).toBeInTheDocument();
    });
  });
});
