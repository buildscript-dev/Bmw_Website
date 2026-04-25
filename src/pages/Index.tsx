import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ModelsSection } from "@/components/ModelsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { CTASection, Footer } from "@/components/CTAFooter";

const Index = () => {
  return (
    <div className="bg-background">
      <Navbar />
      <main>
        <Hero />
        <ModelsSection />
        <ServicesSection />
        <ExperienceSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
