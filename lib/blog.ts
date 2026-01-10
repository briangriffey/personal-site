import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

/**
 * Blog Post Interface
 *
 * Represents a blog post with frontmatter metadata and content.
 */
export interface Post {
  /** URL-friendly post identifier */
  slug: string;
  /** Post title */
  title: string;
  /** Publication date in ISO format */
  date: string;
  /** Short description/preview of the post */
  excerpt: string;
  /** Post category tags */
  tags: string[];
  /** Estimated reading time in minutes */
  readingTime: string;
  /** Full MDX content (only included in getPostBySlug) */
  content?: string;
}

/**
 * Post Frontmatter Interface
 *
 * Expected frontmatter structure in MDX files.
 */
interface PostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

/**
 * Get the absolute path to the blog content directory
 */
const postsDirectory = path.join(process.cwd(), 'content', 'blog');

/**
 * Get All Posts
 *
 * Reads all MDX files from the content/blog directory, parses their frontmatter,
 * calculates reading time, and returns a sorted list of posts (newest first).
 *
 * @returns Array of Post objects sorted by date (newest first)
 */
export function getAllPosts(): Post[] {
  try {
    // Get all MDX files from the blog directory
    const fileNames = fs.readdirSync(postsDirectory);
    const mdxFiles = fileNames.filter(
      (fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md')
    );

    const posts = mdxFiles.map((fileName) => {
      // Remove file extension to get slug
      const slug = fileName.replace(/\.mdx?$/, '');

      // Read file contents
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Parse frontmatter
      const { data, content } = matter(fileContents);
      const frontmatter = data as PostFrontmatter;

      // Calculate reading time
      const stats = readingTime(content);

      // Return post object
      return {
        slug,
        title: frontmatter.title,
        date: frontmatter.date,
        excerpt: frontmatter.excerpt,
        tags: frontmatter.tags || [],
        readingTime: stats.text,
      };
    });

    // Sort posts by date (newest first)
    return posts.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    // If directory doesn't exist or is empty, return empty array
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

/**
 * Get Post by Slug
 *
 * Reads a specific MDX file by its slug, parses frontmatter and content,
 * calculates reading time, and returns the complete post object.
 *
 * @param slug - The URL-friendly post identifier
 * @returns Post object with full content, or null if not found
 */
export function getPostBySlug(slug: string): Post | null {
  try {
    // Try .mdx first, then .md
    let fullPath = path.join(postsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(postsDirectory, `${slug}.md`);
    }

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    // Read file contents
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse frontmatter
    const { data, content } = matter(fileContents);
    const frontmatter = data as PostFrontmatter;

    // Calculate reading time
    const stats = readingTime(content);

    // Return post object with content
    return {
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      excerpt: frontmatter.excerpt,
      tags: frontmatter.tags || [],
      readingTime: stats.text,
      content,
    };
  } catch (error) {
    // If file doesn't exist, return null
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

/**
 * Get All Post Slugs
 *
 * Returns an array of all post slugs for static path generation.
 * Useful for Next.js generateStaticParams.
 *
 * @returns Array of post slugs
 */
export function getAllPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
      .map((fileName) => fileName.replace(/\.mdx?$/, ''));
  } catch (error) {
    // If directory doesn't exist, return empty array
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}
