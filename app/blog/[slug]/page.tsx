import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog";
import { MDXComponents } from "@/components/MDX/MDXComponents";
import styles from "./page.module.css";

/**
 * Blog Post Page Props
 */
interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generate Static Params
 *
 * Returns all blog post slugs for static site generation.
 * This ensures all blog posts are pre-rendered at build time.
 */
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

/**
 * Generate Metadata
 *
 * Generates dynamic SEO metadata for each blog post.
 */
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - Brian Griffey`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: ["Brian Griffey"],
      tags: post.tags,
      url: `https://briangriffey.com/blog/${slug}`,
      siteName: "Brian Griffey",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

/**
 * Blog Post Page Component
 *
 * Displays an individual blog post with its metadata and MDX content.
 * Renders MDX content with custom components for consistent styling and
 * syntax highlighting support.
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  // Handle post not found
  if (!post || !post.content) {
    notFound();
  }

  // Format the date for display
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main id="main-content" className={styles.blogPostPage}>
      {/* Post Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>

        {/* Post Metadata */}
        <div className={styles.meta}>
          <time
            className={styles.date}
            dateTime={new Date(post.date).toISOString()}
            aria-label={`Published on ${formattedDate}`}
          >
            {formattedDate}
          </time>
          <span className={styles.separator} aria-hidden="true">
            •
          </span>
          <span className={styles.readingTime} aria-label="Reading time">
            {post.readingTime}
          </span>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className={styles.tags} aria-label="Post tags">
            {post.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Post Content */}
      <article className={styles.content}>
        <MDXRemote
          source={post.content}
          components={MDXComponents}
          options={{
            mdxOptions: {
              rehypePlugins: [rehypeHighlight],
            },
          }}
        />
      </article>

      {/* Back Link */}
      <footer className={styles.footer}>
        <a href="/blog" className={styles.backLink}>
          ← Back to Blog
        </a>
      </footer>
    </main>
  );
}
