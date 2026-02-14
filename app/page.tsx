import type { Metadata } from "next";
import Hero from "@/components/Hero/Hero";
import ContactSection from "./components/ContactSection";

export const metadata: Metadata = {
  title: "Brian Griffey - Full-Stack Software Engineer",
  description: "Building exceptional web experiences with modern technologies. Passionate about creating clean, scalable solutions that make a difference.",
  openGraph: {
    title: "Brian Griffey - Full-Stack Software Engineer",
    description: "Building exceptional web experiences with modern technologies. Passionate about creating clean, scalable solutions that make a difference.",
    type: "website",
    url: "https://briangriffey.com",
    siteName: "Brian Griffey",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian Griffey - Full-Stack Software Engineer",
    description: "Building exceptional web experiences with modern technologies. Passionate about creating clean, scalable solutions that make a difference.",
  },
};

export default function Home() {
  return (
    <main id="main-content" style={{ margin: "0 auto" }}>
      <Hero />

      <ContactSection />
    </main>
  );
}