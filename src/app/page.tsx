import { SplashScreen } from "@/components/SplashScreen";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <main className="bg-[#080808] min-h-screen text-white selection:bg-[#af5bf0] selection:text-white">
      <SplashScreen />
      <Hero />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
