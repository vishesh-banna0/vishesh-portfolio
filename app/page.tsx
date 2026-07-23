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

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar profile={profile} />
      <main>
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
