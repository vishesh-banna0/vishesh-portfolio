import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Writing from "@/components/Writing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import {
  getProfile,
  getRoles,
  getStats,
  getAbout,
  getProjects,
  getEducation,
  getWriting,
} from "@/lib/queries";

// Content is DB-backed; render on each request so admin edits show immediately.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const title = `${profile.name} | ${profile.role}`;
  return {
    title,
    description: profile.thesis,
    alternates: { canonical: "/" },
    openGraph: { title, description: profile.thesis, type: "website" },
    twitter: { card: "summary_large_image", title, description: profile.thesis },
  };
}

export default async function Home() {
  const [profile, roles, stats, about, projects, education, writing] = await Promise.all([
    getProfile(),
    getRoles(),
    getStats(),
    getAbout(),
    getProjects(),
    getEducation(),
    getWriting(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    address: profile.location,
    sameAs: [profile.socials.github, profile.socials.linkedin],
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar profile={profile} />
      <main id="main">
        <Hero profile={profile} roles={roles} stats={stats} />
        <About about={about} />
        <Projects projects={projects} />
        <Timeline education={education} />
        <Writing writing={writing} />
        <Contact profile={profile} />
      </main>
      <Footer />
    </div>
  );
}
