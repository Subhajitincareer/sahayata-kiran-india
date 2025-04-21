
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SelfAssessmentSection } from "@/components/SelfAssessmentSection";
import { CrisisHelplineSection } from "@/components/CrisisHelplineSection";
import { SupportForumSection } from "@/components/SupportForumSection";
import { SurvivorStoriesSection } from "@/components/SurvivorStoriesSection";
import { ResourcesSection } from "@/components/ResourcesSection";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";
import { LanguageSelector } from "@/components/LanguageSelector";

const Index = () => {
  return (
    <div className="font-poppins min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <SelfAssessmentSection />
        <CrisisHelplineSection />
        <SupportForumSection />
        <SurvivorStoriesSection />
        <ResourcesSection />
        <CallToAction />
      </main>
      <Footer />
      <LanguageSelector />
    </div>
  );
};

export default Index;
