import type { Metadata } from "next";
import ContactSection from "../components/ContactSection";

export const metadata: Metadata = {
  title: "Contact - Personal Website",
  description: "Get in touch with me via email or connect on social media. I'm always open to discussing new opportunities, collaborations, and interesting projects.",
};

export default function ContactPage() {
  return (
    <main id="main-content" style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <section style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1rem", color: "#111" }}>
          Contact Me
        </h1>
        <p style={{ fontSize: "1.125rem", color: "#666", lineHeight: 1.6 }}>
          I'm always interested in hearing about new opportunities, collaborations,
          and interesting projects. Whether you're a recruiter, fellow developer,
          or just want to say hello, feel free to reach out!
        </p>
      </section>

      <ContactSection />

      <section style={{ marginTop: "3rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem", color: "#333" }}>
          Response Time
        </h2>
        <p style={{ fontSize: "1rem", color: "#666", lineHeight: 1.6 }}>
          I typically respond to emails within 24-48 hours during business days.
          For urgent matters, please mention it in the subject line.
        </p>
      </section>
    </main>
  );
}
