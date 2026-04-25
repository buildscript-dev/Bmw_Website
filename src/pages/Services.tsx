import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/CTAFooter";
import { ServicesSection } from "@/components/ServicesSection";
import { ExperienceSection } from "@/components/ExperienceSection";

const Services = () => (
  <div className="bg-background">
    <Navbar />
    <main className="pt-32">
      <ServicesSection />
      <ExperienceSection />
    </main>
    <Footer />
  </div>
);

export default Services;
