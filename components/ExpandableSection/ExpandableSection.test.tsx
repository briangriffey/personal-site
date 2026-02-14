import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import ExpandableSection from './ExpandableSection';

describe('ExpandableSection', () => {
  describe('Rendering', () => {
    it('renders the title', () => {
      render(
        <ExpandableSection title="Test Section">
          <p>Content</p>
        </ExpandableSection>
      );
      expect(screen.getByText('Test Section')).toBeInTheDocument();
    });

    it('renders the content', () => {
      render(
        <ExpandableSection title="Test Section">
          <p>Test Content</p>
        </ExpandableSection>
      );
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('starts collapsed by default', () => {
      render(
        <ExpandableSection title="Test Section">
          <p>Content</p>
        </ExpandableSection>
      );
      const button = screen.getByRole('button', { name: /test section/i });
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('starts expanded when defaultExpanded is true', () => {
      render(
        <ExpandableSection title="Test Section" defaultExpanded={true}>
          <p>Content</p>
        </ExpandableSection>
      );
      const button = screen.getByRole('button', { name: /test section/i });
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Interaction', () => {
    it('expands when clicked', async () => {
      const user = userEvent.setup();
      render(
        <ExpandableSection title="Test Section">
          <p>Content</p>
        </ExpandableSection>
      );

      const button = screen.getByRole('button', { name: /test section/i });
      expect(button).toHaveAttribute('aria-expanded', 'false');

      await user.click(button);

      await waitFor(() => {
        expect(button).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('collapses when clicked twice', async () => {
      const user = userEvent.setup();
      render(
        <ExpandableSection title="Test Section">
          <p>Content</p>
        </ExpandableSection>
      );

      const button = screen.getByRole('button', { name: /test section/i });

      await user.click(button);
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-expanded', 'true');
      });

      await user.click(button);
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-expanded', 'false');
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('expands when Enter key is pressed', async () => {
      const user = userEvent.setup();
      render(
        <ExpandableSection title="Test Section">
          <p>Content</p>
        </ExpandableSection>
      );

      const button = screen.getByRole('button', { name: /test section/i });
      button.focus();

      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(button).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('expands when Space key is pressed', async () => {
      const user = userEvent.setup();
      render(
        <ExpandableSection title="Test Section">
          <p>Content</p>
        </ExpandableSection>
      );

      const button = screen.getByRole('button', { name: /test section/i });
      button.focus();

      await user.keyboard(' ');

      await waitFor(() => {
        expect(button).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('is keyboard focusable', () => {
      render(
        <ExpandableSection title="Test Section">
          <p>Content</p>
        </ExpandableSection>
      );

      const button = screen.getByRole('button', { name: /test section/i });
      button.focus();

      expect(button).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <ExpandableSection title="Test Section">
          <p>Content</p>
        </ExpandableSection>
      );

      const button = screen.getByRole('button', { name: /test section/i });
      expect(button).toHaveAttribute('aria-expanded');
      expect(button).toHaveAttribute('aria-controls');
    });

    it('aria-controls matches content id', () => {
      render(
        <ExpandableSection title="Test Section">
          <p>Content</p>
        </ExpandableSection>
      );

      const button = screen.getByRole('button', { name: /test section/i });
      const contentId = button.getAttribute('aria-controls');
      const content = document.getElementById(contentId!);

      expect(content).toBeInTheDocument();
    });

    it('content has aria-hidden when collapsed', () => {
      render(
        <ExpandableSection title="Test Section">
          <p>Content</p>
        </ExpandableSection>
      );

      const button = screen.getByRole('button', { name: /test section/i });
      const contentId = button.getAttribute('aria-controls');
      const content = document.getElementById(contentId!);

      expect(content).toHaveAttribute('aria-hidden', 'true');
    });

    it('content does not have aria-hidden when expanded', async () => {
      const user = userEvent.setup();
      render(
        <ExpandableSection title="Test Section">
          <p>Content</p>
        </ExpandableSection>
      );

      const button = screen.getByRole('button', { name: /test section/i });
      await user.click(button);

      const contentId = button.getAttribute('aria-controls');
      const content = document.getElementById(contentId!);

      await waitFor(() => {
        expect(content).toHaveAttribute('aria-hidden', 'false');
      });
    });

    it('icon has aria-hidden', () => {
      render(
        <ExpandableSection title="Test Section">
          <p>Content</p>
        </ExpandableSection>
      );

      const icon = screen.getByRole('button').querySelector('[aria-hidden]');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
