import { Navbar } from "@/components/Navbar";
import { Footer, CTASection } from "@/components/CTAFooter";
import { ExperienceSection } from "@/components/ExperienceSection";

const Experience = () => (
  <div className="bg-background">
    <Navbar />
    <main className="pt-32">
      <ExperienceSection />
      <CTASection />
    </main>
    <Footer />
  </div>
);

export default Experience;
