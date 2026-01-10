import React from 'react';
import Link from 'next/link';
import type { Post } from '@/lib/blog';
import styles from './BlogCard.module.css';

/**
 * BlogCard Component Props
 */
export interface BlogCardProps {
  /** Post data to display */
  post: Post;
  /** Optional custom class name */
  className?: string;
}

/**
 * BlogCard Component
 *
 * Displays a preview card for a blog post on the blog index page.
 * Shows the post title, publication date, excerpt, reading time, and tags.
 * Links to the individual post page.
 */
export default function BlogCard({ post, className = '' }: BlogCardProps) {
  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article
      className={`${styles.card} ${className}`}
      aria-label={`Blog post: ${post.title}`}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={styles.cardLink}
        aria-label={`Read more about ${post.title}`}
      >
        {/* Post Title */}
        <h2 className={styles.title}>{post.title}</h2>

        {/* Post Metadata */}
        <div className={styles.metadata}>
          <time dateTime={post.date} className={styles.date}>
            {formatDate(post.date)}
          </time>
          <span className={styles.separator} aria-hidden="true">
            •
          </span>
          <span className={styles.readingTime}>{post.readingTime}</span>
        </div>

        {/* Post Excerpt */}
        <p className={styles.excerpt}>{post.excerpt}</p>

        {/* Post Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className={styles.tags} aria-label="Post tags">
            {post.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Read More Indicator */}
        <div className={styles.readMore}>
          Read more
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </div>
      </Link>
    </article>
  );
}
