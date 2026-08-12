import { PROJECTS } from "@/data/projects";
import { ProjectsListClient } from "./ProjectsListClient";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative w-full py-32 sm:py-44 lg:py-52 bg-[#080808] dark:bg-[#080808] light-mode:bg-[#F5F5F7] text-white dark:text-white light-mode:text-zinc-900 overflow-hidden transition-colors duration-400 border-b border-white/[0.08]"
    >
      {/*
        THESIS: A restrained, high-craft project exhibition that pairs full-width featured mask-wipe hero cards with an editorial, interactive compact project index. Refuses nested card containers and artificial AI slop.
        OWN-WORLD: Monochrome zinc palette on #080808 obsidian dark, razor-thin white/[0.08] hairline borders, Geist Sans title weights, system mono numbers, purposeful #af5bf0 violet active indicators (<=5%).
        STORY: Visitors instantly grasp the high-caliber engineering and design projects, experiencing smooth scrubbed image window parallax, cursor-tracked hover cards, and deep detail modals.
        FIRST VIEWPORT: Generous section number '02' heading leading directly into featured exhibition cards with directional mask wipes and typography blocks.
        FORM: Restrained Technical Precision project exhibition system.
        FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
      */}
      <ProjectsListClient projects={PROJECTS} />
    </section>
  );
}
