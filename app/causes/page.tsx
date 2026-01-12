import type { Metadata } from "next";
import CauseCard, { Cause } from "@/components/CauseCard/CauseCard";
import styles from "./page.module.css";

/**
 * Causes Page Metadata
 *
 * SEO metadata for the causes index page
 */
export const metadata: Metadata = {
  title: "Causes - Brian Griffey",
  description:
    "Supporting organizations that nourish dignity—feeding seniors fighting isolation, empowering unhoused artists to create and thrive, and cultivating inner peace through contemplative practice.",
  openGraph: {
    title: "Causes - Brian Griffey",
    description:
      "Supporting organizations that nourish dignity—feeding seniors, empowering artists, and cultivating peace.",
    type: "website",
    url: "https://briangriffey.com/causes",
    siteName: "Brian Griffey",
  },
  twitter: {
    card: "summary_large_image",
    title: "Causes - Brian Griffey",
    description:
      "Supporting organizations that nourish dignity—feeding seniors, empowering artists, and cultivating peace.",
  },
};

/**
 * Causes data
 *
 * Charitable organizations Brian supports
 */
const causes: Cause[] = [
  {
    id: "meals-on-wheels",
    title: "Meals on Wheels Central Texas",
    description:
      "Fighting senior isolation by delivering nutritious meals and friendly visits to homebound elderly neighbors.",
    imageUrl: "/images/causes/meals-on-wheels.jpg",
    donateUrl: "https://mowctx.org",
  },
  {
    id: "art-from-streets",
    title: "Art from the Streets",
    description:
      "Empowering unhoused artists with supplies, community, and opportunities to create and sell their artwork.",
    imageUrl: "/images/causes/art-from-streets.jpg",
    donateUrl: "https://artfromthestreets.org",
  },
  {
    id: "austin-zen-center",
    title: "Austin Zen Center",
    description:
      "Cultivating inner peace through contemplative practice and making meditation accessible to all.",
    imageUrl: "/images/causes/austin-zen-center.jpg",
    donateUrl: "https://austinzencenter.org",
  },
];

/**
 * Causes Page Component
 *
 * Displays a list of charitable organizations Brian supports.
 * Each cause is rendered using the CauseCard component, showing title,
 * image, description, and a donation link.
 */
export default function CausesPage() {
  return (
    <main id="main-content" className={styles.causesPage}>
      {/* Page Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Causes</h1>
        <p className={styles.description}>
          Supporting organizations that nourish dignity—feeding seniors fighting
          isolation, empowering unhoused artists to create and thrive, and
          cultivating inner peace through contemplative practice.
        </p>
      </header>

      {/* Causes List */}
      {causes.length > 0 ? (
        <section className={styles.causesSection} aria-label="Causes">
          <div className={styles.causesGrid}>
            {causes.map((cause) => (
              <CauseCard key={cause.id} cause={cause} />
            ))}
          </div>
        </section>
      ) : (
        // Empty state
        <section className={styles.emptyState}>
          <p className={styles.emptyStateText}>
            No causes listed yet. Check back soon!
          </p>
        </section>
      )}
    </main>
  );
}
