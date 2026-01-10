import React from 'react';
import Link from 'next/link';
import styles from './MDXComponents.module.css';

/**
 * MDX Components
 *
 * Custom React components for MDX content rendering.
 * Provides styled versions of standard HTML elements (headings, paragraphs,
 * code blocks, links, lists, blockquotes, etc.) for consistent blog post styling.
 *
 * These components are used by the MDX provider to override default HTML elements
 * with custom-styled versions that match the site's design system.
 */

/**
 * Custom Heading Components
 * Provides semantic headings with proper styling and anchor link support
 */
const H1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  id,
  ...props
}) => (
  <h1 id={id} className={styles.h1} {...props}>
    {children}
  </h1>
);

const H2: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  id,
  ...props
}) => (
  <h2 id={id} className={styles.h2} {...props}>
    {children}
  </h2>
);

const H3: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  id,
  ...props
}) => (
  <h3 id={id} className={styles.h3} {...props}>
    {children}
  </h3>
);

const H4: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  id,
  ...props
}) => (
  <h4 id={id} className={styles.h4} {...props}>
    {children}
  </h4>
);

const H5: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  id,
  ...props
}) => (
  <h5 id={id} className={styles.h5} {...props}>
    {children}
  </h5>
);

const H6: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  id,
  ...props
}) => (
  <h6 id={id} className={styles.h6} {...props}>
    {children}
  </h6>
);

/**
 * Custom Paragraph Component
 */
const P: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  ...props
}) => (
  <p className={styles.paragraph} {...props}>
    {children}
  </p>
);

/**
 * Custom Link Component
 * Uses Next.js Link for internal navigation, standard anchor for external links
 */
const A: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  href,
  children,
  ...props
}) => {
  if (!href) {
    return <a {...props}>{children}</a>;
  }

  // Check if it's an internal link (starts with / or #)
  const isInternalLink = href.startsWith('/') || href.startsWith('#');

  if (isInternalLink) {
    return (
      <Link href={href} className={styles.link} {...props}>
        {children}
      </Link>
    );
  }

  // External link
  return (
    <a
      href={href}
      className={styles.link}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  );
};

/**
 * Custom Code Components
 * Inline code and code blocks with syntax highlighting support
 */
const Code: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  className,
  ...props
}) => {
  // Check if this is a code block (will have a language class from rehype-highlight)
  const isCodeBlock = className?.includes('hljs');

  if (isCodeBlock) {
    return (
      <code className={`${styles.codeBlock} ${className || ''}`} {...props}>
        {children}
      </code>
    );
  }

  // Inline code
  return (
    <code className={styles.inlineCode} {...props}>
      {children}
    </code>
  );
};

const Pre: React.FC<React.HTMLAttributes<HTMLPreElement>> = ({
  children,
  ...props
}) => (
  <pre className={styles.pre} {...props}>
    {children}
  </pre>
);

/**
 * Custom List Components
 */
const Ul: React.FC<React.HTMLAttributes<HTMLUListElement>> = ({
  children,
  ...props
}) => (
  <ul className={styles.ul} {...props}>
    {children}
  </ul>
);

const Ol: React.FC<React.OlHTMLAttributes<HTMLOListElement>> = ({
  children,
  ...props
}) => (
  <ol className={styles.ol} {...props}>
    {children}
  </ol>
);

const Li: React.FC<React.LiHTMLAttributes<HTMLLIElement>> = ({
  children,
  ...props
}) => (
  <li className={styles.li} {...props}>
    {children}
  </li>
);

/**
 * Custom Blockquote Component
 */
const Blockquote: React.FC<React.BlockquoteHTMLAttributes<HTMLQuoteElement>> = ({
  children,
  ...props
}) => (
  <blockquote className={styles.blockquote} {...props}>
    {children}
  </blockquote>
);

/**
 * Custom Horizontal Rule Component
 */
const Hr: React.FC<React.HTMLAttributes<HTMLHRElement>> = (props) => (
  <hr className={styles.hr} {...props} />
);

/**
 * Custom Table Components
 */
const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = ({
  children,
  ...props
}) => (
  <div className={styles.tableWrapper}>
    <table className={styles.table} {...props}>
      {children}
    </table>
  </div>
);

const Thead: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  ...props
}) => (
  <thead className={styles.thead} {...props}>
    {children}
  </thead>
);

const Tbody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  ...props
}) => (
  <tbody className={styles.tbody} {...props}>
    {children}
  </tbody>
);

const Tr: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  children,
  ...props
}) => (
  <tr className={styles.tr} {...props}>
    {children}
  </tr>
);

const Th: React.FC<React.ThHTMLAttributes<HTMLTableHeaderCellElement>> = ({
  children,
  ...props
}) => (
  <th className={styles.th} {...props}>
    {children}
  </th>
);

const Td: React.FC<React.TdHTMLAttributes<HTMLTableDataCellElement>> = ({
  children,
  ...props
}) => (
  <td className={styles.td} {...props}>
    {children}
  </td>
);

/**
 * Custom Image Component
 */
const Img: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({
  alt,
  ...props
}) => (
  <img
    className={styles.img}
    alt={alt || 'Blog post image'}
    loading="lazy"
    {...props}
  />
);

/**
 * MDX Components Export
 *
 * Maps HTML element names to custom React components.
 * Used by @mdx-js/react's MDXProvider to override default rendering.
 */
export const MDXComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: P,
  a: A,
  code: Code,
  pre: Pre,
  ul: Ul,
  ol: Ol,
  li: Li,
  blockquote: Blockquote,
  hr: Hr,
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  th: Th,
  td: Td,
  img: Img,
};

export default MDXComponents;
