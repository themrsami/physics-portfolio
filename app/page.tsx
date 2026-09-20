import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ResearchSection from "./components/ResearchSection";
import InteractiveLab from "./components/InteractiveLab";
import ExperienceSection from "./components/ExperienceSection";
import SkillsGrid from "./components/SkillsGrid";
import ContactSection from "./components/ContactSection";
import Physics3DBackground from "./components/Physics3DBackground";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Interactive 3D Physics Background (Zero Clutter, Mouse Repulsion) */}
      <Physics3DBackground />

      {/* Main Page Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <ResearchSection />
        <InteractiveLab />
        <ExperienceSection />
        <SkillsGrid />
        <ContactSection />
      </div>
    </main>
  );
}
