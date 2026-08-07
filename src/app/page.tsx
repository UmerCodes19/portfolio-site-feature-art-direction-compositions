import { VisualDirectionsPreviewBoard } from "@/components/VisualDirectionsPreviewBoard";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <main className="bg-[#080808] dark:bg-[#080808] light-mode:bg-[#F5F5F7] min-h-screen text-white dark:text-white light-mode:text-zinc-900 selection:bg-[#af5bf0] selection:text-white transition-colors duration-400">
      <Hero />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}





