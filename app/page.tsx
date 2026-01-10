import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Personal Website",
  description: "Welcome to my personal website built with Next.js 15 and SSG",
};

export default function Home() {
  const buildTimestamp = new Date().toISOString();

  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <section>
        <h1>Welcome to Next.js 15</h1>
        <p>Your personal website is ready to build.</p>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Static Site Generation</h2>
        <p>
          This page is statically generated at build time using Next.js 15
          Static Site Generation (SSG).
        </p>
        <p>
          <strong>Build timestamp:</strong> {buildTimestamp}
        </p>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Features</h2>
        <ul>
          <li>Next.js 15 with App Router</li>
          <li>TypeScript with strict mode</li>
          <li>Static Site Generation (SSG)</li>
          <li>ESLint and Prettier configured</li>
          <li>Ready for deployment to any static host</li>
        </ul>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Verification</h2>
        <p>
          When you build this site with <code>npm run build</code>, all pages
          will be pre-rendered as static HTML files in the <code>out/</code>{" "}
          directory.
        </p>
        <p>
          The build timestamp above will remain constant across page visits,
          proving that this page was generated at build time, not request time.
        </p>
      </section>
    </main>
  );
}
