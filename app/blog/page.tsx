import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard/BlogCard";
import styles from "./page.module.css";

/**
 * Blog Index Page Metadata
 *
 * SEO metadata for the blog index page
 */
export const metadata: Metadata = {
  title: "Blog - Brian Griffey",
  description:
    "Thoughts on AI-assisted development, modern web technologies, and software engineering best practices. Learn about building exceptional web experiences.",
  openGraph: {
    title: "Blog - Brian Griffey",
    description:
      "Thoughts on AI-assisted development, modern web technologies, and software engineering best practices.",
    type: "website",
    url: "https://briangriffey.com/blog",
    siteName: "Brian Griffey",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Brian Griffey",
    description:
      "Thoughts on AI-assisted development, modern web technologies, and software engineering best practices.",
  },
};

/**
 * Blog Index Page Component
 *
 * Displays a list of all blog posts sorted by date (newest first).
 * Each post is rendered using the BlogCard component, showing title,
 * date, excerpt, reading time, and tags.
 */
export default function BlogPage() {
  // Fetch all blog posts
  const posts = getAllPosts();

  return (
    <main id="main-content" className={styles.blogPage}>
      {/* Page Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Blog</h1>
        <p className={styles.description}>
          Thoughts on AI-assisted development, modern web technologies, and
          software engineering best practices.
        </p>
      </header>

      {/* Blog Posts List */}
      {posts.length > 0 ? (
        <section className={styles.postsSection} aria-label="Blog posts">
          <div className={styles.postsGrid}>
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ) : (
        // Empty state
        <section className={styles.emptyState}>
          <p className={styles.emptyStateText}>
            No blog posts yet. Check back soon for new content!
          </p>
        </section>
      )}
    </main>
  );
}
